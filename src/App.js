import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {
  Route,
  BrowserRouter as Router ,
  Routes,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import { useState } from 'react';
import Signup from './components/Signup';

function App() {

  const [alert, setalert] = useState(null)

  const showAlert = (messege, type) =>{
    setalert({
      messege : messege,
      type : type
      }
    )

    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  
  return (
    <>
      {/* to user states directly rather than passing it to components hierarchy context api is used. Very useful in complex projects useContext hook*/}
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} /> 
              <Route exact path="/about" element={<About/>} />  
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />  
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />  
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
