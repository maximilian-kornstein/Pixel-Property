import { useState, useEffect } from "react";

export default function App() {
  const [gameState, setGameState] = useState("menu"); // "menu", "playing", "gameover"
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [gameStats, setGameStats] = useState(null);

  if (gameState === "menu") {
    return <StartScreen onStart={(difficulty) => {
      setSelectedDifficulty(difficulty);
      setGameState("playing");
    }} />;
  }

  if (gameState === "playing") {
    return <GameScreen 
      difficulty={selectedDifficulty} 
      onGameOver={(stats) => {
        setGameStats(stats);
        setGameState("gameover");
      }}
    />;
  }

  if (gameState === "gameover") {
    return <EndGameScreen 
      stats={gameStats}
      difficulty={selectedDifficulty}
      onRestart={() => setGameState("menu")}
    />;
  }
}

// ==================== START SCREEN ====================
function StartScreen({ onStart }) {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [shakeActive, setShakeActive] = useState(false);

  const isTycoonActive = (hovered?.id === "hard") || (selected?.id === "hard");

  useEffect(() => {
    if (isTycoonActive) {
      setShakeActive(true);
      const timer = setTimeout(() => {
        setShakeActive(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShakeActive(false);
    }
  }, [isTycoonActive]);

  const CashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px', marginTop: '-2px' }}>
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
    </svg>
  );

  const CreditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px', marginTop: '-2px' }}>
      <rect x="2" y="10" width="4" height="10" fill="currentColor" />
      <rect x="8" y="6" width="4" height="14" fill="currentColor" />
      <rect x="14" y="2" width="4" height="18" fill="currentColor" />
    </svg>
  );

  const InterestIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px', marginTop: '-2px' }}>
      <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1 3-6z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const difficulties = [
    {
      id: "easy",
      name: "Rookie",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none">
          <path d="M2 12h20v8H2z" fill="#f1f5f9" stroke="#334155" strokeWidth="1"/>
          <path d="M2 12L12 2l10 10" fill="#334155"/> 
          <rect x="9" y="14" width="6" height="6" fill="#10b981"/> 
          <rect x="10" y="4" width="4" height="4" fill="#94a3b8" /> 
          <path d="M4 12h2v4H4zM18 12h2v4h-2z" fill="#94a3b8"/>
        </svg>
      ),
      cash: 200000,
      credit: 700,
      badgeText: "EASY",
      interest: 0.06,
      color: "#10b981", 
      desc: "Low Risk • Steady Growth",
      consequence: "Properties appreciate slowly but steadily",
      bg: "#f0fdf4", 
      fomo: "Perfect for beginners. Market is stable. Impossible to fail?",
      eventChance: 0.15,
      crashMin: 0.08,
      crashMax: 0.12,
      boomMin: 0.10,
      boomMax: 0.15,
      fluctuationMin: 0.02,
      fluctuationMax: 0.05,
      pattern: {
        backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      },
      idleClass: "idle-rookie",
    },
    {
      id: "normal",
      name: "Pro",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="10" width="8" height="14" fill="#1e3a8a" stroke="#1e40af" strokeWidth="1" />
          <rect x="4" y="12" width="2" height="2" fill="#60a5fa" />
          <rect x="4" y="16" width="2" height="2" fill="#60a5fa" />
          <rect x="4" y="20" width="2" height="2" fill="#60a5fa" />
          <rect x="12" y="6" width="10" height="18" fill="#2563eb" stroke="#1e40af" strokeWidth="1" />
          <rect x="14" y="8" width="6" height="2" fill="#bfdbfe" />
          <rect x="14" y="12" width="6" height="2" fill="#bfdbfe" />
          <rect x="14" y="16" width="6" height="2" fill="#bfdbfe" />
          <rect x="14" y="20" width="6" height="2" fill="#bfdbfe" />
          <rect x="16" y="2" width="2" height="4" fill="#1e40af" />
          <rect x="16" y="2" width="2" height="1" fill="#ef4444" />
        </svg>
      ),
      cash: 175000,
      credit: 600,
      badgeText: "MEDIUM",
      interest: 0.09,
      color: "#3b82f6", 
      desc: "Med Risk • Standard Market",
      consequence: "Market dips happen, but bounce back fast",
      bg: "#eff6ff", 
      fomo: "The sweet spot. Balanced economy. Can you outpace inflation?",
      eventChance: 0.25,
      crashMin: 0.12,
      crashMax: 0.18,
      boomMin: 0.12,
      boomMax: 0.20,
      fluctuationMin: 0.01,
      fluctuationMax: 0.08,
      pattern: {
        backgroundImage: `repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0px, rgba(59, 130, 246, 0.05) 1px, transparent 1px, transparent 10px)`,
      },
      idleClass: "idle-pro",
    },
    {
      id: "hard",
      name: "Tycoon",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none">
          <rect x="8" y="4" width="8" height="18" fill="#7f1d1d" stroke="#450a0a" strokeWidth="1" />
          <rect x="3" y="10" width="5" height="12" fill="#991b1b" stroke="#450a0a" strokeWidth="1" />
          <rect x="16" y="10" width="5" height="12" fill="#991b1b" stroke="#450a0a" strokeWidth="1" />
          <rect x="10" y="6" width="4" height="14" fill="#fcd34d" />
          <rect x="11" y="6" width="2" height="14" fill="#fbbf24" />
          <rect x="4" y="12" width="3" height="2" fill="#fca5a5" />
          <rect x="4" y="16" width="3" height="2" fill="#fca5a5" />
          <rect x="17" y="12" width="3" height="2" fill="#fca5a5" />
          <rect x="17" y="16" width="3" height="2" fill="#fca5a5" />
          <rect x="9" y="2" width="6" height="2" fill="#450a0a" />
          <rect x="11" y="1" width="2" height="1" fill="#ef4444" />
        </svg>
      ),
      cash: 150000,
      credit: 450,
      badgeText: "HARD",
      interest: 0.15,
      color: "#ef4444", 
      desc: "High Risk • Huge Rewards",
      consequence: "Market crashes can lose 40% value overnight",
      bg: "#1c1917", 
      fomo: "WARNING: VOLATILE MARKET. ONE BAD LOAN MEANS BANKRUPTCY.",
      eventChance: 0.40,
      crashMin: 0.25,
      crashMax: 0.40,
      boomMin: 0.20,
      boomMax: 0.35,
      fluctuationMin: -0.10,
      fluctuationMax: 0.15,
      pattern: {
        backgroundImage: `radial-gradient(rgba(239, 68, 68, 0.15) 2px, transparent 2px)`,
        backgroundSize: "16px 16px",
      },
      idleClass: "idle-tycoon",
    },
  ];

  const handleSelect = (difficulty) => {
    if (selected?.id === difficulty.id) {
      setSelected(null);
    } else {
      setSelected(difficulty);
    }
  };

  const activeCard = hovered;
  const statusText = activeCard ? activeCard.fomo : "Select a portfolio to initialize market simulation...";
  const statusColor = activeCard ? activeCard.color : "#94a3b8";
  const terminalBg = activeCard ? activeCard.bg : "#451a03"; 
  const terminalBorder = activeCard ? activeCard.color : "#78350f";
  const startButtonText = selected ? `START AS ${selected.name.toUpperCase()}` : "START GAME";

  return (
    <div style={styles.container}>
      <video
        src="/pixel_neighborhood.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          imageRendering: "pixelated",
          zIndex: 0,
        }}
      />

      <div style={styles.overlay} />

      <div 
        style={styles.contentLayer}
        className={shakeActive ? "shake-screen" : ""}
      >
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Russo+One&family=Press+Start+2P&display=swap');

            .pixel-art {
              image-rendering: pixelated;
              image-rendering: crisp-edges;
            }

            @keyframes floatRookie {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-1.5px); } 
            }
            .idle-rookie {
              animation: floatRookie 3s ease-in-out infinite;
            }

            @keyframes pulsePro {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1); }
            }
            .idle-pro {
              animation: pulsePro 2s ease-in-out infinite;
            }

            @keyframes jitterTycoon {
              0% { transform: translate(0, 0); }
              25% { transform: translate(1px, 1px); }
              50% { transform: translate(-1px, 0); }
              75% { transform: translate(0, -1px); }
              100% { transform: translate(0, 0); }
            }
            .idle-tycoon {
              animation: jitterTycoon 0.2s steps(2) infinite;
            }

            @keyframes shakeScreen {
              0% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(-2px, 2px) rotate(-0.5deg); }
              50% { transform: translate(2px, -1px) rotate(0.5deg); }
              75% { transform: translate(-1px, -2px) rotate(0deg); }
              100% { transform: translate(0, 0) rotate(0deg); }
            }
            .shake-screen {
              animation: shakeScreen 0.4s linear infinite;
            }

            @keyframes pixelBlink {
               0%, 100% { filter: brightness(1) drop-shadow(0 0 0px transparent); }
               50% { filter: brightness(1.2) drop-shadow(0 0 10px currentColor); }
            }
            .start-juiced {
               animation: pixelBlink 1s steps(2) infinite;
            }
          `}
        </style>

        <div style={styles.header}>
          <h1 style={styles.title}>PIXEL PROPERTY</h1>
        </div>

        <p style={styles.subtitle}>TINY PIXELS BIG PORTFOLIOS</p>

        <div style={styles.cards}>
          {difficulties.map((d) => {
            const isTycoon = d.id === "hard";
            const isHovered = hovered?.id === d.id;
            const isSelected = selected?.id === d.id;
            const isOtherSelected = selected && !isSelected;
            
            let currentTransform = "none";
            let currentShadow = "0 8px 10px -3px rgba(0, 0, 0, 0.05)";
            let currentOpacity = 1;
            let currentFilter = "none";

            if (isSelected) {
              currentTransform = "scale(1.05) translateY(-10px)"; 
              currentShadow = `0 20px 30px -5px rgba(0, 0, 0, 0.3)`;
            } 
            else if (isOtherSelected) {
              currentOpacity = 0.3;
              currentFilter = "grayscale(100%)";
              currentTransform = "scale(0.95)";
            }
            else if (isHovered) {
              currentShadow = `0 0 25px ${d.color}`;
              currentTransform = "translateY(-4px)";
            } 

            return (
              <div
                key={d.id}
                onMouseEnter={() => setHovered(d)}
                onMouseLeave={() => setHovered(null)}
                className={(!isHovered && !isSelected && !isOtherSelected) ? d.idleClass : ""}
                style={{
                  ...styles.card,
                  backgroundColor: d.bg,
                  ...d.pattern,
                  border: isTycoon ? "4px solid #7f1d1d" : "4px solid #451a03",
                  borderBottom: isTycoon ? `6px solid #ef4444` : `6px solid ${d.color}`,
                  transform: currentTransform,
                  boxShadow: currentShadow,
                  opacity: currentOpacity,
                  filter: currentFilter,
                  zIndex: isSelected ? 10 : 1,
                }}
                onClick={() => handleSelect(d)}
              >
                <div style={{ ...styles.badge, backgroundColor: d.color }}>
                  {d.badgeText}
                </div>

                <div style={styles.cardIcon} className="pixel-art">
                  {d.icon}
                </div>
                <h2 style={{ ...styles.cardTitle, color: d.color }}>
                  {d.name}
                </h2>

                <div style={styles.statBox}>
                  <div style={styles.statRow}>
                    <div style={{ display: 'flex', alignItems: 'center', color: isTycoon ? "#a8a29e" : "#64748b" }}>
                       <CashIcon />
                       <span>Start Cash</span>
                    </div>
                    <strong style={{ color: isTycoon ? "#ffffff" : "#334155", fontSize: "0.9rem" }}>
                      ${d.cash.toLocaleString()}
                    </strong>
                  </div>

                  <div style={styles.statRow}>
                    <div style={{ display: 'flex', alignItems: 'center', color: isTycoon ? "#a8a29e" : "#64748b" }}>
                       <CreditIcon />
                       <span>Credit Score</span>
                    </div>
                    <strong style={{ color: d.color, fontSize: "0.9rem" }}>
                      {d.credit}
                    </strong>
                  </div>

                  <div style={styles.statRow}>
                    <div style={{ display: 'flex', alignItems: 'center', color: isTycoon ? "#a8a29e" : "#64748b" }}>
                       <InterestIcon />
                       <span>Loan Interest</span>
                    </div>
                    <strong style={{ 
                        color: isTycoon ? "#ff2a2a" : "#dc2626", 
                        textShadow: isTycoon ? "0 0 8px rgba(255,0,0,0.5)" : "none",
                        fontSize: "0.9rem"
                    }}>
                      {(d.interest * 100).toFixed(0)}%
                    </strong>
                  </div>
                </div>

                <p style={{ ...styles.desc, color: isTycoon ? "#e7e5e4" : "#475569" }}>
                  {d.desc}
                </p>

                <div style={{
                   marginTop: "8px",
                   marginBottom: "8px", // Reduced from 15px
                   padding: "6px 8px", // Reduced from 12px
                   borderRadius: "4px",
                   border: `2px dashed ${d.color}`,
                   backgroundColor: isTycoon ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.5)",
                   width: "100%",
                }}>
                   <p style={{
                      fontSize: "0.7rem", // Reduced from 0.9rem
                      lineHeight: "1.2", // Reduced from 1.4
                      color: isTycoon ? "#fca5a5" : "#475569",
                     fontWeight: "800",
                     margin: 0,
                   }}>
                     {d.consequence}
                   </p>
                </div>

                <button
                  style={{
                    ...styles.button,
                    backgroundColor: d.color,
                    boxShadow: isSelected ? "inset 0 3px 0 rgba(0,0,0,0.3)" : "0 4px 0 rgba(0,0,0,0.2)",
                    transform: isSelected ? "translateY(2px)" : "translateY(0)",
                    border: "none",
                  }}
                >
                  {isSelected ? "LOCKED IN" : "SELECT"}
                </button>
              </div>
            );
          })}
        </div>

        <div style={styles.confirm}>
          <div style={{
            ...styles.terminalBox,
            backgroundColor: terminalBg,
            borderColor: terminalBorder
          }}>
            <p style={{ 
              ...styles.terminalText, 
              color: statusColor, 
              textTransform: (activeCard && activeCard.id !== 'hard') ? "none" : "uppercase" 
            }}>
              {statusText}
            </p>
          </div>

          <button
            disabled={!selected}
            className={selected ? "start-juiced" : ""}
            onClick={() => selected && onStart(selected)}
            style={{
              ...styles.startBigButton,
              backgroundColor: selected ? "#fbbf24" : "#334155", 
              color: selected ? "#78350f" : "#cbd5e1",
              border: selected ? "4px solid #451a03" : "4px dashed #64748b",
              boxShadow: selected ? "0 6px 0 #b45309, 0 10px 10px rgba(0,0,0,0.2)" : "none",
              cursor: selected ? "pointer" : "not-allowed",
              minWidth: "300px", 
            }}
          >
            <span style={{ marginRight: "15px" }}>▶</span>
            {startButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    color: "#451a03",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "'Baloo 2', cursive",
    textAlign: "center",
    backgroundColor: "#111",
  },
  
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
    width: "100%",
  },
  
  title: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "2.65rem",
    color: "#fff",
    textShadow: "4px 4px 0px #78350f",
    margin: 0,
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  
  subtitle: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.78rem",
    marginTop: "10px",
    marginBottom: "24px",           // slightly tighter
    color: "#fff",
    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
    opacity: 1,
    letterSpacing: "1px",
  },
  
  cards: {
    display: "flex",
    gap: "26px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    perspective: "1000px",
    width: "100%",
    maxWidth: "860px",              // guarantees 3 cards in one row
    margin: "0 auto",
  },
  
  card: {
    borderRadius: "0px",
    padding: "20px 18px",
    width: "260px",
    boxSizing: "border-box",        // ← THIS WAS THE MAIN CULPRIT
    cursor: "pointer",
    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s, opacity 0.3s, filter 0.3s",
    position: "relative",
    color: "#1e293b",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  
  badge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    padding: "4px 8px",
    borderRadius: "0px",
    color: "white",
    fontSize: "0.68rem",
    fontWeight: "800",
    fontFamily: "'Press Start 2P', cursive",
    zIndex: 5,
  },
  
  cardIcon: {
    fontSize: "2rem",
    marginBottom: "6px",
    filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.1))",
  },
  
  cardTitle: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1.02rem",
    margin: "10px 0",
    textTransform: "uppercase",
  },
  
  statBox: {
    width: "100%",
    marginBottom: "10px",
    borderTop: "4px double #cbd5e1",
    borderBottom: "4px double #cbd5e1",
    padding: "8px 0",
  },
  
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "4px",
    fontSize: "0.82rem",
    fontWeight: "700",
  },
  
  desc: {
    fontSize: "0.8rem",
    marginBottom: "6px",
    marginTop: "6px",
    fontWeight: "700",
  },
  
  confirm: {
    marginTop: "26px",              // reduced so bottom fits
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
  },
  
  terminalBox: {
    minHeight: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 18px",
    borderRadius: "4px",
    width: "fit-content",
    maxWidth: "700px",
    boxShadow: "0 4px 0 rgba(0,0,0,0.3)",
    transition: "background-color 0.2s, border-color 0.2s",
    borderStyle: "solid",
    borderWidth: "2px",
  },
  
  terminalText: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.76rem",
    filter: "drop-shadow(0 0 5px currentColor)",
    margin: 0,
    letterSpacing: "1px",
    lineHeight: "1.35",
  },
  
  startBigButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 42px",           // slightly smaller
    borderRadius: "0px",
    fontSize: "1.22rem",
    fontFamily: "'Press Start 2P', cursive",
    transition: "all 0.1s",
    textTransform: "uppercase",
    letterSpacing: "1px",
    minWidth: "340px",
  },
  
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.45))",
    zIndex: 1,
  },
  
  contentLayer: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    padding: "38px 20px 30px",      // reduced top padding
    animation: "fadeIn 0.6s ease-out",
  },
  
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "0px",
    color: "white",
    fontWeight: "800",
    fontSize: "0.7rem",
    cursor: "pointer",
    transition: "all 0.1s",
    fontFamily: "'Press Start 2P', cursive",
    marginTop: "auto"
  },
};

// ==================== GAME SCREEN ====================
function GameScreen({ difficulty, onGameOver }) {
  // Game State - NOW USES DIFFICULTY
  const [turn, setTurn] = useState(1);
  const [cash, setCash] = useState(difficulty.cash);
  const [creditScore, setCreditScore] = useState(difficulty.credit);
  const [ownedProperties, setOwnedProperties] = useState([]);
  const [loans, setLoans] = useState(0);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [upgradeProperty, setUpgradeProperty] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Track stats for end game
  const [totalRentCollected, setTotalRentCollected] = useState(0);
  const [biggestCrash, setBiggestCrash] = useState(0);
  const [biggestBoom, setBiggestBoom] = useState(0);

  const maxTurns = 24;
  const interestRate = difficulty.interest;

  // Property Icons
  const propertyIcons = {
    starter: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M2 12h20v8H2z" fill="#dbeafe" stroke="#1e40af" strokeWidth="1"/>
        <path d="M2 12L12 2l10 10" fill="#1e40af"/>
        <rect x="9" y="14" width="6" height="6" fill="#60a5fa"/>
      </svg>
    ),
    apartment: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="12" height="18" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1"/>
        <rect x="8" y="6" width="2" height="2" fill="#818cf8"/>
        <rect x="14" y="6" width="2" height="2" fill="#818cf8"/>
        <rect x="8" y="10" width="2" height="2" fill="#818cf8"/>
        <rect x="14" y="10" width="2" height="2" fill="#818cf8"/>
        <rect x="8" y="14" width="2" height="2" fill="#818cf8"/>
        <rect x="14" y="14" width="2" height="2" fill="#818cf8"/>
        <rect x="10" y="18" width="4" height="4" fill="#4338ca"/>
      </svg>
    ),
    townhouse: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="10" width="8" height="12" fill="#fef3c7" stroke="#92400e" strokeWidth="1"/>
        <rect x="13" y="10" width="8" height="12" fill="#fef3c7" stroke="#92400e" strokeWidth="1"/>
        <path d="M3 10L7 6l4 4" fill="#92400e"/>
        <path d="M13 10L17 6l4 4" fill="#92400e"/>
        <rect x="5" y="12" width="2" height="2" fill="#fbbf24"/>
        <rect x="15" y="12" width="2" height="2" fill="#fbbf24"/>
        <rect x="6" y="18" width="2" height="4" fill="#78350f"/>
        <rect x="16" y="18" width="2" height="4" fill="#78350f"/>
      </svg>
    ),
    condo: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <rect x="8" y="6" width="8" height="16" fill="#dcfce7" stroke="#166534" strokeWidth="1"/>
        <rect x="10" y="8" width="4" height="2" fill="#86efac"/>
        <rect x="10" y="12" width="4" height="2" fill="#86efac"/>
        <rect x="10" y="16" width="4" height="2" fill="#86efac"/>
        <rect x="10" y="20" width="4" height="2" fill="#166534"/>
      </svg>
    ),
    duplex: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="10" width="20" height="12" fill="#fce7f3" stroke="#9f1239" strokeWidth="1"/>
        <path d="M2 10L12 2l10 8" fill="#9f1239"/>
        <rect x="5" y="12" width="6" height="4" fill="#fda4af"/>
        <rect x="13" y="12" width="6" height="4" fill="#fda4af"/>
        <rect x="7" y="17" width="2" height="5" fill="#9f1239"/>
        <rect x="15" y="17" width="2" height="5" fill="#9f1239"/>
      </svg>
    ),
    commercial: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="18" fill="#f3f4f6" stroke="#1f2937" strokeWidth="1"/>
        <rect x="6" y="6" width="12" height="3" fill="#6b7280"/>
        <rect x="6" y="10" width="12" height="10" fill="#d1d5db"/>
        <rect x="8" y="12" width="3" height="3" fill="#9ca3af"/>
        <rect x="13" y="12" width="3" height="3" fill="#9ca3af"/>
        <rect x="8" y="16" width="3" height="3" fill="#9ca3af"/>
        <rect x="13" y="16" width="3" height="3" fill="#9ca3af"/>
      </svg>
    ),
  };

  const allProperties = [
  // Section 8 price range: $20K-$80K
  { id: 1, name: "Starter Home", price: 35000, rent: 950, type: "starter", color: "#3b82f6" },
  { id: 2, name: "2BR Apartment", price: 45000, rent: 1100, type: "apartment", color: "#6366f1" },
  { id: 3, name: "Townhouse", price: 55000, rent: 1300, type: "townhouse", color: "#f59e0b" },
  { id: 4, name: "Section 8 Condo", price: 42000, rent: 1050, type: "condo", color: "#10b981" },
  { id: 5, name: "Duplex Unit", price: 65000, rent: 1500, type: "duplex", color: "#ec4899" },
  { id: 6, name: "Small Commercial", price: 80000, rent: 1800, type: "commercial", color: "#64748b" },
  { id: 7, name: "Bungalow", price: 38000, rent: 975, type: "starter", color: "#06b6d4" },
  { id: 8, name: "Flat", price: 48000, rent: 1150, type: "apartment", color: "#8b5cf6" },
  { id: 9, name: "Ranch House", price: 62000, rent: 1400, type: "townhouse", color: "#f97316" },
  { id: 10, name: "Studio Unit", price: 28000, rent: 850, type: "starter", color: "#14b8a6" },
  { id: 11, name: "3BR Apartment", price: 52000, rent: 1250, type: "apartment", color: "#a855f7" },
  { id: 12, name: "Strip Mall Unit", price: 75000, rent: 1700, type: "commercial", color: "#475569" },
  { id: 13, name: "Garden Condo", price: 58000, rent: 1350, type: "condo", color: "#22c55e" },
  { id: 14, name: "Warehouse Space", price: 70000, rent: 1600, type: "commercial", color: "#52525b" },
  { id: 15, name: "Cottage", price: 40000, rent: 1000, type: "starter", color: "#0ea5e9" },
  { id: 16, name: "Triplex", price: 68000, rent: 1550, type: "duplex", color: "#f43f5e" },
];

  const [marketProperties, setMarketProperties] = useState([]);

  useEffect(() => {
    const shuffled = [...allProperties].sort(() => Math.random() - 0.5).slice(0, 6);
    setMarketProperties(shuffled);
  }, [turn]);

  const maxLoanAmount = creditScore * 200;
  const availableLoan = Math.max(0, maxLoanAmount - loans);

  const propertyValue = ownedProperties.reduce((sum, prop) => sum + prop.currentValue, 0);
  const monthlyRent = ownedProperties.reduce((sum, prop) => {
    let rent = prop.rent;
    if (prop.upgrades?.renovated) rent *= 1.25;
    return sum + rent;
  }, 0);
  const netWorth = cash + propertyValue - loans;

  const handleBuyProperty = (property) => {
    if (cash >= property.price) {
      setCash(cash - property.price);
      setOwnedProperties([
        ...ownedProperties,
        {
          ...property,
          currentValue: property.price,
          originalPrice: property.price,
          upgrades: {
            renovated: false,
            premiumTenant: false,
            maintained: false,
          },
          insurance: Math.round((property.price * 0.01) / 12), // 1% annually = ~0.08% monthly
          propertyTax: Math.round((property.price * 0.015) / 12), // 1.5% annually
          maintenance: Math.round((property.price * 0.008) / 12), // 0.8% annually
        },
      ]);
    }
  };

  const handleSellProperty = (property, index) => {
    const sellPrice = Math.round(property.currentValue * 0.85);
    
    const confirmSell = window.confirm(
      `Sell ${property.name}?\n\n` +
      `Original Price: $${property.originalPrice.toLocaleString()}\n` +
      `Current Value: $${property.currentValue.toLocaleString()}\n` +
      `Sell Price: $${sellPrice.toLocaleString()} (85% of current value)\n` +
      `Monthly Rent Lost: -$${property.rent}\n\n` +
      `Are you sure?`
    );
    
    if (confirmSell) {
      setCash(cash + sellPrice);
      const newProperties = [...ownedProperties];
      newProperties.splice(index, 1);
      setOwnedProperties(newProperties);
    }
  };

  const handleTakeLoan = (amount) => {
    if (loans + amount <= maxLoanAmount) {
      setLoans(loans + amount);
      setCash(cash + amount);
      setShowLoanModal(false);
    }
  };

  const handleUpgrade = (upgradeType, cost) => {
    if (cash < cost) {
      alert("Not enough cash for this upgrade!");
      return;
    }

    const propertyIndex = ownedProperties.findIndex(p => p === upgradeProperty);
    const newProperties = [...ownedProperties];
    
    setCash(cash - cost);
    newProperties[propertyIndex].upgrades[upgradeType] = true;
    setOwnedProperties(newProperties);
    setUpgradeProperty(null);
    
    alert(`Upgrade complete! ${upgradeType === 'renovated' ? '+25% rent' : upgradeType === 'premiumTenant' ? 'No vacancy risk' : 'Damage protection'}`);
  };

  const triggerMarketEvent = () => {
    if (Math.random() > difficulty.eventChance) return null;

    const events = [
      {
        name: "📈 MARKET BOOM",
        type: "good",
        effect: () => {
          const boost = difficulty.boomMin + Math.random() * (difficulty.boomMax - difficulty.boomMin);
          const newProperties = ownedProperties.map(prop => ({
            ...prop,
            currentValue: Math.round(prop.currentValue * (1 + boost)),
          }));
          setOwnedProperties(newProperties);
          setBiggestBoom(prev => Math.max(prev, boost * 100));
          return `All properties increased ${Math.round(boost * 100)}% in value!`;
        },
      },
      {
        name: "💰 RENT SURGE",
        type: "good",
        effect: () => {
          const bonus = monthlyRent;
          setCash(prev => prev + bonus);
          return `Double rent collected this turn! +$${bonus.toLocaleString()}`;
        },
      },
      {
        name: "📉 MARKET CRASH",
        type: "bad",
        effect: () => {
          const loss = difficulty.crashMin + Math.random() * (difficulty.crashMax - difficulty.crashMin);
          const newProperties = ownedProperties.map(prop => ({
            ...prop,
            currentValue: Math.round(prop.currentValue * (1 - loss)),
          }));
          setOwnedProperties(newProperties);
          setBiggestCrash(prev => Math.max(prev, loss * 100));
          return `Market crash! All properties lost ${Math.round(loss * 100)}% in value!`;
        },
      },
      {
        name: "🔥 PROPERTY DAMAGE",
        type: "bad",
        effect: () => {
          if (ownedProperties.length === 0) return null;
          const randomProp = ownedProperties[Math.floor(Math.random() * ownedProperties.length)];
          const repairCost = Math.round(randomProp.rent * 2);
          
          if (randomProp.upgrades?.maintained) {
            return `${randomProp.name} was damaged but your maintenance prevented it!`;
          }
          
          setCash(prev => prev - repairCost);
          return `${randomProp.name} needs repairs! -$${repairCost.toLocaleString()}`;
        },
      },
      {
        name: "👥 TENANT PROBLEMS",
        type: "bad",
        effect: () => {
          const loss = Math.round(monthlyRent * 0.5);
          setCash(prev => prev - loss);
          return `Tenant issues! Lost half this month's rent: -$${loss.toLocaleString()}`;
        },
      },
      {
        name: "💸 TAX AUDIT",
        type: "bad",
        effect: () => {
          const tax = Math.round(netWorth * 0.1);
          setCash(prev => prev - tax);
          return `Tax audit! Pay 10% of net worth: -$${tax.toLocaleString()}`;
        },
      },
    ];

    const event = events[Math.floor(Math.random() * events.length)];
    const message = event.effect();
    
    if (message) {
      return { name: event.name, message, type: event.type };
    }
    return null;
  };

  const fluctuatePropertyValues = () => {
    const newProperties = ownedProperties.map(prop => {
      const change = difficulty.fluctuationMin + Math.random() * (difficulty.fluctuationMax - difficulty.fluctuationMin);
      const direction = Math.random() > 0.5 ? 1 : -1;
      const newValue = Math.round(prop.currentValue * (1 + (change * direction)));
      
      return {
        ...prop,
        currentValue: Math.max(newValue, Math.round(prop.originalPrice * 0.5)),
      };
    });
    
    setOwnedProperties(newProperties);
  };

  const handleNextTurn = () => {
  if (turn >= maxTurns) {
    onGameOver({
      finalNetWorth: netWorth,
      finalCash: cash,
      propertiesOwned: ownedProperties.length,
      totalRentCollected: totalRentCollected,
      totalDebt: loans,
      biggestCrash: biggestCrash,
      biggestBoom: biggestBoom,
    });
    return;
  }

  // 1. Collect rent
  const rentCollected = monthlyRent;
  
  // 2. Calculate operating costs
  const totalInsurance = ownedProperties.reduce((sum, prop) => sum + (prop.insurance || 0), 0);
  const totalPropertyTax = ownedProperties.reduce((sum, prop) => sum + (prop.propertyTax || 0), 0);
  const totalMaintenance = ownedProperties.reduce((sum, prop) => {
    // Maintained upgrade reduces maintenance cost by 50%
    const cost = prop.maintenance || 0;
    return sum + (prop.upgrades?.maintained ? cost * 0.5 : cost);
  }, 0);
  
  const totalOperatingCosts = totalInsurance + totalPropertyTax + totalMaintenance;
  
  // 3. Pay loan interest
  const monthlyInterestRate = interestRate / 12;
  const interestPayment = Math.round(loans * monthlyInterestRate);
  
  // 4. Pay loan principal (minimum 1% of outstanding loan per month)
  const principalPayment = loans > 0 ? Math.round(loans * 0.01) : 0;
  const totalLoanPayment = interestPayment + principalPayment;

  // 5. Check if can afford all expenses
  const totalExpenses = totalOperatingCosts + totalLoanPayment;
  
  if (totalExpenses > cash + rentCollected && (loans > 0 || totalOperatingCosts > 0)) {
    alert(
      `⚠️ CANNOT AFFORD EXPENSES!\n\n` +
      `Rent Income: +$${rentCollected.toLocaleString()}\n` +
      `Insurance: -$${totalInsurance.toLocaleString()}\n` +
      `Property Tax: -$${totalPropertyTax.toLocaleString()}\n` +
      `Maintenance: -$${totalMaintenance.toLocaleString()}\n` +
      `Loan Payment: -$${totalLoanPayment.toLocaleString()}\n\n` +
      `Total Needed: $${totalExpenses.toLocaleString()}\n` +
      `Available: $${(cash + rentCollected).toLocaleString()}\n\n` +
      `Sell properties or take loans!`
    );
    return;
  }

  // 6. Apply all financial changes
  const netIncome = rentCollected - totalOperatingCosts - totalLoanPayment;
  setCash(prevCash => prevCash + netIncome);
  setTotalRentCollected(prev => prev + rentCollected);
  
  // Reduce loan by principal payment
  setLoans(prev => Math.max(0, prev - principalPayment));

  // 7. Fluctuate property values
  fluctuatePropertyValues();

  // 8. Portfolio Diversity Bonus
  const propertyTypes = new Set(ownedProperties.map(p => p.type));
  let diversityBonus = 0;
  if (propertyTypes.size >= 4) {
    diversityBonus = 500 * propertyTypes.size;
    setCash(prev => prev + diversityBonus);
  }

  // 9. Trigger random event
  const event = triggerMarketEvent();

  // 10. Build detailed summary
  let summary = `Turn ${turn} Complete!\n\n`;
  summary += `💰 Rent: +$${rentCollected.toLocaleString()}\n`;
  summary += `\nOPERATING COSTS:\n`;
  summary += `🛡️ Insurance: -$${totalInsurance.toLocaleString()}\n`;
  summary += `🏛️ Property Tax: -$${totalPropertyTax.toLocaleString()}\n`;
  summary += `🔧 Maintenance: -$${totalMaintenance.toLocaleString()}\n`;
  
  if (loans > 0) {
    summary += `\nLOAN PAYMENT:\n`;
    summary += `💳 Interest: -$${interestPayment.toLocaleString()}\n`;
    summary += `📉 Principal: -$${principalPayment.toLocaleString()}\n`;
    summary += `💰 Remaining Debt: $${Math.max(0, loans - principalPayment).toLocaleString()}\n`;
  }
  
  if (diversityBonus > 0) {
    summary += `\n🌟 Diversity Bonus: +$${diversityBonus.toLocaleString()}\n`;
  }
  
  summary += `\n📊 NET INCOME: ${netIncome >= 0 ? '+' : ''}$${netIncome.toLocaleString()}`;

  // Show event in modal
  if (event) {
    setCurrentEvent({
      name: event.name,
      message: `${summary}\n\n━━━━━━━━━━━━━━━━\n\n${event.message}`,
      type: event.type,
    });
  } else {
    setCurrentEvent({
      name: "📋 TURN SUMMARY",
      message: summary,
      type: "good",
    });
  }
  
  setTurn(turn + 1);
};

  const isBankrupt = cash < 0 && ownedProperties.length === 0;
  
  useEffect(() => {
    if (isBankrupt) {
      onGameOver({
        finalNetWorth: netWorth,
        finalCash: cash,
        propertiesOwned: 0,
        totalRentCollected: totalRentCollected,
        totalDebt: loans,
        biggestCrash: biggestCrash,
        biggestBoom: biggestBoom,
        bankrupt: true,
      });
    }
  }, [isBankrupt]);

  return (
    <div style={gameStyles.container}>
      <video
        src="/game_back.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          imageRendering: "pixelated",
          zIndex: 0,
        }}
      />

      <div style={gameStyles.overlay} />

      <div style={gameStyles.content}>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Baloo+2:wght@500;700;800&display=swap');
            
            .pixel-art {
              image-rendering: pixelated;
              image-rendering: crisp-edges;
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }

            .next-turn-btn:hover {
              animation: pulse 0.5s ease-in-out infinite;
            }

            .property-card {
              transition: transform 0.2s, box-shadow 0.2s;
            }

            .property-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 8px 16px rgba(0,0,0,0.3);
            }

            .buy-btn {
              transition: all 0.1s;
            }

            .buy-btn:active {
              transform: translateY(2px);
            }
          `}
        </style>

        <div style={gameStyles.hud}>
          <div style={gameStyles.hudLeft}>
            <div style={gameStyles.hudItem}>
              <span style={gameStyles.hudLabel}>TURN</span>
              <span style={gameStyles.hudValue}>{turn}/{maxTurns}</span>
            </div>
            <div style={gameStyles.hudItem}>
              <span style={gameStyles.hudLabel}>MODE</span>
              <span style={{...gameStyles.hudValue, color: difficulty.color}}>{difficulty.name.toUpperCase()}</span>
            </div>
          </div>

          <div style={gameStyles.hudCenter}>
            <h1 style={gameStyles.title}>PIXEL PROPERTY</h1>
          </div>

          <div style={gameStyles.hudRight}>
            <div style={gameStyles.hudItem}>
              <span style={gameStyles.hudLabel}>CREDIT</span>
              <span style={{...gameStyles.hudValue, color: '#10b981'}}>{creditScore}</span>
            </div>
          </div>
        </div>

        <div style={gameStyles.statsBar}>
  <div style={gameStyles.statBox}>
    <div style={gameStyles.statLabel}>💰 CASH</div>
    <div style={gameStyles.statValue}>${cash.toLocaleString()}</div>
  </div>

  <div style={gameStyles.statBox}>
    <div style={gameStyles.statLabel}>🏠 PROPERTIES</div>
    <div style={gameStyles.statValue}>{ownedProperties.length}</div>
  </div>

  <div style={gameStyles.statBox}>
    <div style={gameStyles.statLabel}>📊 NET WORTH</div>
    <div style={{...gameStyles.statValue, color: netWorth >= 0 ? '#10b981' : '#ef4444'}}>
      ${netWorth.toLocaleString()}
    </div>
  </div>

  <div style={gameStyles.statBox}>
    <div style={gameStyles.statLabel}>💵 GROSS RENT</div>
    <div style={{...gameStyles.statValue, color: '#10b981', fontSize: '1rem'}}>
      +${monthlyRent.toLocaleString()}
    </div>
  </div>
  
  <div style={gameStyles.statBox}>
    <div style={gameStyles.statLabel}>💳 TOTAL DEBT</div>
    <div style={{...gameStyles.statValue, color: '#ef4444', fontSize: '1rem'}}>
      ${loans.toLocaleString()}
    </div>
  </div>
</div>

        <div style={gameStyles.mainContent}>
          <div style={gameStyles.section}>
            <h2 style={gameStyles.sectionTitle}>🏪 MARKETPLACE</h2>
            <div style={gameStyles.propertyGrid}>
              {marketProperties.map((property) => {
                const canAfford = cash >= property.price;
                const alreadyOwned = ownedProperties.some(p => p.id === property.id);
                
                return (
                  <div
                    key={property.id}
                    className="property-card"
                    style={{
                      ...gameStyles.propertyCard,
                      opacity: alreadyOwned ? 0.5 : 1,
                      filter: alreadyOwned ? 'grayscale(100%)' : 'none',
                    }}
                  >
                    <div className="pixel-art" style={gameStyles.propertyIcon}>
                      {propertyIcons[property.type]}
                    </div>
                    
                    <h3 style={{...gameStyles.propertyName, color: property.color}}>
                      {property.name}
                    </h3>
                    
                    <div style={gameStyles.propertyStats}>
                      <div style={gameStyles.propertyStat}>
                        <span style={gameStyles.propertyStatLabel}>Price</span>
                        <span style={gameStyles.propertyStatValue}>
                          ${property.price.toLocaleString()}
                        </span>
                      </div>
                      
                      <div style={gameStyles.propertyStat}>
                        <span style={gameStyles.propertyStatLabel}>Rent/mo</span>
                        <span style={{...gameStyles.propertyStatValue, color: '#10b981'}}>
                          +${property.rent}
                        </span>
                      </div>
                    </div>

                    <button
                      className="buy-btn"
                      onClick={() => handleBuyProperty(property)}
                      disabled={!canAfford || alreadyOwned}
                      style={{
                        ...gameStyles.buyBtn,
                        backgroundColor: alreadyOwned ? '#94a3b8' : (canAfford ? property.color : '#cbd5e1'),
                        cursor: (canAfford && !alreadyOwned) ? 'pointer' : 'not-allowed',
                        opacity: (canAfford && !alreadyOwned) ? 1 : 0.6,
                      }}
                    >
                      {alreadyOwned ? 'OWNED' : (canAfford ? 'BUY' : 'TOO EXPENSIVE')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={gameStyles.section}>
            <h2 style={gameStyles.sectionTitle}>🏡 YOUR PORTFOLIO</h2>
            
            {ownedProperties.length === 0 ? (
              <div style={gameStyles.emptyPortfolio}>
                <p style={gameStyles.emptyText}>No properties yet!</p>
                <p style={gameStyles.emptySubtext}>Buy from the marketplace to start earning rent</p>
              </div>
            ) : (
              <div style={gameStyles.portfolioGrid}>
                {ownedProperties.map((property, index) => {
                  const valueChange = ((property.currentValue - property.originalPrice) / property.originalPrice) * 100;
                  const rentAmount = property.upgrades?.renovated ? Math.round(property.rent * 1.25) : property.rent;
                  
                  // Calculate net monthly income
  const insurance = property.insurance || 0;
  const propertyTax = property.propertyTax || 0;
  const maintenance = property.upgrades?.maintained ? (property.maintenance || 0) * 0.5 : (property.maintenance || 0);
  const totalCosts = insurance + propertyTax + maintenance;
  const netMonthly = rentAmount - totalCosts;

                  return (
                    <div key={index} style={gameStyles.portfolioCard}>
                      <div className="pixel-art" style={gameStyles.portfolioIcon}>
                        {propertyIcons[property.type]}
                      </div>
                      <div style={gameStyles.portfolioInfo}>
                        <div style={{...gameStyles.portfolioName, color: property.color}}>
                          {property.name}
                          {property.upgrades?.renovated && <span style={{color: '#10b981'}}> ⭐</span>}
                          {property.upgrades?.premiumTenant && <span style={{color: '#3b82f6'}}> 👥</span>}
                          {property.upgrades?.maintained && <span style={{color: '#f59e0b'}}> 🔧</span>}
                        </div>
                        <div style={gameStyles.portfolioRent}>
                          +${rentAmount}/mo
                        </div>
                        <div style={gameStyles.portfolioValue}>
                          Value: ${property.currentValue.toLocaleString()}
                          <span style={{
                            marginLeft: '5px',
                            color: valueChange >= 0 ? '#10b981' : '#ef4444',
                            fontSize: '0.6rem'
                          }}>
                            ({valueChange >= 0 ? '+' : ''}{valueChange.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div style={{display: 'flex', gap: '5px', flexDirection: 'column'}}>
                        <button
                          onClick={() => setUpgradeProperty(property)}
                          style={gameStyles.upgradeBtn}
                        >
                          ⬆️
                        </button>
                        <button
                          onClick={() => handleSellProperty(property, index)}
                          style={gameStyles.sellBtn}
                        >
                          SELL
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {currentEvent && (
          <EventModal event={currentEvent} onClose={() => setCurrentEvent(null)} />
        )}
        
        {upgradeProperty && (
          <div style={gameStyles.modalOverlay} onClick={() => setUpgradeProperty(null)}>
            <div style={gameStyles.modal} onClick={(e) => e.stopPropagation()}>
              <h2 style={gameStyles.modalTitle}>⬆️ UPGRADE PROPERTY</h2>
              
              <div style={{...gameStyles.loanInfo, marginBottom: '20px'}}>
                <div style={{textAlign: 'center', marginBottom: '10px'}}>
                  <strong style={{fontSize: '0.9rem', color: upgradeProperty.color}}>
                    {upgradeProperty.name}
                  </strong>
                </div>
                <div style={gameStyles.loanInfoRow}>
                  <span>Current Rent:</span>
                  <strong style={{color: '#10b981'}}>
                    ${upgradeProperty.upgrades?.renovated ? Math.round(upgradeProperty.rent * 1.25) : upgradeProperty.rent}/mo
                  </strong>
                </div>
              </div>

              <div style={gameStyles.upgradeOptions}>
                <button
                  onClick={() => handleUpgrade('renovated', 10000)}
                  disabled={upgradeProperty.upgrades?.renovated || cash < 10000}
                  style={{
                    ...gameStyles.upgradeOptionBtn,
                    backgroundColor: upgradeProperty.upgrades?.renovated ? '#94a3b8' : (cash >= 10000 ? '#10b981' : '#cbd5e1'),
                    cursor: (upgradeProperty.upgrades?.renovated || cash < 10000) ? 'not-allowed' : 'pointer',
                  }}
                >
                  <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>🛠️</div>
                  <div style={{fontSize: '0.7rem', fontWeight: '800'}}>RENOVATE</div>
                  <div style={{fontSize: '0.55rem', marginTop: '5px'}}>$10,000</div>
                  <div style={{fontSize: '0.5rem', opacity: 0.8}}>+25% Rent</div>
                  {upgradeProperty.upgrades?.renovated && (
                    <div style={{fontSize: '0.5rem', marginTop: '5px', color: '#10b981'}}>✓ OWNED</div>
                  )}
                </button>

                <button
                  onClick={() => handleUpgrade('premiumTenant', 5000)}
                  disabled={upgradeProperty.upgrades?.premiumTenant || cash < 5000}
                  style={{
                    ...gameStyles.upgradeOptionBtn,
                    backgroundColor: upgradeProperty.upgrades?.premiumTenant ? '#94a3b8' : (cash >= 5000 ? '#3b82f6' : '#cbd5e1'),
                    cursor: (upgradeProperty.upgrades?.premiumTenant || cash < 5000) ? 'not-allowed' : 'pointer',
                  }}
                >
                  <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>👥</div>
                  <div style={{fontSize: '0.7rem', fontWeight: '800'}}>PREMIUM</div>
                  <div style={{fontSize: '0.55rem', marginTop: '5px'}}>$5,000</div>
                  <div style={{fontSize: '0.5rem', opacity: 0.8}}>No Vacancy</div>
                  {upgradeProperty.upgrades?.premiumTenant && (
                    <div style={{fontSize: '0.5rem', marginTop: '5px', color: '#3b82f6'}}>✓ OWNED</div>
                  )}
                </button>

                <button
                  onClick={() => handleUpgrade('maintained', 2000)}
                  disabled={upgradeProperty.upgrades?.maintained || cash < 2000}
                  style={{
                    ...gameStyles.upgradeOptionBtn,
                    backgroundColor: upgradeProperty.upgrades?.maintained ? '#94a3b8' : (cash >= 2000 ? '#f59e0b' : '#cbd5e1'),
                    cursor: (upgradeProperty.upgrades?.maintained || cash < 2000) ? 'not-allowed' : 'pointer',
                  }}
                >
                  <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>🔧</div>
                  <div style={{fontSize: '0.7rem', fontWeight: '800'}}>MAINTAIN</div>
                  <div style={{fontSize: '0.55rem', marginTop: '5px'}}>$2,000</div>
                  <div style={{fontSize: '0.5rem', opacity: 0.8}}>Damage Shield</div>
                  {upgradeProperty.upgrades?.maintained && (
                    <div style={{fontSize: '0.5rem', marginTop: '5px', color: '#f59e0b'}}>✓ OWNED</div>
                  )}
                </button>
              </div>

              <button
                onClick={() => setUpgradeProperty(null)}
                style={gameStyles.closeModalBtn}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

        {showLoanModal && (
          <div style={gameStyles.modalOverlay} onClick={() => setShowLoanModal(false)}>
            <div style={gameStyles.modal} onClick={(e) => e.stopPropagation()}>
              <h2 style={gameStyles.modalTitle}>🏦 TAKE LOAN</h2>
              
              <div style={gameStyles.loanInfo}>
                <div style={gameStyles.loanInfoRow}>
                  <span>Credit Score:</span>
                  <strong style={{color: '#10b981'}}>{creditScore}</strong>
                </div>
                <div style={gameStyles.loanInfoRow}>
                  <span>Interest Rate:</span>
                  <strong style={{color: '#ef4444'}}>{(interestRate * 100).toFixed(0)}% APR</strong>
                </div>
                <div style={gameStyles.loanInfoRow}>
                  <span>Current Debt:</span>
                  <strong style={{color: '#ef4444'}}>${loans.toLocaleString()}</strong>
                </div>
                <div style={gameStyles.loanInfoRow}>
                  <span>Available Credit:</span>
                  <strong style={{color: '#3b82f6'}}>${availableLoan.toLocaleString()}</strong>
                </div>
              </div>

              <div style={gameStyles.loanOptions}>
                {[10000, 25000, 50000, 75000].map((amount) => {
                  const canAfford = amount <= availableLoan;
                  return (
                    <button
                      key={amount}
                      onClick={() => handleTakeLoan(amount)}
                      disabled={!canAfford}
                      style={{
                        ...gameStyles.loanBtn,
                        backgroundColor: canAfford ? '#10b981' : '#cbd5e1',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        opacity: canAfford ? 1 : 0.5,
                      }}
                    >
                      <div style={{fontSize: '1rem', marginBottom: '5px'}}>
                        ${(amount / 1000)}K
                      </div>
                      <div style={{fontSize: '0.5rem', opacity: 0.8}}>
                        +${Math.round(amount * interestRate / 12)}/mo
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowLoanModal(false)}
                style={gameStyles.closeModalBtn}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

        <div style={gameStyles.actionBar}>
          <button
            onClick={() => setShowLoanModal(true)}
            style={gameStyles.loanActionBtn}
          >
            🏦 TAKE LOAN
          </button>

          <button
            className="next-turn-btn"
            onClick={handleNextTurn}
            style={gameStyles.nextTurnBtn}
          >
            <span style={{marginRight: '15px'}}>▶</span>
            {turn >= maxTurns ? 'FINISH GAME' : 'NEXT TURN'}
          </button>
        </div>
      </div>
    </div>
  );
}

const gameStyles = {
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#111",
    fontFamily: "'Baloo 2', cursive",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    animation: "fadeIn 0.6s ease-out",
    overflow: "hidden",
  },
  
  hud: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "15px 20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    border: "4px solid #78350f",
    borderRadius: "0px",
  },
  hudLeft: { display: "flex", gap: "20px" },
  hudCenter: { flex: 1, textAlign: "center" },
  hudRight: { display: "flex", gap: "20px" },
  hudItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hudLabel: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.6rem",
    color: "#fbbf24",
    marginBottom: "5px",
  },
  hudValue: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1rem",
    color: "#fff",
  },
  title: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1.5rem",
    color: "#fff",
    textShadow: "4px 4px 0px #78350f",
    margin: 0,
  },

  statsBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  statBox: {
    flex: 1,
    minWidth: "150px",
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "4px solid #451a03",
    borderBottom: "6px solid #78350f",
    textAlign: "center",
  },
  statLabel: {
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "8px",
  },
  statValue: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1.2rem",
    color: "#1e293b",
  },

  mainContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    flex: 1,
    marginBottom: "20px",
    minHeight: 0,
    overflow: "hidden",
  },

  section: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "4px solid #451a03",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    overflow: "hidden",
  },
  sectionTitle: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.9rem",
    color: "#78350f",
    marginBottom: "20px",
    textAlign: "center",
  },

  propertyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    overflowY: "auto",
    paddingRight: "5px",
  },
  propertyCard: {
    backgroundColor: "#fff",
    border: "3px solid #451a03",
    borderBottom: "5px solid #78350f",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  propertyIcon: {
    marginBottom: "10px",
  },
  propertyName: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.7rem",
    marginBottom: "12px",
    textAlign: "center",
  },
  propertyStats: {
    width: "100%",
    marginBottom: "12px",
    padding: "8px 0",
    borderTop: "2px dashed #cbd5e1",
    borderBottom: "2px dashed #cbd5e1",
  },
  propertyStat: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  propertyStatLabel: {
    fontSize: "0.7rem",
    color: "#64748b",
    fontWeight: "700",
  },
  propertyStatValue: {
    fontSize: "0.75rem",
    fontWeight: "800",
    color: "#1e293b",
  },
  buyBtn: {
    width: "100%",
    padding: "8px",
    border: "none",
    color: "#fff",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.6rem",
    fontWeight: "800",
    boxShadow: "0 3px 0 rgba(0,0,0,0.2)",
  },

  portfolioGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    maxHeight: "none",
    flex: 1,
    paddingRight: "5px",
  },
  portfolioCard: {
    backgroundColor: "#f8fafc",
    border: "2px solid #cbd5e1",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },
  portfolioIcon: {
    flexShrink: 0,
  },
  portfolioInfo: {
    flex: 1,
  },
  portfolioName: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.65rem",
    marginBottom: "4px",
  },
  portfolioRent: {
    fontSize: "0.75rem",
    fontWeight: "800",
    color: "#10b981",
  },
  portfolioValue: {
    fontSize: "0.65rem",
    color: "#64748b",
    marginTop: "4px",
  },
  sellBtn: {
    padding: "8px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "2px solid #451a03",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.55rem",
    cursor: "pointer",
    transition: "all 0.1s",
    flexShrink: 0,
  },
  emptyPortfolio: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  emptyText: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginBottom: "10px",
  },
  emptySubtext: {
    fontSize: "0.85rem",
    color: "#cbd5e1",
    textAlign: "center",
  },

  actionBar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  nextTurnBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 50px",
    backgroundColor: "#fbbf24",
    color: "#78350f",
    border: "4px solid #451a03",
    borderRadius: "0px",
    fontSize: "1.2rem",
    fontFamily: "'Press Start 2P', cursive",
    cursor: "pointer",
    boxShadow: "0 6px 0 #b45309, 0 10px 10px rgba(0,0,0,0.2)",
    transition: "all 0.1s",
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    border: '6px solid #451a03',
    padding: '30px',
    minWidth: '500px',
    maxWidth: '600px',
  },
  modalTitle: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: '1.2rem',
    color: '#78350f',
    marginBottom: '20px',
    textAlign: 'center',
  },
  loanInfo: {
    backgroundColor: '#f8fafc',
    border: '3px solid #cbd5e1',
    padding: '15px',
    marginBottom: '20px',
  },
  loanInfoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '0.9rem',
    fontWeight: '700',
    borderBottom: '1px dashed #e2e8f0',
  },
  loanOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '20px',
  },
  loanBtn: {
    padding: '20px',
    border: '4px solid #451a03',
    color: '#fff',
    fontFamily: "'Press Start 2P', cursive",
    fontSize: '0.7rem',
    cursor: 'pointer',
    transition: 'all 0.1s',
    textAlign: 'center',
  },
  closeModalBtn: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#64748b',
    border: '4px solid #451a03',
    color: '#fff',
    fontFamily: "'Press Start 2P', cursive",
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  loanActionBtn: {
    padding: '20px 40px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: '4px solid #451a03',
    fontSize: '1rem',
    fontFamily: "'Press Start 2P', cursive",
    cursor: 'pointer',
    boxShadow: '0 6px 0 #059669, 0 10px 10px rgba(0,0,0,0.2)',
  },

  upgradeBtn: {
    padding: "6px 8px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "2px solid #451a03",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.6rem",
    cursor: "pointer",
    transition: "all 0.1s",
    flexShrink: 0,
  },

  upgradeOptions: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  },

  upgradeOptionBtn: {
    padding: "20px 10px",
    border: "4px solid #451a03",
    color: "#fff",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.6rem",
    cursor: "pointer",
    transition: "all 0.1s",
    textAlign: "center",
  },
};

// ==================== END GAME SCREEN ====================
function EndGameScreen({ stats, difficulty, onRestart }) {
  // Calculate rank based on net worth
  const getRank = (netWorth) => {
    if (stats.bankrupt) return { rank: "💀 BANKRUPT", color: "#000", emoji: "💀" };
    if (netWorth >= 1000000) return { rank: "🏆 PLATINUM", color: "#e5e7eb", emoji: "🏆" };
    if (netWorth >= 500000) return { rank: "🥇 GOLD", color: "#fbbf24", emoji: "🥇" };
    if (netWorth >= 250000) return { rank: "🥈 SILVER", color: "#cbd5e1", emoji: "🥈" };
    if (netWorth >= 100000) return { rank: "🥉 BRONZE", color: "#d97706", emoji: "🥉" };
    return { rank: "🪨 ROOKIE", color: "#78350f", emoji: "🪨" };
  };

  const rankInfo = getRank(stats.finalNetWorth);

  return (
    <div style={endStyles.container}>
      <video
        src="/pixel_neighborhood.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          imageRendering: "pixelated",
          zIndex: 0,
        }}
      />

      <div style={endStyles.overlay} />

      <div style={endStyles.content}>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Baloo+2:wght@500;700;800&display=swap');
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }

            .rank-emoji {
              animation: bounce 2s ease-in-out infinite;
            }
          `}
        </style>

        <h1 style={endStyles.title}>GAME OVER</h1>
        
        <div style={endStyles.rankCard}>
          <div className="rank-emoji" style={{fontSize: '5rem', marginBottom: '20px'}}>
            {rankInfo.emoji}
          </div>
          <h2 style={{...endStyles.rankText, color: rankInfo.color}}>
            {rankInfo.rank}
          </h2>
          <p style={endStyles.difficultyText}>
            {difficulty.name.toUpperCase()} MODE
          </p>
        </div>

        <div style={endStyles.statsGrid}>
          <div style={endStyles.statCard}>
            <div style={endStyles.statLabel}>FINAL NET WORTH</div>
            <div style={{...endStyles.statValue, color: stats.finalNetWorth >= 0 ? '#10b981' : '#ef4444'}}>
              ${stats.finalNetWorth.toLocaleString()}
            </div>
          </div>

          <div style={endStyles.statCard}>
            <div style={endStyles.statLabel}>PROPERTIES OWNED</div>
            <div style={endStyles.statValue}>{stats.propertiesOwned}</div>
          </div>

          <div style={endStyles.statCard}>
            <div style={endStyles.statLabel}>TOTAL RENT</div>
            <div style={{...endStyles.statValue, color: '#10b981'}}>
              ${stats.totalRentCollected.toLocaleString()}
            </div>
          </div>

          <div style={endStyles.statCard}>
            <div style={endStyles.statLabel}>FINAL DEBT</div>
            <div style={{...endStyles.statValue, color: '#ef4444'}}>
              ${stats.totalDebt.toLocaleString()}
            </div>
          </div>

          {stats.biggestCrash > 0 && (
            <div style={endStyles.statCard}>
              <div style={endStyles.statLabel}>BIGGEST CRASH</div>
              <div style={{...endStyles.statValue, color: '#ef4444'}}>
                -{stats.biggestCrash.toFixed(1)}%
              </div>
            </div>
          )}

          {stats.biggestBoom > 0 && (
            <div style={endStyles.statCard}>
              <div style={endStyles.statLabel}>BIGGEST BOOM</div>
              <div style={{...endStyles.statValue, color: '#10b981'}}>
                +{stats.biggestBoom.toFixed(1)}%
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onRestart}
          style={endStyles.restartBtn}
        >
          <span style={{marginRight: '15px'}}>🔄</span>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

const endStyles = {
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#111",
    fontFamily: "'Baloo 2', cursive",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "40px",
    animation: "fadeIn 1s ease-out",
  },
  title: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "3rem",
    color: "#fff",
    textShadow: "6px 6px 0px #78350f",
    marginBottom: "40px",
  },
  rankCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "6px solid #451a03",
    borderBottom: "10px solid #78350f",
    padding: "40px",
    marginBottom: "40px",
    display: "inline-block",
    minWidth: "400px",
  },
  rankText: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "2rem",
    marginBottom: "10px",
  },
  difficultyText: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.8rem",
    color: "#64748b",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "40px",
    maxWidth: "800px",
    margin: "0 auto 40px auto",
  },
  statCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "4px solid #451a03",
    padding: "20px",
    borderBottom: "6px solid #78350f",
  },
  statLabel: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "0.6rem",
    color: "#64748b",
    marginBottom: "10px",
  },
  statValue: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "1.3rem",
    color: "#1e293b",
  },
  restartBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px 60px",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "6px solid #451a03",
    fontSize: "1.5rem",
    fontFamily: "'Press Start 2P', cursive",
    cursor: "pointer",
    boxShadow: "0 8px 0 #059669, 0 12px 12px rgba(0,0,0,0.3)",
    transition: "all 0.1s",
  },
};

// ==================== EVENT MODAL ====================
function EventModal({ event, onClose }) {
  if (!event) return null;

  const isGood = event.type === "good";
  const bgColor = isGood ? "#dcfce7" : "#fee2e2";
  const borderColor = isGood ? "#10b981" : "#ef4444";
  const titleColor = isGood ? "#166534" : "#991b1b";

  return (
    <div style={gameStyles.modalOverlay} onClick={onClose}>
      <div style={{...gameStyles.modal, backgroundColor: bgColor, borderColor: borderColor}} onClick={(e) => e.stopPropagation()}>
        <h2 style={{...gameStyles.modalTitle, color: titleColor}}>
          {event.name}
        </h2>
        
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: `3px solid ${borderColor}`,
          marginBottom: '20px',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          fontWeight: '700',
        }}>
          {event.message}
        </div>

        <button
          onClick={onClose}
          style={{
            ...gameStyles.closeModalBtn,
            backgroundColor: borderColor,
          }}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
