import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiReqComponent } from './api-req/api-req.component'; // Import du composant ApiReqComponent
import { SearchBarreComponent } from './search-barre/search-barre.component'; // Import du composant SearchBarreComponent
import { ConnexionComponent } from './connexion/connexion.component'; // Import du composant ConnexionComponent
import { InscriptionComponent } from './inscription/inscription.component'; // Import du composant InscriptionComponent
import { ChargerouteGuard } from './guard/chargeroute.guard'; // Import du guard ChargerouteGuard
import { ProfilComponent } from './profil/profil.component'; // Import du composant ProfilComponent
import { FavorisComponent } from './favoris/favoris.component'; // Import du composant FavorisComponent

// Définition des routes de l'application
const routes: Routes = [
  { path: "acceuil", component: ApiReqComponent, canActivate: [ChargerouteGuard], runGuardsAndResolvers: 'always' },
  { path: "search", component: SearchBarreComponent },
  { path: "login", component: ConnexionComponent, runGuardsAndResolvers: 'always' },
  { path: "suscribe", component: InscriptionComponent },
  { path: "profil", component: ProfilComponent, canActivate: [ChargerouteGuard] },
  { path: "favoris", component: FavorisComponent, canActivate: [ChargerouteGuard] },
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' }, // Redirection vers 'acceuil' par défaut pour le chemin vide
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuration du module de routage avec les routes définies
  exports: [RouterModule] // Export du module de routage pour être utilisé dans d'autres modules
})
export class AppRoutingModule { }
