import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../back_api/backend.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  
  constructor(private apiservice: BackendService, private router: Router) {
  }
  
  /**
   * addUser
   */
  public addUser() {
    let email = document.getElementById('email') as HTMLInputElement;
    let username = document.getElementById('user_name') as HTMLInputElement;
    let password= document.getElementById('password') as HTMLInputElement;
    const newUserData = {
      user_email: email.value,
      user_name: username.value,
      user_password: password.value,

    }
  if(newUserData){

    this.apiservice.addUser(newUserData).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {

      }
    })
  }
  }
}
