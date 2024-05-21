export interface CityByNameItemComponent {
        nom: String,                     // Le nom de la ville (probablement une chaîne de caractères)
        code: string,                    // Le code de la ville (probablement une chaîne de caractères)
        _scrore: Number,                 // Le score de la ville (probablement un nombre)
        departement: {                   // Objet représentant le département de la ville
                code: String,                // Le code du département (probablement une chaîne de caractères)
                nom: String                  // Le nom du département (probablement une chaîne de caractères)
        }
}
