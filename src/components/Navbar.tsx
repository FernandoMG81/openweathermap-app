import { useContext, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Toolbar,
  Select,
  SelectChangeEvent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { citiesData } from "../data/cities";
import { WeatherContext } from "../context/WeatherContext";
import { CityContextType } from "../types";
import { Toast } from ".";


/**
 * Componente Navbar para seleccionar ciudades y desencadenar la recuperación de datos meteorológicos.
 * @component
 * @returns {JSX.Element} JSX del componente Navbar.
 */
export const Navbar: React.FC = (): JSX.Element => {
  // Estado para gestionar el ID de la ciudad seleccionada
  const [selectedCityID, setSelectedCityID] = useState<number>(0);
  // Estado para gestionar la casilla de verificación de registros históricos
  const [recordCheckbox, setRecordCheckbox] = useState<boolean>(false);
  // Acceso al contexto para operaciones relacionadas con el clima
  const context = useContext<CityContextType | null>(WeatherContext);

  /**
   * Maneja el evento de cambio de la selección de ciudad en el menú desplegable.
   * @param {SelectChangeEvent<string>} e - El objeto de evento.
   */
  const handleChange = (e: SelectChangeEvent<string>) => {
    setSelectedCityID(Number(e.target.value));
  };

  /**
   * Maneja el evento de cambio de la casilla de verificación de registros históricos.
   */
  const handleCheckboxChange = () => {
    setRecordCheckbox(!recordCheckbox);
  };

  /**
   * Maneja el evento de clic en el botón "Consultar".
   */
  const handleClick = () => {
    context?.addCityWeather(selectedCityID, recordCheckbox);
  };

  return (
    <Toolbar sx={{ justifyContent: "center" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <FormControl>
          <InputLabel id="citySelectlabel">Ciudades</InputLabel>
          <Select
            labelId="citySelectlabel"
            id="citySelect"
            value={selectedCityID ? selectedCityID.toString() : ""}
            label="Ciudades"
            placeholder="Seleccione una ciudad"
            sx={{ width: "300px" }}
            onChange={e => handleChange(e)}
          >
            {citiesData.map((city) => (
              <MenuItem key={city.id} value={city.id.toString()}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={recordCheckbox}
                onChange={handleCheckboxChange}
              />
            }
            label="Incluir Histórico"
          />
        </FormGroup>
        <LoadingButton
          onClick={handleClick}
          loading={context?.loading}
          variant="contained"
          disabled={selectedCityID == 0}
          sx={{ margin: "10px" }}
        >
          <span>Consultar</span>
        </LoadingButton>
      </Grid>
      {context?.error.isError && 
        <Toast errorMessage={context.error}/>
      }
    </Toolbar>
  );
};
