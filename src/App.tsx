import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <ThemeProvider theme={{ theme }}>
        <GlobalStyle />
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
