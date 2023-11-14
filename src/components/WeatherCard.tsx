import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { OPEN_WEATHER_BASE_ICONS_URL } from "../constants";
import emptyIcon from "../assets/cloud-question.png";

/**
 * Componente que muestra la información del clima en una tarjeta.
 * @component
 */
export const WeatherCard = () => {
  // Acceso al contexto para operaciones relacionadas con el clima
  const context = useContext(WeatherContext);

  /**
   * URL del icono del clima.
   * Si no hay información, se utiliza un icono predeterminado.
   * @type {string}
   */
  const iconUrl: string = context?.cardWeather
    ? `${OPEN_WEATHER_BASE_ICONS_URL}${context?.cardWeather.icon}@4x.png`
    : emptyIcon;

  return (
    <Card sx={{ maxWidth: 400, m: "30px" }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "secondary.main",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {context?.cardWeather
              ? `${context?.cardWeather.city.name}, ${context?.cardWeather.city.countryCode}`
              : "---------, --"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Temperatura:{" "}
            {context?.cardWeather
              ? context?.cardWeather.temp.toFixed(1)
              : "--,-"}
            º
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sensación térmica:{" "}
            {context?.cardWeather
              ? context?.cardWeather.feelsLike.toFixed(1)
              : "--,-"}
            º
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Humedad:{" "}
            {context?.cardWeather ? context?.cardWeather?.humidity : "--,-"}%
          </Typography>
        </Box>
        <CardMedia
          sx={{ width: "120px", height: "120px", p: "0" }}
          image={iconUrl}
          title="Weather Icon"
        />
      </CardContent>
    </Card>
  );
};
