

import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import TradingGames from "./pages/TradingGames";
import MarketRush from "./pages/MarketRush";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Overview");
const [showMarketRush, setShowMarketRush] = useState(false);

  const menuItems = [
    "Overview",
    "Markets",
    "Portfolio",
    "Transactions",
    "Academy",
    "Trading Games",
  ];

  return (
    <div className="app-layout">
      <header className="top-navigation">
        <div className="brand">
          VESTORA
          <span>INVESTMENT TERMINAL</span>
        </div>

        <nav className="navigation-menu">
          {menuItems.map((item) => (
            <button
              key={item}
              className={activePage === item ? "nav-link active" : "nav-link"}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <main className="main-content">
  <Navbar activePage={activePage} />

  {activePage === "Overview" ? (
  <Dashboard
    searchTerm=""
    onNavigate={setActivePage}
  />
) : activePage === "Trading Games" ? (
  showMarketRush ? (
    <MarketRush onBack={() => setShowMarketRush(false)} />
  ) : (
    <TradingGames onPlay={() => setShowMarketRush(true)} />
  )
) : (
    <div className="coming-soon">
      <h2>{activePage}</h2>
      <p>This section is under development.</p>
      <button onClick={() => setActivePage("Overview")}>
        Back to Overview
      </button>
    </div>
  )}
</main>
    </div>
  );
}

export default App;
