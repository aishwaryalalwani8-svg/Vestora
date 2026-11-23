
import { useState } from "react";
import "./TradingGames.css";

function TradingGames({ onPlay }) {
  const [activeGame, setActiveGame] = useState(false);

  const games = [
    {
      number: "01",
      icon: "↗",
      name: "Market Rush",
      description: "Read market signals and make your move before time runs out.",
      difficulty: "BEGINNER",
      color: "rush",
      status: "PLAY NOW",
    },
    {
      number: "02",
      icon: "◈",
      name: "Portfolio Builder",
      description: "Build your dream portfolio and balance risk and returns.",
      difficulty: "INTERMEDIATE",
      color: "portfolio",
      status: "COMING SOON",
    },
    {
      number: "03",
      icon: "⚡",
      name: "Bull vs Bear",
      description: "Predict market movements and beat the market.",
      difficulty: "ADVANCED",
      color: "bull",
      status: "COMING SOON",
    },
  ];

  return (
    <div className="trading-games">

      {/* ARENA HEADER */}
      <header className="arena-header">
        <div>
          <div className="arena-label">
            <span className="arena-pulse"></span>
            WELCOME TO YOUR VIRTUAL ARENA
          </div>

          <h1>
            MARKET<span>VERSE</span>
          </h1>

          <p>
            Play the market. Master the moves. Build your investor legacy.
          </p>
        </div>

        <div className="player-orb">
          <div className="orb-ring ring-one"></div>
          <div className="orb-ring ring-two"></div>
          <div className="orb-core">V</div>
          <span>ROOKIE</span>
        </div>
      </header>

      {/* PLAYER PROGRESS */}
      <section className="player-progress">
        <div className="progress-item">
          <span className="progress-icon xp-icon">✦</span>
          <div>
            <small>EXPERIENCE POINTS</small>
            <h2>0 <span>XP</span></h2>
          </div>
        </div>

        <div className="progress-item">
          <span className="progress-icon game-icon">◈</span>
          <div>
            <small>GAMES COMPLETED</small>
            <h2>0</h2>
          </div>
        </div>

        <div className="progress-item">
          <span className="progress-icon win-icon">♛</span>
          <div>
            <small>WIN RATE</small>
            <h2>--<span>%</span></h2>
          </div>
        </div>

        <div className="progress-item">
          <span className="progress-icon streak-icon">ϟ</span>
          <div>
            <small>DAILY STREAK</small>
            <h2>0 <span>DAYS</span></h2>
          </div>
        </div>
      </section>

      {/* FEATURED GAME ARENA */}
      <section className="rush-arena">
        <div className="rush-background-orb orb-left"></div>
        <div className="rush-background-orb orb-right"></div>

        <div className="rush-copy">
          <span className="rush-tag">
            <span></span> FEATURED GAME
          </span>

          <h2>
            MARKET
            <br />
            <span>RUSH.</span>
          </h2>

          <p>
            The market is moving. Opportunities are everywhere.
            Can you make the right call?
          </p>

          <div className="rush-meta">
            <span>◷ 5 ROUNDS</span>
            <span>✦ XP REWARDS</span>
            <span>⚡ LIVE CHALLENGE</span>
          </div>

          <button className="enter-arena-button" onClick={onPlay}>
  ENTER THE ARENA <span>↗</span>
</button>
        </div>

        <div className="rush-visual">
          <div className="coin coin-one">₹</div>
          <div className="coin coin-two">✦</div>
          <div className="coin coin-three">↗</div>

          <div className="bull-platform">
            <div className="bull-symbol">♞</div>
            <div className="platform-base"></div>
          </div>

          <div className="visual-caption">YOUR MARKET JOURNEY STARTS HERE</div>
        </div>
      </section>

      {/* GAME PORTALS */}
      <section className="game-world-section">
        <div className="world-heading">
          <div>
            <span>CHOOSE YOUR DESTINATION</span>
            <h2>Enter a game world</h2>
          </div>
          <span className="world-count">03 WORLDS</span>
        </div>

        <div className="game-world-grid">
          {games.map((game) => (
            <article className={`world-card ${game.color}`} key={game.number}>
              <div className="world-card-top">
                <span>WORLD {game.number}</span>
                <span className="world-status">{game.status}</span>
              </div>

              <div className="world-art">
                <div className="art-ring"></div>
                <div className="art-symbol">{game.icon}</div>
                <div className="art-platform"></div>
              </div>

              <h3>{game.name}</h3>
              <p>{game.description}</p>

              <div className="world-card-bottom">
                <span>{game.difficulty}</span>

                {game.number === "01" ? (
                  <button onClick={onPlay}>
                    PLAY <span>↗</span>
                  </button>
                ) : (
                  <span className="locked-label">LOCKED</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENT GALLERY */}
      <section className="achievement-world">
        <div className="world-heading">
          <div>
            <span>YOUR COLLECTION</span>
            <h2>Hall of achievements</h2>
          </div>
          <span className="world-count">0 / 4 UNLOCKED</span>
        </div>

        <div className="badge-gallery">
          <div className="achievement-badge">
            <div className="badge-art badge-gold">✦</div>
            <h4>First Trade</h4>
            <span>Complete your first game</span>
          </div>

          <div className="achievement-badge">
            <div className="badge-art badge-violet">♛</div>
            <h4>Market Mind</h4>
            <span>Score 80% or higher</span>
          </div>

          <div className="achievement-badge">
            <div className="badge-art badge-cyan">ϟ</div>
            <h4>Quick Thinker</h4>
            <span>Complete a timed round</span>
          </div>

          <div className="achievement-badge">
            <div className="badge-art badge-coral">♜</div>
            <h4>Market Legend</h4>
            <span>Reach level 5</span>
          </div>
        </div>
      </section>

      {activeGame && (
        <div className="arena-launch">
          <div>
            <span>MARKET RUSH SELECTED</span>
            <h2>Your first challenge awaits.</h2>
            <p>Next, we'll build your interactive trading rounds.</p>
          </div>

          <button onClick={() => setActiveGame(false)}>CLOSE</button>
        </div>
      )}

    </div>
  );
}

export default TradingGames;
