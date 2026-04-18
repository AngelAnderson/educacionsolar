// All 78 Puerto Rico municipalities
export const municipalities = [
  "Adjuntas", "Aguada", "Aguadilla", "Aguas Buenas", "Aibonito",
  "Añasco", "Arecibo", "Arroyo", "Barceloneta", "Barranquitas",
  "Bayamón", "Cabo Rojo", "Caguas", "Camuy", "Canóvanas",
  "Carolina", "Cataño", "Cayey", "Ceiba", "Ciales",
  "Cidra", "Coamo", "Comerío", "Corozal", "Culebra",
  "Dorado", "Fajardo", "Florida", "Guánica", "Guayama",
  "Guayanilla", "Guaynabo", "Gurabo", "Hatillo", "Hormigueros",
  "Humacao", "Isabela", "Jayuya", "Juana Díaz", "Juncos",
  "Lajas", "Lares", "Las Marías", "Las Piedras", "Loíza",
  "Luquillo", "Manatí", "Maricao", "Maunabo", "Mayagüez",
  "Moca", "Morovis", "Naguabo", "Naranjito", "Orocovis",
  "Patillas", "Peñuelas", "Ponce", "Quebradillas", "Rincón",
  "Río Grande", "Sabana Grande", "Salinas", "San Germán", "San Juan",
  "San Lorenzo", "San Sebastián", "Santa Isabel", "Toa Alta", "Toa Baja",
  "Trujillo Alto", "Utuado", "Vega Alta", "Vega Baja", "Vieques",
  "Villalba", "Yabucoa", "Yauco",
];

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function findBySlug(slug: string): string | undefined {
  return municipalities.find((m) => slugify(m) === slug);
}
