import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors'

/**
 * Tema personalizado de la aplicación con esquema de colores púrpuras.
 *
 * @typedef {Object} PurpleTheme
 * @property {object} palette - Configuración de la paleta de colores.
 * @property {object} palette.primary - Configuración del color primario.
 * @property {string} palette.primary.main - Color principal para el tema primario.
 * @property {object} palette.secondary - Configuración del color secundario.
 * @property {string} palette.secondary.main - Color principal para el tema secundario.
 * @property {object} palette.error - Configuración del color de error.
 * @property {string} palette.error.main - Color principal para indicar errores.
 */

/**
 * Crea un tema personalizado con esquema de colores púrpuras.
 *
 * @function
 * @returns {PurpleTheme} Tema personalizado con esquema de colores púrpuras.
 */

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#262254",
    },
    secondary: {
      main: "#e2cce5",
    },
    error: {
      main: red.A400
    }
  }
})