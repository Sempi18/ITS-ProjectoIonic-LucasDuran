import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { Attendance } from  '../../shared/interfaces/attendance'

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: false
})
export class AttendancePage implements OnInit {
  records: Attendance[] = [];
  userId: string | null = null;

  constructor(
    private NavController: NavController,
    private authService: AuthService,
    private attendanceService: AttendanceService
  ) {}

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      this.NavController.navigateRoot('/login');
      return;
    }
    this.userId = user.uid;
    this.loadhistory();
  }

  async loadhistory() {
    if (!this.userId) return;
    try {
      const data = await this.attendanceService.getUserAttendance
      (this.userId);
      this.records = data;
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }
  GoHome() {
    this.NavController.navigateRoot('/home');
  }

}