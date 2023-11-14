import { Box } from "@mui/material"
import { Navbar, Header } from "../components"
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
/**
 * Diseño principal para la aplicación meteorológica.
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Contenido principal del diseño.
 * @returns {ReactNode} Componente de diseño meteorológico.
 */
export const WeatherLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{  }}>
      <Header /> 
      <Box
        component='main'
        sx={{ flexGrow: 3, p: 3 }}
      >
        <Navbar />
        { children }
      </Box>
    </Box>
  )
}
