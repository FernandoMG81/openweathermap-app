import { createContext } from "react";
import { CityContextType } from "../types";

/**
 * Contexto para gestionar el estado global relacionado con el clima.
 * @constant
 * @type {React.Context<CityContextType | null>}
 */
export const WeatherContext = createContext<CityContextType | null>(null)

