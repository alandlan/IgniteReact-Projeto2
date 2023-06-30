import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<h1>Not Found</h1>} />
			<Route path="/history" element={<h1>History</h1>} />
		</Routes>
	);
}
