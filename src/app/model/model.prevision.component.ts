import { CityComponent } from "./model.city.component";
import { ForcastComponent } from "./model.forcastWeather"
import { ForcastDailyComponent} from "./model.forecastDaily.component";
export interface PrevisionWeekComponent {
    city: CityComponent;
    update: Date;
    forecast: ForcastComponent[];
}
export interface PrevisionDayComponent {
    city: CityComponent;
    update: Date;
    forecast: ForcastComponent;
}
export interface PrevisionDayByHourComponent {
    city: CityComponent;
    update: Date;
    forecast: ForcastDailyComponent[];
}