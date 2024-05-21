export interface ForcastComponent {
    insee: string,          // Code INSEE de la localisation
    cp: number,             // Code postal de la localisation
    latitude: number,       // Latitude de la localisation
    longitude: number,      // Longitude de la localisation
    day: number,            // Jour de la prévision (probablement un nombre entier)
    datetime: Date,         // Date et heure de la prévision (probablement un objet Date)
    wind10m: number,        // Vitesse du vent à 10 mètres du sol (en m/s)
    gust10m: number,        // Rafale de vent à 10 mètres du sol (en m/s)
    dirwind10m: number,     // Direction du vent à 10 mètres du sol (en degrés)
    rr10: number,           // Précipitations cumulées sur 10 minutes (en mm)
    rr1: number,            // Précipitations cumulées sur 1 minute (en mm)
    probarain: number,      // Probabilité de pluie (%)
    weather: number,        // Code numérique pour le type de temps (par exemple, soleil, nuageux, etc.)
    tmin: number,           // Température minimale prévue (en degrés Celsius)
    tmax: number,           // Température maximale prévue (en degrés Celsius)
    sun_hours: number,      // Nombre d'heures d'ensoleillement prévues
    etp: number,            // Evapotranspiration potentielle (en mm)
    probafrost: number,     // Probabilité de gel/frost (%)
    probafog: number,       // Probabilité de brouillard (%)
    probawind70: number,    // Probabilité de vent fort (> 70 km/h) (%)
    probawind100: number,   // Probabilité de vent très fort (> 100 km/h) (%)
    gustx: number,          // Rafale maximale attendue (en m/s)
}
