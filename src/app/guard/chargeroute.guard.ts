// Dans votre garde de route (par exemple, chargerouteGuard)
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChargerouteGuard {

  constructor(private router: Router) { }

  private VerifyUserConnect(): boolean {
    if(typeof localStorage!='undefined'){

    
    if (localStorage.getItem("AuthUser")) {
      console.log("Utilisateur authentifié. Autoriser l'accès.");
      return true;
    } else {
      console.log("Utilisateur non authentifié. Redirection vers une autre page.");
      this.router.navigate(['/login']); // Redirection vers la page non autorisée
      return false;
    }
    }else{
      return false;
    }
  }
  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return this.VerifyUserConnect();
  }
}