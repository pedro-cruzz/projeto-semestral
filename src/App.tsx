import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={{ theme }}>
        <GlobalStyle />
        <p>Projeto Extensão - Saúde Mental 🧠</p>
      </ThemeProvider>
    </>
  );
}

export default App;
