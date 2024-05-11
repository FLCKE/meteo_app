export interface CityComponent {

        country: string,
        insee: string,
        cp: Number,
        name: string,
        latitude: Number,
        longitude: Number,
        altitude: Number,

}
//Dû a une erreur dans le code qui refuse d'acceder a la valeur de la liste
export interface CityComponent2 {
        city:{

                country: string,
                insee: string,
                cp: Number,
                name: string,
                latitude: Number,
                longitude: Number,
                altitude: Number,
        }
                
}
