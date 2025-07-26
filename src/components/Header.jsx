import { useHeader } from '../hooks/header.js';


const Header = () => {
  useHeader(); // <-- Appel du hook ici
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Camille Dorland</h1>
        <span className="nav-toogle">
          <span></span>
        </span>
        <nav className="nav hide">
          <ul className="nav-list">
            <li><a href="#hero">Accueil</a></li>
            <li><a href="#carousel">Projets</a></li>
            <li><a href="#playground">Playground</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export { Header };