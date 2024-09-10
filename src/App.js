import './App.css';
import SigninPage from './Sign_in';
import SignUpPage from './Sign_up';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Sign_in' element={<SigninPage />} />
          <Route path='/Sign_up' element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
