import { Component } from '@angular/core';
import { BackendService } from '../back_api/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  public userData: any;
  constructor(private apiservice: BackendService, private router: Router) { }
  /**
   * getUserData
   */
  public getUserData() {
    const data = localStorage.getItem('AuthUser');
    if (typeof localStorage != 'undefined') {

      this.userData = localStorage.getItem("AuthUser");
      this.userData = JSON.parse(this.userData);
    }
    console.log("eeeeeeeee");
    if (this.userData) {
      console.log(this.userData);
    }
  }
  /**
   * logout
   */
  public logout() {
    localStorage.removeItem("AuthUser");
    window.location.reload();
  }
  /**
   * updateUser
   */
  public updateUser() {
    let email = document.getElementById('email') as HTMLInputElement;
    let username = document.getElementById('user_name') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;
    const newUserData = {
      user_email: email.value,
      user_name: username.value,
      user_password: password.value,

    }
    if (newUserData) {

      this.apiservice.updateUser(newUserData, this.userData.user_id).subscribe({
        next: (result) => {
          console.log(result);
          this.apiservice.logout();
          this.router.navigateByUrl('/login');
        },
        error: (err) => {

        }
      })
    }
  }

  ngOnInit(): void {
    this.getUserData();
  }
}
