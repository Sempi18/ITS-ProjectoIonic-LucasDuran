import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  VisiblePassword: boolean = false;

  credentials = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async login(form: NgForm) {
    if (!form.valid) return;

    const loading = await this.loadingController.create({
      message: 'Loggin In',
    });
    await loading.present();

    try {
      const userCredential = await this.authService.login(
        this.credentials.email,
        this.credentials.password
      );

      localStorage.setItem('token', 'authenticated');
      localStorage.setItem('user', JSON.stringify(userCredential.user));

      await loading.dismiss();
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      await loading.dismiss();

      let message = 'Failed to Log In';

      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            message = 'User not found';
            break;
          case 'auth/wrong-password':
            message = 'Incorrect Password';
            break;
          default:
            message = error.message || 'Unknown Error';
            break;
        }
      }

      const toast = await this.toastController.create({
        message,
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    }
  }

  togglePassword() {
    this.VisiblePassword = !this.VisiblePassword;
  }

  Register() {
    this.router.navigateByUrl('/register');
  }
}
