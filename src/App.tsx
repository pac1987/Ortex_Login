import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login.component';
import SignUp from './components/signup.component';
import Reset from './components/reset.component';
import { useRef } from "react";

function App() {

  const ws = new WebSocket('wss://stream.tradingeconomics.com/?client=guest:guest');
  const time = useRef<any>();
  const price = useRef<any>();


  ws.onopen = function open(event) {
    console.log('connected');
    console.log(event);
    ws.send(JSON.stringify({ 'topic': 'subscribe', 'to': 'EURUSD:CUR' }));
  };

  ws.onclose = function close() {
    console.log('disconnected');
  };

  ws.onmessage = function incoming(data) {
    console.log('Time')
    console.log(data.data)
    console.log(JSON.parse(data.data))
    if (time && time.current) {
      time.current.innerText = JSON.parse(data.data).dt
      const dateformat = new Date();
      dateformat.toDateString()
      console.log(dateformat)
    }

    ws.onmessage = function incoming(data) {
      console.log('Price')
      console.log(data.data)
      console.log(JSON.parse(data.data))
      if (price && price.current) {
        price.current.innerText = JSON.parse(data.data).price;
      }
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Ortex
            </Link>
            <div id="sse">            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div ref={time} style={{ position: "absolute", top: 0, right: 0, zIndex: 8000, border: "1px solid Green", backgroundColor: "green" }}>
        </div>
        <div ref={price} style={{ position: "absolute", top: 30, right: 0, zIndex: 5000, border: "1px solid red", backgroundColor: "red" }}>
        </div>


        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/reset" element={<Reset />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App