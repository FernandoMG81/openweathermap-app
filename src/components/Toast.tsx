import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ErrorObject } from '../types';

interface ToastProps {
  errorMessage: ErrorObject;
}

export const Toast: React.FC<ToastProps> = ({ errorMessage }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSnackbarOpen(false);
    }, 8000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

 
  return (
    <Snackbar autoHideDuration={8000} open={snackbarOpen}>
      <Alert severity="error" sx={{ width: "100%" }}>
        {errorMessage.message} - Check your API
      </Alert>
    </Snackbar>
  );
};
