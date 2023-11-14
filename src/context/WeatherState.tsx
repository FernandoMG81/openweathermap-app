import { ReactNode, useReducer, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { WeatherReducer } from "./WeatherReducer";
import {
  addWeatherRecord,
  deleteWeatherRecord,
  fetchWeatherData,
  getAllWeatherRecords,
} from "../services/weatherApi";
import { CityRecord } from "../types";

/**
 * Propiedades para el estado del clima.
 * @interface
 * @property {ReactNode} children - Componentes secundarios como hijos.
 */
interface WeatherStateProps {
  children: ReactNode;
}

/**
 * Componente de estado para gestionar el contexto relacionado con el clima.
 * @component
 * @param {WeatherStateProps} props - Propiedades para el estado del clima.
 * @returns {React.FC<WeatherStateProps>} Componente de estado para el contexto del clima.
 */
export const WeatherState: React.FC<WeatherStateProps> = ({ children }) => {
  const initialState = {
    cardWeather: null,
    weatherRecords: null,
    error: {
      isError: false,
      message: ''
    }
  };

  // Reductor para gestionar el estado global del clima
  const [globalState, dispatch] = useReducer(WeatherReducer, initialState);
  // Estado local para el indicador de carga
  const [loading, setLoading] = useState(false);

  /**
   * Añade los datos meteorológicos de una ciudad.
   * @async
   * @function
   * @param {number} cityWeatherID - Identificador de los datos meteorológicos de la ciudad.
   * @param {boolean} getAllRecords - Indica si se deben obtener todos los registros meteorológicos.
   * Promesa que se resuelve después de añadir los datos meteorológicos.
   */
  const addCityWeather = async (
    cityWeatherID: number,
    getAllRecords: boolean
  ) => {
    try {
      setLoading(true);
      const cityWeatherData: CityRecord = {
        cityID: cityWeatherID,
        timestamp: Date.now(),
      };

      const res = await addWeatherRecord(cityWeatherData);

      if (res.ok) {
        if (getAllRecords) {
          const allRecords = await getAllWeatherRecords(cityWeatherID);
          dispatch({ type: "GET_ALL_RECORDS", payload: allRecords });
        } else {
          const data = await fetchWeatherData(cityWeatherID);
          if (data) dispatch({ type: "GET_WEATHER", payload: data });
        }
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "ERROR_OCCURRED", payload: {isError: true, message: 'Failed to fetch at addWeatherRecord'} })
    } finally {
      setLoading(false);
    }
  };

  const deleteCityWeatherRecord = async (
    cityWeatherID: number,
    timestamp: number
  ) => {
    try {
      const res = await deleteWeatherRecord(cityWeatherID, timestamp);
      if (res.ok) {
        
          const allRecords = await getAllWeatherRecords(cityWeatherID);
          dispatch({ type: "GET_ALL_RECORDS", payload: allRecords });
      
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Proporciona el contexto del clima a los componentes hijos
  return (
    <WeatherContext.Provider
      value={{
        cardWeather: globalState.cardWeather,
        weatherRecords: globalState.weatherRecords,
        addCityWeather,
        deleteCityWeatherRecord,
        loading,
        error: globalState.error
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
