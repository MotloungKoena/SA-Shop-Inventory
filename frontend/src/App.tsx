import { useState } from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
      {isLogin ? <Login /> : <Register />}

      {/* A simple button to switch screens */}
      <div
        style={{
          textAlign: "center",
          marginTop: "1rem",
          paddingBottom: "2rem",
        }}
      >
        {/* <button 
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLogin ? "Need an account? Register" : "Already have an account? Login"}
        </button> */}

        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "transparent",
            border: "none",
            color: "#3b82f6",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "1rem",
            fontFamily: "inherit",
          }}
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default App;
