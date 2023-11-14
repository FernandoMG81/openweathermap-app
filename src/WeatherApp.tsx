import { Header, RecordsTable, Navbar, WeatherCard } from './components'
import { Box } from "@mui/material"
import { WeatherState } from "./context/WeatherState"

export const WeatherApp = () => {
  return (
<WeatherState>
    <Box sx={{  }}>
      <Header /> 
      <Box component='main' sx={{ flexGrow: 3, p: 3 }}>
        <Navbar />
        <WeatherCard />
        <RecordsTable />
      </Box>
    </Box>
</WeatherState>
  )
}
