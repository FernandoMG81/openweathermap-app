import { CssBaseline, ThemeProvider } from "@mui/material"
import { purpleTheme } from './purpleTheme';
import { ReactNode } from "react";

interface AppThemeProps {
  children: ReactNode;
}

export const AppTheme:React.FC<AppThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
