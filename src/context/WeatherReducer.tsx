import { GlobalState, WeatherData } from "../types";

interface Action {
  type: "GET_WEATHER" | "GET_ALL_RECORDS";
  payload: WeatherData | WeatherData[];
}
/**
 * Reductor para gestionar el estado global relacionado con el clima.
 * @function
 * @param {GlobalState} state - Estado global actual.
 * @param {Action} action - Acción a realizar para modificar el estado.
 * @returns {GlobalState} Nuevo estado global después de aplicar la acción.
 */
export const WeatherReducer = (
  state: GlobalState,
  action: Action
): GlobalState => {
  const { payload } = action;
  switch (action.type) {
    /**
     * Caso para obtener datos meteorológicos individuales.
     * @type {GET_WEATHER}
     * @returns {GlobalState} Nuevo estado con los datos meteorológicos individuales.
     */
    case "GET_WEATHER":
      return {
        weatherRecords: null,
        cardWeather: payload as WeatherData,
      };
    /**
     * Caso para obtener todos los registros meteorológicos.
     * @type {GET_ALL_RECORDS}
     * @returns {GlobalState} Nuevo estado con todos los registros meteorológicos.
     */
    case "GET_ALL_RECORDS": {
      const allRecords = Array.isArray(payload) ? payload : [payload];
      return {
        cardWeather: allRecords[0] as WeatherData,
        weatherRecords: allRecords as WeatherData[],
      };
    }
    /**
     * Caso por defecto: retorna el estado actual.
     * @returns {GlobalState} Estado actual sin cambios.
     */
    default:
      return state;
  }
};
