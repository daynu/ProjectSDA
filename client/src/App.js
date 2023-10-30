import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import './index.css'

function App() {
  return (
    <>
        <div id="navbar">
          <Link to='/'>Home</Link>
          <Link to='/contact'>Contact</Link>
          <div id = "loginSignup">
              <Link to='/login'>Login</Link>
              <Link to="/signup">Sign up</Link>
          </div>
         
        </div>
    </>
  );
}

export default App;
