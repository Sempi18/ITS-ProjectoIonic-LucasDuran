import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  NavController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  data = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async register(form: NgForm) {
    if (!form.valid || this.data.password !== this.data.confirmPassword) {
      const toast = await this.toastCtrl.create({
        message: 'Revisa tus datos. Las contraseñas deben coincidir.',
        duration: 2000,
        color: 'warning',
      });
      return toast.present();
    }

    const loading = await this.loadingCtrl.create({
      message: 'Registrando usuario...',
    });
    await loading.present();

    try {
      await this.authService.register(this.data.email, this.data.password);
      await loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: 'Registro exitoso',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      this.navCtrl.navigateRoot('/home');
    } catch (error: any) {
      const toast = await this.toastCtrl.create({
        message: 'Error al registrar: ' + (error.message || ''),
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  loggear() {
    this.navCtrl.navigateBack('/login');
  }
}
