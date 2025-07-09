// src/components/Header.jsx

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Camille Dorland</h1>
        <nav>
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