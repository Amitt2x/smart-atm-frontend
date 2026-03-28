import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Syne', sans-serif;
    background: #0a0a12;
  }

  .atm-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a12;
    position: relative;
    overflow: hidden;
  }

  .atm-root::before {
    content: '';
    position: fixed;
    top: -30%;
    left: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
    pointer-events: none;
    animation: pulse1 6s ease-in-out infinite alternate;
  }

  .atm-root::after {
    content: '';
    position: fixed;
    bottom: -20%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%);
    pointer-events: none;
    animation: pulse2 7s ease-in-out infinite alternate;
  }

  @keyframes pulse1 {
    from { transform: scale(1) translate(0,0); }
    to { transform: scale(1.15) translate(40px, 30px); }
  }
  @keyframes pulse2 {
    from { transform: scale(1) translate(0,0); }
    to { transform: scale(1.1) translate(-30px, -20px); }
  }

  .glass-card {
    position: relative;
    z-index: 10;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 28px;
    padding: 48px 44px;
    width: 420px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset;
    animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .atm-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
  }

  .logo-icon {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 8px 24px rgba(99,102,241,0.4);
  }

  .logo-text {
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .logo-text span {
    background: linear-gradient(90deg, #6366f1, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.3);
    margin-bottom: 20px;
  }

  .field-group {
    margin-bottom: 16px;
  }

  .field-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
    display: block;
  }

  .glass-input {
    width: 100%;
    padding: 14px 18px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    color: #fff;
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    outline: none;
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
  }

  .glass-input::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .glass-input:focus {
    border-color: rgba(99,102,241,0.6);
    background: rgba(99,102,241,0.08);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  }

  .btn-primary {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border: none;
    border-radius: 14px;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    margin-top: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 8px 24px rgba(99,102,241,0.35);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(99,102,241,0.5);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  .error-msg {
    margin-top: 14px;
    padding: 12px 16px;
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 10px;
    color: #fca5a5;
    font-size: 13px;
    text-align: center;
  }

  /* Dashboard */
  .balance-card {
    background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(236,72,153,0.2));
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 28px;
    position: relative;
    overflow: hidden;
  }

  .balance-card::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%);
    pointer-events: none;
  }

  .balance-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.45);
    margin-bottom: 10px;
  }

  .balance-amount {
    font-family: 'DM Mono', monospace;
    font-size: 38px;
    font-weight: 500;
    color: #fff;
    letter-spacing: -1px;
  }

  .balance-amount .currency {
    font-size: 22px;
    opacity: 0.6;
    margin-right: 4px;
  }

  .btn-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 12px;
  }

  .btn-deposit {
    padding: 13px;
    background: rgba(34,197,94,0.15);
    border: 1px solid rgba(34,197,94,0.3);
    border-radius: 14px;
    color: #86efac;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-deposit:hover {
    background: rgba(34,197,94,0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(34,197,94,0.2);
  }

  .btn-withdraw {
    padding: 13px;
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 14px;
    color: #fca5a5;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-withdraw:hover {
    background: rgba(239,68,68,0.22);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(239,68,68,0.2);
  }

  .btn-statement {
    width: 100%;
    padding: 13px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    color: rgba(255,255,255,0.6);
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.2s ease;
    letter-spacing: 0.3px;
  }

  .btn-statement:hover {
    background: rgba(255,255,255,0.09);
    color: #fff;
  }

  .txn-list {
    margin-top: 24px;
  }

  .txn-header {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.3);
    margin-bottom: 14px;
  }

  .txn-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    margin-bottom: 8px;
    animation: fadeUp 0.3s ease both;
  }

  .txn-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .txn-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .txn-dot.deposit { background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.5); }
  .txn-dot.withdraw { background: #ef4444; box-shadow: 0 0 8px rgba(239,68,68,0.5); }

  .txn-type {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
    text-transform: capitalize;
  }

  .txn-time {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    margin-top: 2px;
  }

  .txn-amount {
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    font-weight: 500;
  }

  .txn-amount.deposit { color: #86efac; }
  .txn-amount.withdraw { color: #fca5a5; }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 24px 0;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: rgba(255,255,255,0.3);
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
    margin-top: 8px;
  }

  .logout-btn:hover { color: rgba(255,255,255,0.6); }
`;

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [showTxns, setShowTxns] = useState(false);
  const [name, setName] = useState("");

  const login = async () => {
    try {
      const response = await fetch("https://smart-atm-backend-1.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ card_number: cardNumber, pin }),
      });
      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance);
        setName(data.name);   
        setLoggedIn(true);
        setMessage("");
      } else {
        setMessage(data.detail);
      }
    } catch {
      setMessage("Server se connect nahi ho paya. Backend chal raha hai?");
    }
  };

 const deposit = async () => {
  try {
    const response = await fetch("https://smart-atm-backend-1.onrender.com/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card_number: cardNumber,
        amount: parseFloat(amount),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setBalance(data.new_balance);
      setAmount("");
    } else {
      alert(data.detail);
    }
  } catch {
    alert("Server error");
  }
};

  const withdraw = async () => {
  try {
    const response = await fetch("https://smart-atm-backend-1.onrender.com/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card_number: cardNumber,
        amount: parseFloat(amount),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setBalance(data.new_balance);
      setAmount("");
    } else {
      alert(data.detail);
    }
  } catch {
    alert("Server error");
  }
};
  const loadTransactions = async () => {
    const response = await fetch(
      `https://smart-atm-backend-1.onrender.com/transactions?card_number=${cardNumber}`
    );
    const data = await response.json();
    setTransactions(data);
    setShowTxns(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="atm-root">
        <div className="glass-card">
          <div className="atm-logo">
            <div className="logo-icon">💳</div>
            <div className="logo-text">Smart<span>ATM</span></div>
          </div>

          {!loggedIn ? (
            <>
              <p className="section-title">Apna account access karein</p>
              <div className="field-group">
                <label className="field-label">Card Number</label>
                <input
                  className="glass-input"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="field-group">
                <label className="field-label">PIN</label>
                <input
                  className="glass-input"
                  type="password"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()}
                />
              </div>
              <button className="btn-primary" onClick={login}>
                Login →
              </button>
              {message && <div className="error-msg">{message}</div>}
            </>
          ) : (
            <>
              <div className="balance-card">
                <div style={{ 
                       fontSize: "14px", 
                       color: "rgba(255,255,255,0.6)", 
                       marginBottom: "18px" 
                        }}>
                      Welcome back, <strong style={{color:"#fff"}}>{name}</strong> 👋
                        </div>
                <div className="balance-label">Available Balance</div>
                <div className="balance-amount">
                  <span className="currency">₹</span>
                  {Number(balance).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Amount (₹)</label>
                <input
                  className="glass-input"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="btn-row">
                <button className="btn-deposit" onClick={deposit}>
                  ↑ Deposit
                </button>
                <button className="btn-withdraw" onClick={withdraw}>
                  ↓ Withdraw
                </button>
              </div>

              <button className="btn-statement" onClick={loadTransactions}>
                📋 Mini Statement
              </button>

              {showTxns && transactions.length > 0 && (
                <div className="txn-list">
                  <div className="txn-header">Recent Transactions</div>
                  {transactions.map((txn) => (
                    <div className="txn-item" key={txn.id}>
                      <div className="txn-left">
                        <div className={`txn-dot ${txn.type}`} />
                        <div>
                          <div className="txn-type">{txn.type}</div>
                          <div className="txn-time">{txn.timestamp}</div>
                        </div>
                      </div>
                      <div className={`txn-amount ${txn.type}`}>
                        {txn.type === "deposit" ? "+" : "−"}₹{Number(txn.amount).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="divider" />
              <button className="logout-btn" onClick={() => { setLoggedIn(false); setTransactions([]); setShowTxns(false); setBalance(null); }}>
                ← Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;