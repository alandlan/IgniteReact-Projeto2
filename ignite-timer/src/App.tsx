import { ThemeProvider } from 'styled-components';
import { Button } from './components/Button';
import { GlobalStylesw } from './styles/global';
import { defaultTheme } from './styles/theme/default';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />

      <GlobalStylesw />
    </ThemeProvider>
  );
}

export default App;
