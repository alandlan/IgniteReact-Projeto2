import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { DefaultLayout } from './layout/DefaultLayout';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    );
}
