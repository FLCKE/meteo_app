import { Component } from '@angular/core';
import { UserComponent } from '../model/model.user.component';
import { BackendService } from '../back_api/backend.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {

  public errorMessage!: string;
  public user!: UserComponent;
  public userAuthentificate!: boolean;
  constructor(private apiservice: BackendService, private router: Router) {

  }


  // public verification(): void {
  //   var email: HTMLInputElement | null = document.getElementById('email') as HTMLInputElement;
  //   var valure: string = email.value

  //   this.apiservice.getAllData().subscribe((res) => {
  //     console.log(res, "resq=>");
  //     for (let i = 0; i < res.data.length; i++) {
  //       if (res.data[i].email == valure) {
  //         console.log("reussite");
  //       } else {
  //         console.log("echec");
  //       }
  //     }
  //   })
  // }
  public login() {
    console.log("hhhth");
    let email: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    let password: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    console.log(email.value, password.value);
    let loginUrl = "http://localhost:3306/login" + "?email=" + email.value + "&password=" + password.value;
    this.apiservice.getUser(loginUrl).subscribe({
      next: (result) => {
        console.log("succeeeeed !!! data reclaim ");
        this.user = result.data;// affecter les information recuperer a mon user 
        this.authentificateUser();// authentifier l'user et enregistrer ses informations dans le storage local
        // window.location.reload();
        if (this.userAuthentificate) {
          window.location.href="/acceuil";
          this.router.navigate(["/acceuil"]);
        }
      },
      error: (Error) => {
        console.log(Error);
        this.errorMessage = "Password or email incorrect";
      }

    });
    

  }
  public authentificateUser() {
    this.userAuthentificate = true;
    localStorage.setItem("AuthUser", JSON.stringify({ user_id: this.user.user_id, user_name: this.user.user_name, user_email: this.user.user_email }));

  }
}
