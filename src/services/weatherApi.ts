import { API_BASE_URL } from "../constants";
import { WeatherData, CityRecord } from "../types";

/**
 * Obtiene los datos meteorológicos más recientes para una ciudad específica.
 * @param {number} id - ID de la ciudad para la cual se solicitan los datos meteorológicos.
 * @returns {Promise<WeatherData | null>} Promesa que se resuelve con los datos meteorológicos o nulo si hay un error.
 */
export const fetchWeatherData = async (id: number): Promise<WeatherData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/latest/${id}`);
    const res = await response.json();

    if(!response.ok){
      console.error('Error fetching data weather')
      return null
    }
    
    return res;
  } 

  catch (error) {
    console.error('Error al obtener datos del tiempo:', error);
    throw error;
  }
};


/**
 * Agrega un registro meteorológico a la base de datos.
 * @param {CityRecord} cityRecord - Datos del registro meteorológico que se va a agregar.
 * @returns {Promise<Response>} Promesa que se resuelve con la respuesta de la solicitud.
 */
export const addWeatherRecord = async (cityRecord: CityRecord) => {

  try {
    const res = await fetch(`${API_BASE_URL}/addweather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cityRecord),
    });

    return res
  } catch (error) {
   console.error('Error al enviar data a la API:', error)
   throw error
  }
};

/**
 * Obtiene todos los registros meteorológicos para una ciudad específica.
 * @param {number} cityId - ID de la ciudad para la cual se solicitan los registros meteorológicos.
 * @returns {Promise<WeatherData[]>} Promesa que se resuelve con un array de registros meteorológicos.
 */
export const getAllWeatherRecords = async (cityId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/allrecords/${cityId}`);
    return response.json();
    
  } catch (error) {
    console.log(error)
    throw error
  }
};


/**
 * Elimina un registro meteorológico de la base de datos.
 * @param {number} cityId - ID de la ciudad para la cual se eliminará el registro meteorológico.
 * @param {number} timestamp - Marca de tiempo del registro que se eliminará.
 * @returns {Promise<Response>} Promesa que se resuelve con la respuesta de la solicitud.
 */
export const deleteWeatherRecord = async (cityId: number, timestamp: number): Promise<Response> => {
  try {
    const res = await fetch(`${API_BASE_URL}/deleterecord`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityId, timestamp }),
    });

    return res;
  } catch (error) {
    console.error('Error al eliminar el registro meteorológico:', error);
    throw error;
  }
};

