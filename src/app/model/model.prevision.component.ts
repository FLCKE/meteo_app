import { CityComponent } from "./model.city.component";
import { ForcastComponent } from "./model.forcastWeather";
import { ForcastDailyComponent } from "./model.forecastDaily.component";

export interface PrevisionWeekComponent {
    city: CityComponent;              // Informations sur la ville pour la prévision hebdomadaire
    update: Date;                     // Date de la dernière mise à jour de la prévision
    forecast: ForcastComponent[];     // Prévisions météorologiques pour la semaine sous forme de tableau
}

export interface PrevisionDayComponent {
    city: CityComponent;              // Informations sur la ville pour la prévision quotidienne
    update: Date;                     // Date de la dernière mise à jour de la prévision
    forecast: ForcastComponent;       // Prévision météorologique pour la journée
}

export interface PrevisionDayByHourComponent {
    city: CityComponent;              // Informations sur la ville pour la prévision horaire
    update: Date;                     // Date de la dernière mise à jour de la prévision
    forecast: ForcastDailyComponent[]; // Prévisions météorologiques par heure sous forme de tableau
}
