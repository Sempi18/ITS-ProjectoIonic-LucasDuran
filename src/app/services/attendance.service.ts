import { Injectable, 
  EnvironmentInjector, 
  runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Attendance } from '../shared/interfaces/attendance.interface';
import { Camera, 
  CameraResultType, 
  CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { firebase } from 'firebase/compat/app';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceService {

  private Work_Zone = {
    lat: -38.93339,
    lng: -67.99427,
    radio: 600 
  };

  constructor(
    private firestore: AngularFirestore,
    private injector: EnvironmentInjector
  ) { }

  async TakePic(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 40,
        width: 800,
        height: 600,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      return `data:image/jpeg;base64,${image.base64String}`;
    } catch (error) {
      console.error('Error capturing photo:', error);
      throw new Error('The image could not be captured');
    }
  }

  async validateLocation(): Promise<boolean> {
    try {
      const val = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000
      });
      const distance = this.validateLocation(val.coords.latitude, val.coords.longitude);
      return distance <= this.Work_Zone.radio;
    } catch (error) {
      console.error('Error getting location:', error);
      return false;
    }
  }

  async recordAttendance (attendance: Attendance): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      await this.firestore.collection('attendance').add({
        type: attendance.type,
        userId: attendance.userId,
        pic: attendance.pic,
        location: attendance.location
          ? new firebase.firestore.GeoPoint(attendance.location.lat, attendance.location.lng)
          : null,
        timestamp: firebase.firestore.Timestamp.fromDate(attendance.timestamp as Date),
      });
    });
  }

  async getUserAttendance(userId: string): Promise<Attendance[]> {
    return runInInjectionContext(this.injector, async () => {
      const ref = this.firestore.collection<Attendance>('attendance', ref =>
        ref.where('userId', '==', userId).orderBy('timestamp', 'desc')
      );
      const snapshot = await firstValueFrom(ref.snapshotChanges());
      return snapshot.map(doc => {
        const data = doc.payload.doc.data();
        return {
          id: doc.payload.doc.id,
          ...data,
          timestamp: data.timestamp instanceof firebase.firestore.Timestamp
            ? data.timestamp.toDate()
            : data.timestamp
        };
      });
    });
  }

  private calculateDistance(lat: number, lng: number): number {
    const R = 6371000;
    const φ1 = this.toRad(lat);
    const φ2 = this.toRad(this.Zona_Trabajo.lat);
    const Δφ = this.toRad(this.Zona_Trabajo.lat - lat);
    const Δλ = this.toRad(this.Zona_Trabajo.lng - lng);

    const a = Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }
}
