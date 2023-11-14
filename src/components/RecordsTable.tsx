import { useEffect } from "react";
import { convertTime } from "../services/functions";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { OPEN_WEATHER_BASE_ICONS_URL } from "../constants";
import { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { DeleteForever } from "@mui/icons-material";

/**
 * Definición de las columnas de la tabla de registros meteorológicos.
 * @interface
 */
interface Column {
  id:
    | "country"
    | "city"
    | "temp"
    | "feels_like"
    | "humidity"
    | "weather_icon"
    | "date";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

/**
 * Columnas de la tabla de registros meteorológicos.
 */
const columns: readonly Column[] = [
  { id: "country", label: "País", minWidth: 40 },
  { id: "city", label: "Ciudad", minWidth: 100 },
  { id: "temp", label: "Temperatura", minWidth: 60, align: "right" },
  {
    id: "feels_like",
    label: "Sensación térmica",
    minWidth: 60,
    align: "right",
  },
  { id: "weather_icon", label: "Clima", minWidth: 50, align: "right" },
  { id: "humidity", label: "Humedad", minWidth: 60, align: "right" },
  { id: "date", label: "Fecha", minWidth: 200 },
];

/**
 * Datos de cada fila de la tabla.
 */
interface Data {
  country: string;
  city: string;
  temp: number;
  feels_like: number;
  humidity: number;
  weather_icon: string;
  date: string;
  delete?: unknown;
}

/**
 * Crea un objeto de datos para una fila de la tabla.
 * @param {string} country - Código de País.
 * @param {string} city - Ciudad.
 * @param {number} temp - Temperatura.
 * @param {number} feels_like - Sensación térmica.
 * @param {number} humidity - Humedad.
 * @param {string} weather_icon - Ícono del clima.
 * @param {number} dt - Marca de tiempo.
 * @returns {Data} Objeto de datos para la fila.
 */
function createData(
  country: string,
  city: string,
  _temp: number,
  _feels_like: number,
  humidity: number,
  weather_icon: string,
  dt: number
): Data {
  const date = dt.toString();
  const feels_like = +_feels_like.toFixed(1)
  const temp = +_temp.toFixed(1)
  return { country, city, temp, feels_like, humidity, weather_icon, date };
}

/**
 * Componente funcional que muestra una tabla de registros meteorológicos.
 * @returns {JSX.Element} JSX del componente RecordsTable.
 */
export const RecordsTable = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Data | null>(null);
  // Acceso al contexto para operaciones relacionadas con el clima
  const context = useContext(WeatherContext);

  useEffect(() => {
    setPage(0);
  }, [context?.weatherRecords]);

  const rows = context?.weatherRecords
    ? context.weatherRecords.map((r) => {
        return createData(
          r.city.countryCode,
          r.city.name,
          r.temp,
          r.feelsLike,
          r.humidity,
          r.icon,
          r.timestamp
        );
      })
    : null;

  const handleOpenDeleteModal = (row: Data) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedRow(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteRecord = () => {
    if (selectedRow) {
      context?.deleteCityWeatherRecord(context?.cardWeather?.cityID||0, +selectedRow.date);
    }
    handleCloseDeleteModal();
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const lastPage = Math.ceil((rows?.length || 0) / rowsPerPage) - 1;
  if (page > lastPage) {
    setPage(lastPage);
  }

  if (!context?.weatherRecords) return <></>;
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
  {columns.map((column, columnIndex) => (
    <TableCell key={columnIndex} align={column.align}>
      {column.id === 'weather_icon' && typeof row[column.id] === 'string' ? (
        <img
          src={`${OPEN_WEATHER_BASE_ICONS_URL}${row[column.id]}@4x.png`}
          alt="Weather Icon"
          style={{ width: '50px', height: '50px' }}
        />
      ) : (
        column.id === 'date' ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {convertTime(Number(row[column.id]))}
            <IconButton onClick={() => handleOpenDeleteModal(row)} color="error">
              <DeleteForever />
            </IconButton>
          </div>
        ) : (
          row[column.id]
        )
      )}
    </TableCell>
  ))}
</TableRow>

                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal de Confirmación de Eliminación */}
      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancelar</Button>
          <Button onClick={handleDeleteRecord} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
