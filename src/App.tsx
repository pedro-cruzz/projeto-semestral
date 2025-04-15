import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";
import { AppRoutes } from "./routes";

function App() {
  return (
    <>
      <ThemeProvider theme={{ theme }}>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
