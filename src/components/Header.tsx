import { AirOutlined } from '@mui/icons-material'
import { Typography, Box } from '@mui/material';


interface HeaderProps {}

/**
 * Componente funcional que representa el encabezado de la aplicación.
 *
 * @component
 *
 * @returns {JSX.Element} Elemento JSX que representa el encabezado de la aplicación.
 */
export const Header: React.FC<HeaderProps> = (): JSX.Element => {
  return (
    <Box
      bgcolor='primary.main'
      position='static' 
      >
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', p: '10px' }}>
        <AirOutlined color='inherit' />
        <Typography 
          variant='h6' 
          noWrap 
          sx={{ ml: '10px' }}>
          Open Weather App
        </Typography>
      </Box>
    </Box>
  )
}
