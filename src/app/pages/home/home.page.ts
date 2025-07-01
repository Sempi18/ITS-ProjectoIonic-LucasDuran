import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { Attendance } from '../../shared/interfaces/attendance.interface';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  successmessage = false;

  constructor(
    private navController: NavController,
    private attendanceService: AttendanceService,
    private authService: AuthService,
    private toastController: ToastController,
    private ngZone: NgZone
  ) {}
  async recordattendance(tipo: 'Entrance' | 'Departures'){
    this.ngZone.run(async () => {
      const accepted = await this.attendanceService.validateLocation();
      if (!accepted) {
        this.showToast('No estás dentro del área permitida', 'danger');
        return;
      }

      try {
        const PicBase64 = await this.attendanceService.TakePic();

        const user = await this.authService.getCurrentUser();
        if (!user) throw new Error('Usuario no autenticado');

        const position = await Geolocation.getCurrentPosition();
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const newattendance: Attendance = {
          userId: user.uid,
          type: tipo,
          timestamp: new Date(),
          location,
          pic: PicBase64,
        };

        await this.attendanceService.recordAttendance(newattendance);
        this.successmessage = true;
        this.showToast('Asistencia registrada con éxito', 'success');
      } catch (error: any) {
        console.error('Error al registrar asistencia:', error);
        this.showToast(
          `Hubo un problema: ${error.message || 'Inténtalo más tarde'}`,
          'danger'
        );
      }
    });
  }

  irAlHistorial() {
    this.navController.navigateForward('/historial');
  }

  logout() {
    this.authService.logout().then(() => {
      this.navController.navigateRoot('/login');
    });
  }
  async showToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }
}
