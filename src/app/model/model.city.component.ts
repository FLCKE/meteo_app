// Interface représentant les informations de base d'une ville.
export interface CityComponent {
        country: string; // Pays où se situe la ville.
        insee: string;   // Code INSEE de la ville (France).
        cp: number;      // Code postal de la ville.
        name: string;    // Nom de la ville.
        latitude: number; // Latitude géographique de la ville.
        longitude: number; // Longitude géographique de la ville.
        altitude: number;  // Altitude de la ville.
}

// Interface représentant un objet contenant une ville, permettant de regrouper les informations de la ville sous un objet 'city'.
export interface CityComponent2 {
        city: {
                country: string; // Pays où se situe la ville.
                insee: string;   // Code INSEE de la ville (France).
                cp: number;      // Code postal de la ville.
                name: string;    // Nom de la ville.
                latitude: number; // Latitude géographique de la ville.
                longitude: number; // Longitude géographique de la ville.
                altitude: number;  // Altitude de la ville.
        };
}

// Interface représentant une ville avec son code et son nom.
export interface cities {
        code: string; // Code de la ville (peut être un code INSEE ou autre identifiant unique).
        nom: string;  // Nom de la ville.
}
