import bullHero from "../bull.png";
import { useEffect, useState } from "react";
import "./Dashboard.css";

const stocks = [
  { name: "Reliance Industries", symbol: "RELIANCE", price: "₹1,452.80", change: "+2.45%", positive: true, color: "lime", spark: "2,22 12,17 22,19 32,10 42,14 52,4 62,7 72,2" },
  { name: "Tata Consultancy", symbol: "TCS", price: "₹3,248.50", change: "+1.82%", positive: true, color: "violet", spark: "2,18 12,22 22,12 32,16 42,8 52,10 62,3 72,5" },
  { name: "Infosys", symbol: "INFY", price: "₹1,685.20", change: "−0.65%", positive: false, color: "rose", spark: "2,4 12,8 22,5 32,15 42,12 52,20 62,16 72,24" },
  { name: "HDFC Bank", symbol: "HDFCBANK", price: "₹1,924.75", change: "+1.24%", positive: true, color: "blue", spark: "2,21 12,18 22,20 32,11 42,14 52,7 62,8 72,3" },
];

const chartPoints = "0,114 42,107 84,111 126,93 168,99 210,78 252,84 294,61 336,69 378,44 420,51 462,29 504,38 546,14 588,21 630,6";

function Dashboard({ searchTerm = "", onNavigate = () => {} }) {
  const [range, setRange] = useState("1W");
  const [notice, setNotice] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const filteredStocks = stocks.filter((stock) =>
    `${stock.name} ${stock.symbol}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const startedAt = performance.now();
    let frameId;
    const animateBalance = (now) => {
      const progress = Math.min((now - startedAt) / 1100, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setWalletBalance(Math.round(100000 * easedProgress));
      if (progress < 1) frameId = window.requestAnimationFrame(animateBalance);
    };
    frameId = window.requestAnimationFrame(animateBalance);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  function previewOrder(action, symbol) {
    setNotice(`${action} ${symbol}: practice order preview only. No trade was placed.`);
    window.clearTimeout(window.orderNoticeTimer);
    window.orderNoticeTimer = window.setTimeout(() => setNotice(""), 3600);
  }

  return (
    <div className="dashboard">
      <section className="market-hero">

  <img
    src={bullHero}
    alt="Vestora Stock Market Bull"
    className="bull-background"
  />

  <div className="hero-overlay"></div>

  <div className="hero-content">

    <span className="market-tag">
      MARKET OPEN
    </span>

    <h1>Good evening, Investor.</h1>

    <p>
      Grow your portfolio. Learn more. Invest smarter.
    </p>

  </div>

</section>

      <section className="stats-grid" aria-label="Portfolio overview">
        <article className="stat-card wallet-card">
          <div className="stat-heading"><span>VIRTUAL WALLET</span><span className="stat-icon">₹</span></div>
          <h3>₹{new Intl.NumberFormat("en-IN").format(walletBalance)}<span className="decimal">.00</span></h3>
          <p><span className="tiny-orbit">↗</span> Your starting capital</p>
          <div className="wallet-glow" />
        </article>
        <article className="stat-card">
          <div className="stat-heading"><span>TOTAL INVESTED</span><span className="stat-icon">↗</span></div>
          <h3>₹0<span className="decimal">.00</span></h3>
          <p>Capital deployed <span className="muted-separator">·</span> 0 positions</p>
        </article>
        <article className="stat-card">
          <div className="stat-heading"><span>PORTFOLIO VALUE</span><span className="stat-icon">◫</span></div>
          <h3>₹0<span className="decimal">.00</span></h3>
          <p>Holdings mark-to-market</p>
        </article>
        <article className="stat-card profit-card">
          <div className="stat-heading"><span>TOTAL PROFIT / LOSS</span><span className="stat-icon">⌁</span></div>
          <h3>₹0<span className="decimal">.00</span></h3>
          <p><span className="flat-indicator">— 0.00%</span> all-time return</p>
        </article>
      </section>

      <section className="main-grid">
        <article className="dashboard-panel performance-panel">
          <div className="panel-heading">
            <div><div className="panel-kicker">YOUR SIMULATED EQUITY</div><h3>Portfolio performance</h3></div>
            <div className="range-tabs" role="group" aria-label="Chart time range">
              {["1D", "1W", "1M", "ALL"].map((item) => <button key={item} className={range === item ? "selected" : ""} onClick={() => setRange(item)}>{item}</button>)}
            </div>
          </div>
          <div className="chart-summary"><strong>₹1,00,000.00</strong><span className="chart-change">— 0.00%</span><span className="chart-caption">since you started</span></div>
          <div className="performance-chart">
            <div className="chart-y-labels"><span>₹1.04L</span><span>₹1.02L</span><span>₹1.00L</span><span>₹98K</span></div>
            <svg viewBox="0 0 630 130" preserveAspectRatio="none" role="img" aria-label="Illustrative portfolio performance chart for the selected period">
              <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#b6ff43" stopOpacity=".23" /><stop offset="100%" stopColor="#b6ff43" stopOpacity="0" /></linearGradient></defs>
              <path className="chart-area" d={`M ${chartPoints.replaceAll(" ", " L ")} L 630,130 L 0,130 Z`} />
              <polyline className="chart-stroke" points={chartPoints} />
              <circle className="chart-endpoint" cx="630" cy="6" r="4" />
            </svg>
            <div className="chart-x-labels"><span>MON 17</span><span>TUE 18</span><span>WED 19</span><span>THU 20</span><span>FRI 21</span><span>TODAY</span></div>
          </div>
          <div className="chart-footnote"><span><i /> ILLUSTRATIVE SIMULATION CURVE</span><span>Returns appear after you place practice trades</span></div>
        </article>

        <article className="dashboard-panel level-panel">
          <div className="level-topline"><span className="panel-kicker">INVESTOR PROFILE</span><span className="level-season">SEASON 01</span></div>
          <div className="level-emblem"><span>04</span><i>LVL</i><b>✦</b></div>
          <h3>Market scout</h3>
          <p className="level-subtitle">Your instincts are taking shape.</p>
          <div className="xp-heading"><span>LEVEL PROGRESS</span><strong>2,450 <small>/ 3,000 XP</small></strong></div>
          <div className="xp-track"><span /></div>
          <div className="xp-next"><span>550 XP to next level</span><span>05 <b>EXECUTOR</b></span></div>
          <div className="level-divider" />
          <div className="streak-row"><div className="streak-icon">♨</div><div><strong>7 day streak</strong><span>One lesson a day. Keep it alive.</span></div><div className="streak-days"><i /><i /><i /><i /><i /><i /><i className="today" /></div></div>
        </article>
      </section>

      <section className="engagement-grid">
        <article className="mission-panel">
          <div className="mission-marker"><span>01</span><i>DAILY MISSION</i></div>
          <div className="mission-copy"><h3>Read the risk before the reward.</h3><p>Finish “Risk &amp; Return” to earn 150 XP and extend your streak.</p></div>
          <div className="mission-progress"><div><span>LESSON PROGRESS</span><strong>2 / 4</strong></div><div className="mission-track"><span /></div></div>
          <button className="mission-button" onClick={() => onNavigate("Academy")}>CONTINUE <span>↗</span></button>
        </article>
        <article className="dashboard-panel achievements-panel">
          <div className="achievement-heading"><div><div className="panel-kicker">MILESTONES</div><h3>Achievement vault</h3></div><span className="achievement-count">02 <i>/ 08</i></span></div>
          <div className="achievement-list">
            <div className="achievement-item unlocked"><span className="badge-icon">✧</span><div><strong>First steps</strong><small>Complete your profile</small></div><b>UNLOCKED</b></div>
            <div className="achievement-item unlocked"><span className="badge-icon">⌁</span><div><strong>Seven in a row</strong><small>Build a 7-day learning streak</small></div><b>UNLOCKED</b></div>
            <div className="achievement-item locked"><span className="badge-icon">◇</span><div><strong>First position</strong><small>Make your first practice trade</small></div><b>LOCKED</b></div>
          </div>
        </article>
      </section>

      <section className="dashboard-panel market-panel">
        <div className="panel-heading market-heading">
          <div><div className="panel-kicker">PAPER TRADING UNIVERSE</div><h3>Market watch <span className="watch-count">{filteredStocks.length.toString().padStart(2, "0")} INSTRUMENTS</span></h3></div>
          <button className="view-all" onClick={() => onNavigate("Markets")}>EXPLORE UNIVERSE <span>↗</span></button>
        </div>
        <div className="market-list">
          <div className="market-table-head"><span>INSTRUMENT</span><span>LAST PRICE</span><span>DAY CHANGE</span><span>7D TREND</span><span>SIMULATE</span></div>
          {filteredStocks.length ? filteredStocks.map((stock, index) => (
            <div className="market-row" key={stock.symbol} style={{ "--row-index": index }}>
              <div className="instrument-cell"><span className={`company-mark ${stock.color}`}>{stock.symbol.slice(0, 1)}</span><div><strong>{stock.name}</strong><span>{stock.symbol} <i>·</i> NSE</span></div></div>
              <strong className="price-cell">{stock.price}</strong>
              <span className={`change-cell ${stock.positive ? "positive" : "negative"}`}>{stock.change}<i>{stock.positive ? "↗" : "↘"}</i></span>
              <svg className={`mini-chart ${stock.positive ? "positive" : "negative"}`} viewBox="0 0 76 28" aria-label={`${stock.symbol} illustrative 7 day trend`}><polyline points={stock.spark} /></svg>
              <div className="trade-actions"><button onClick={() => previewOrder("Buy", stock.symbol)}>BUY</button><button onClick={() => previewOrder("Sell", stock.symbol)}>SELL</button></div>
            </div>
          )) : <div className="empty-search">No instruments match “{searchTerm}”. Try a company name or ticker.</div>}
        </div>
        <div className="market-disclaimer"><span>ⓘ</span> Prices and movements are sample data for learning. This simulator is not connected to a live exchange.</div>
      </section>
      {notice && <div className="toast-message" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}
    </div>
  );
}

export default Dashboard;
