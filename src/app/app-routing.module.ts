import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiReqComponent } from './api-req/api-req.component';
import { SearchBarreComponent } from './search-barre/search-barre.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ChargerouteGuard } from './guard/chargeroute.guard';
import { ProfilComponent } from './profil/profil.component';
import { FavorisComponent } from './favoris/favoris.component';

const routes: Routes = [{ path: "acceuil", component: ApiReqComponent, canActivate: [ChargerouteGuard], runGuardsAndResolvers: 'always', },
{ path: "search", component: SearchBarreComponent, },
{ path: "login", component: ConnexionComponent, runGuardsAndResolvers: 'always', },
{ path: "suscribe", component: InscriptionComponent, },
{ path: "profil", component: ProfilComponent, canActivate: [ChargerouteGuard] },
{ path: "favoris", component: FavorisComponent, canActivate: [ChargerouteGuard] },
{ path: '', redirectTo: 'acceuil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
