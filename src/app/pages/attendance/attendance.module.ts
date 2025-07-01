import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AttendancePage } from './attendance.page';
import { AttendancePageRoutingModule } from './attendance-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancePageRoutingModule,
  ],
  declarations: [AttendancePage],
})
export class AttendancePageModule {}
