export interface ForcastDailyComponent {
    cp: number,             // Code postal de la localisation
    latitude: number,       // Latitude de la localisation
    longitude: number,      // Longitude de la localisation
    datetime: Date,         // Date et heure de la prévision (probablement un objet Date)
    temp2m: number,         // Température à 2 mètres du sol (en degrés Celsius)
    rh2m: number,           // Humidité relative à 2 mètres du sol (%)
    wind10m: number,        // Vitesse du vent à 10 mètres du sol (en m/s)
    gust10m: number,        // Rafale de vent à 10 mètres du sol (en m/s)
    dirwind10m: number,     // Direction du vent à 10 mètres du sol (en degrés)
    rr10: number,           // Précipitations cumulées sur 10 minutes (en mm)
    rr1: number,            // Précipitations cumulées sur 1 minute (en mm)
    probarain: number,      // Probabilité de pluie (%)
    weather: number,        // Code numérique pour le type de temps (par exemple, soleil, nuageux, etc.)
    probafrost: number,     // Probabilité de gel/frost (%)
    probafog: number,       // Probabilité de brouillard (%)
    probawind70: number,    // Probabilité de vent fort (> 70 km/h) (%)
    probawind100: number,   // Probabilité de vent très fort (> 100 km/h) (%)
    tsoil1: number,         // Température du sol à 1 mètre de profondeur (en degrés Celsius)
    tsoil2: number,         // Température du sol à 2 mètres de profondeur (en degrés Celsius)
    gustx: number,          // Rafale maximale attendue (en m/s)
    iso0: number            // Isolement 0
}
