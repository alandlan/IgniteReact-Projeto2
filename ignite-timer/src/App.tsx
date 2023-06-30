import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStylesw } from './styles/global';
import { defaultTheme } from './styles/theme/default';
import { Router } from './Router';

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={defaultTheme}>
				<Router />
				<GlobalStylesw />
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
