import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  email: string = 'd@example.com';
  password: string = 'asS';
  error: string;

  constructor(private auth: AngularFireAuth, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async onSubmit() {
    const loading = await this.loadingController.create({ message: 'Creating User' });
    await loading.present();
    try {
      const resp = await this.auth.createUserWithEmailAndPassword(this.email, this.password);
      this.error = null;
    } catch ({ message }) {
      this.error = message;
    } finally {
      await loading.dismiss();
    }
  }

}
