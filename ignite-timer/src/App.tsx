import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { defautTheme } from "./styles/theme/default";

function App() {

  return (
    <ThemeProvider theme={defautTheme}>
      <Button variant="primary"/>
      <Button variant="secondary"/>
      <Button variant="danger"/>
      <Button variant="success"/>
    </ThemeProvider>
  )
}

export default App
