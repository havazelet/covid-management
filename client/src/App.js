import './App.css';
import LogIn from './components/LogIn/LogIn';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import GoogleMapsIframe from './components/Dashboard/GoogleMapsIframe';
import CustomerDetails from './components/Dashboard/CustomerDetails';

function App() {

  return (
    <div className="App">
      <div className='app-page'>
          <Router>   
            <Routes className="App">
              <Route exact path='/' element={< LogIn />}></Route>
              <Route exact path='/login' element={< LogIn />}></Route>
              <Route exact path='/dashboard' element={< Dashboard />}></Route>
              <Route exact path='/GoogleMap' element={< GoogleMapsIframe />}></Route>
              <Route exact path='/customer/:id' element={< CustomerDetails />}></Route>
            </Routes>
          </Router>
       </div>
    </div>
  );
}

export default App;
