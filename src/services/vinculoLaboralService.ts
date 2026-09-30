import API_URL from './api';

export async function getVinculosLaborales() {
  try {
    const response = await fetch(`${API_URL}/VinculoLaboral`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al obtener vínculos laborales:', error);
    throw error;
  }
}