import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/home.jsx';
import { NotFound } from './pages/_404.jsx';
import { Cursor } from './components/Cursor.jsx';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<Cursor />
			<Header />
			<main>
				<Router>
					<Route path={import.meta.env.BASE_URL} component={Home} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

const rootElement = document.getElementById('app');

if (!rootElement) {
	throw new Error("L'élément #app est introuvable dans le DOM.");
}

render(<App />, rootElement);
