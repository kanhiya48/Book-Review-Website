import React, { useState } from 'react';
import Main from './Components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Components/style.css';
import AuthPage from './Components/Authpage';
import AuthContext from "./Authcontext";
import { useEffect } from 'react/cjs/react.production.min';
import Seereviews from './Components/Seereviews';
// const AuthContext = React.createContext({status:null,login:()=>{}});
function App() {
    const [authstatus, setauthstatus] = useState(false);
  const login = () => {
    setauthstatus(true);
  };
 

  return (
   <React.StrictMode>
     <AuthContext.Provider value={{ status: authstatus, login: login }}>
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Main/>} />
         <Route path="Auth" element={<AuthPage/>} />
         <Route path="reviews" element={<Seereviews/>}/>
         {/* <Route path ="posts" element={<Posts />} /> */}
          <Route path="*" element={<h1>Route does not 
            exist</h1>}/>
          
      </Routes>
  </BrowserRouter>
    </AuthContext.Provider>
  </React.StrictMode>
  );
}

export default App;
