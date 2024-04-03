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
// import { CityComponent } from './model/model.city.component';
@NgModule({
  declarations: [
    AppComponent,
    ApiReqComponent,
    SearchBarreComponent,
    GetWeatherComponent,
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
