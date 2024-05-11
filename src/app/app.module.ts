import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiReqComponent } from './api-req/api-req.component';
import { SearchBarreComponent } from './search-barre/search-barre.component';
import { GetWeatherComponent } from './get-weather/get-weather.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilComponent } from './profil/profil.component';
import { FavorisComponent } from './favoris/favoris.component';
// import { CityComponent } from './model/model.city.component';
@NgModule({
  declarations: [
    AppComponent,
    ApiReqComponent,
    SearchBarreComponent,
    GetWeatherComponent,
    ConnexionComponent,
    InscriptionComponent,
    NavbarComponent,
    ProfilComponent,
    FavorisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DatePipe
  ],
  providers: [
    provideClientHydration(),
    DatePipe//il faut rajouter ca ici pour eviter les erreurs avec le datepipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
