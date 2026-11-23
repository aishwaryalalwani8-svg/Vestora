
import { useEffect, useState } from "react";
import "./MarketRush.css";

const rounds = [
  {
    company: "NOVA TECHNOLOGIES",
    symbol: "NOVA",
    price: 1240,
    change: "+4.8%",
    trend: "up",
    headline: "Company reports record quarterly profits!",
    detail: "Revenue has increased by 32% this quarter.",
    correct: "BUY",
    explanation: "Strong earnings and growing revenue can create positive market sentiment.",
    chart: "0,90 25,78 50,84 75,58 100,65 125,42 150,52 175,25 200,35 225,12 250,18 275,5 300,10",
  },
  {
    company: "ORBITAL MOTORS",
    symbol: "ORBIT",
    price: 865,
    change: "-5.2%",
    trend: "down",
    headline: "Major product recall announced!",
    detail: "The company faces unexpected repair costs and falling demand.",
    correct: "SELL",
    explanation: "A costly product recall can damage confidence and put pressure on the stock.",
    chart: "0,15 25,28 50,20 75,40 100,34 125,55 150,48 175,65 200,58 225,78 250,70 275,90 300,96",
  },
  {
    company: "ZENITH ENERGY",
    symbol: "ZEN",
    price: 2120,
    change: "+1.1%",
    trend: "up",
    headline: "Market is moving sideways today.",
    detail: "There is no major news. Buyers and sellers are almost balanced.",
    correct: "HOLD",
    explanation: "When there is no clear signal, waiting and observing can be a sensible decision.",
    chart: "0,50 25,44 50,56 75,48 100,53 125,45 150,54 175,48 200,57 225,46 250,51 275,47 300,50",
  },
  {
    company: "APEX PHARMA",
    symbol: "APEX",
    price: 1540,
    change: "+7.3%",
    trend: "up",
    headline: "New medicine receives regulatory approval!",
    detail: "The announcement has created strong positive market sentiment.",
    correct: "BUY",
    explanation: "A major product approval can improve a company's future growth outlook.",
    chart: "0,95 25,82 50,88 75,65 100,70 125,48 150,55 175,32 200,38 225,18 250,24 275,8 300,4",
  },
  {
    company: "TITANIC RETAIL",
    symbol: "TITAN",
    price: 720,
    change: "-8.6%",
    trend: "down",
    headline: "Company announces a major financial investigation.",
    detail: "Investors are concerned about uncertainty surrounding the business.",
    correct: "SELL",
    explanation: "Serious financial uncertainty can increase risk and trigger selling pressure.",
    chart: "0,8 25,18 50,12 75,35 100,28 125,48 150,43 175,62 200,55 225,77 250,70 275,91 300,98",
  },
];

function MarketRush({ onBack }) {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [history, setHistory] = useState([]);

  const current = rounds[round];

  useEffect(() => {
    if (!started || finished || selected) return;

    if (timeLeft <= 0) {
      setSelected("TIMEOUT");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished, selected, timeLeft]);

  const chooseAction = (action) => {
    if (selected) return;

    setSelected(action);

    const isCorrect = action === current.correct;
    const earnedXP = isCorrect ? 100 : 20;

    if (isCorrect) {
      setScore((previous) => previous + 1);
    }

    setXp((previous) => previous + earnedXP);

    setHistory((previous) => [
      ...previous,
      {
        symbol: current.symbol,
        action,
        correct: current.correct,
        isCorrect,
      },
    ]);
  };

  const nextRound = () => {
    if (round === rounds.length - 1) {
      setFinished(true);
      return;
    }

    setRound((previous) => previous + 1);
    setTimeLeft(20);
    setSelected("");
  };

  const restartGame = () => {
    setStarted(false);
    setRound(0);
    setTimeLeft(20);
    setScore(0);
    setXp(0);
    setSelected("");
    setFinished(false);
    setHistory([]);
  };

  const progress = ((round + (selected ? 1 : 0)) / rounds.length) * 100;
  const isCorrect = selected === current.correct;

  if (!started) {
    return (
      <div className="market-rush-page">
        <button className="rush-back" onClick={onBack}>← BACK TO MARKETVERSE</button>

        <div className="rush-intro">
          <div className="intro-orbit">↗</div>
          <span className="rush-eyebrow">THE TRADING CHALLENGE</span>
          <h1>MARKET <span>RUSH</span></h1>
          <p>
            Five market situations. Twenty seconds each.
            Make your move and prove your market instincts.
          </p>

          <div className="intro-stats">
            <div><strong>05</strong><span>ROUNDS</span></div>
            <div><strong>20s</strong><span>PER ROUND</span></div>
            <div><strong>500</strong><span>MAX XP</span></div>
          </div>

          <button className="start-rush-button" onClick={() => setStarted(true)}>
            START CHALLENGE <span>↗</span>
          </button>
          <small className="simulation-note">EDUCATIONAL SIMULATION · NO REAL MONEY INVOLVED</small>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="market-rush-page">
        <div className="rush-result">
          <span className="rush-eyebrow">CHALLENGE COMPLETED</span>
          <div className="result-trophy">♛</div>
          <h1>MARKET <span>CHAMPION?</span></h1>
          <p>Your trading simulation results are ready.</p>

          <div className="result-stats">
            <div><strong>{score}/5</strong><span>CORRECT CALLS</span></div>
            <div><strong>{xp}</strong><span>XP EARNED</span></div>
            <div><strong>{Math.round((score / 5) * 100)}%</strong><span>ACCURACY</span></div>
          </div>

          <div className="result-review">
            <h3>YOUR ROUND REPORT</h3>
            {history.map((item, index) => (
              <div className="review-row" key={index}>
                <span>0{index + 1}</span>
                <strong>{item.symbol}</strong>
                <span>{item.action === "TIMEOUT" ? "NO MOVE" : item.action}</span>
                <b className={item.isCorrect ? "review-good" : "review-bad"}>
                  {item.isCorrect ? "✓ CORRECT" : "✕ MISSED"}
                </b>
              </div>
            ))}
          </div>

          <button className="start-rush-button" onClick={restartGame}>
            PLAY AGAIN ↻
          </button>
          <button className="result-back" onClick={onBack}>BACK TO MARKETVERSE</button>
        </div>
      </div>
    );
  }

  return (
    <div className="market-rush-page">
      <header className="game-topbar">
        <button className="rush-back" onClick={onBack}>← MARKETVERSE</button>
        <div className="live-indicator"><span /> SIMULATION LIVE</div>
        <div className="game-xp">✦ {xp} XP</div>
      </header>

      <div className="game-heading">
        <div>
          <span className="rush-eyebrow">MARKET RUSH / TRADING ARENA</span>
          <h1>MAKE YOUR <span>MOVE.</span></h1>
        </div>
        <div className="round-counter">
          ROUND <strong>0{round + 1}</strong><span> / 05</span>
        </div>
      </div>

      <div className="game-progress">
        <div style={{ width: `${progress}%` }} />
      </div>

      <div className="game-layout">
        <section className="market-panel">
          <div className="panel-topline">
            <span>◈ MARKET WATCH</span>
            <span className="fictional-tag">SIMULATED STOCK</span>
          </div>

          <div className="stock-identity">
            <div>
              <span className="stock-symbol">{current.symbol}</span>
              <h2>{current.company}</h2>
            </div>
            <span className={`stock-change ${current.trend}`}>
              {current.change}
            </span>
          </div>

          <div className="stock-price">
            ₹{current.price.toLocaleString("en-IN")}
            <small> / SHARE</small>
          </div>

          <div className="chart-area">
            <div className="chart-labels">
              <span>PRICE MOVEMENT</span>
              <span>INTRADAY</span>
            </div>
            <svg viewBox="0 0 300 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={current.trend === "up" ? "#b6ff65" : "#ff6685"} stopOpacity=".3" />
                  <stop offset="100%" stopColor={current.trend === "up" ? "#b6ff65" : "#ff6685"} stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,110 ${current.chart} 300,110`}
                fill="url(#chartFill)"
              />
              <polyline
                points={current.chart}
                fill="none"
                stroke={current.trend === "up" ? "#b6ff65" : "#ff6685"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="market-insight">
            <span>MARKET INTELLIGENCE</span>
            <h3>{current.headline}</h3>
            <p>{current.detail}</p>
          </div>
        </section>

        <section className="decision-panel">
          <div className="decision-top">
            <span>YOUR NEXT MOVE</span>
            <div className={`countdown ${timeLeft <= 5 ? "urgent" : ""}`}>
              <span>◷</span> 00:{String(timeLeft).padStart(2, "0")}
            </div>
          </div>

          <div className="decision-question">
            <h2>What would you do?</h2>
            <p>Analyse the news and choose your trading action.</p>
          </div>

          <div className="decision-buttons">
            <button disabled={!!selected} className="buy-choice" onClick={() => chooseAction("BUY")}>
              <span>↗</span><strong>BUY</strong><small>Expecting growth</small>
            </button>
            <button disabled={!!selected} className="sell-choice" onClick={() => chooseAction("SELL")}>
              <span>↘</span><strong>SELL</strong><small>Expecting decline</small>
            </button>
            <button disabled={!!selected} className="hold-choice" onClick={() => chooseAction("HOLD")}>
              <span>Ⅱ</span><strong>HOLD</strong><small>Wait and observe</small>
            </button>
          </div>

          {!selected ? (
            <div className="decision-hint">CHOOSE WISELY · EVERY DECISION COUNTS</div>
          ) : (
            <div className={`decision-feedback ${isCorrect ? "correct" : "incorrect"}`}>
              <strong>
                {selected === "TIMEOUT"
                  ? "TIME'S UP!"
                  : isCorrect
                  ? "EXCELLENT CALL! +100 XP"
                  : "NOT QUITE! +20 XP"}
              </strong>
              <p>{current.explanation}</p>
              <span>BEST ACTION: {current.correct}</span>
              <button onClick={nextRound}>
                {round === rounds.length - 1 ? "VIEW RESULTS" : "NEXT ROUND →"}
              </button>
            </div>
          )}
        </section>
      </div>

      <footer className="game-footer">
        <span>VESTORA · MARKET RUSH</span>
        <span>FICTIONAL MARKET DATA · FOR LEARNING ONLY</span>
      </footer>
    </div>
  );
}

export default MarketRush;
