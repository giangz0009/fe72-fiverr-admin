import { createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import "../App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(29, 191, 115)",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
