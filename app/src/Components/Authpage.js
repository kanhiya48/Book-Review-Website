import React, { useState , useContext  } from 'react';
import AuthContext from "../Authcontext";
import { useNavigate } from 'react-router-dom';
const LoginForm = ({setlog}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  const handleLogin = () => {
    


    // Handle login logic here
 fetch('https://serverbookstore.vercel.app/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_access_token'
  },
  body: JSON.stringify({ email , password })
})
.then(response => response.json())
.then(data => {console.log(data)
  localStorage.setItem('token', data.token);
  auth.login();

alert("successfully Logined")
navigate('/');})

.catch(error => console.error('There was a problem with the fetch operation:', error));

    console.log('Logging in with username:', email, 'and password:', password);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Login</h2>
      <input 
        type="text" 
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <br />
      <input 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <br />
      <button 
        onClick={handleLogin} 
        style={{ padding: '8px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Login
      </button>
      <button 
        onClick={()=>{
          setlog(false);
        }} 
        style={{ padding: '8px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Register
      </button>
    </div>
  );
};

const RegisterForm = ({setlog}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {


      // event.preventDefault();
    const validationErrors = {};
    validationErrors.email='';
    validationErrors.password='';
    // Email validation
    if (!email || !email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password || password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    // If there are validation errors, setErrors and return
    if (Object.keys(validationErrors).length > 0) {
      // setErrors(validationErrors);
      if(validationErrors.email!==''&& validationErrors.password!=='')
      {
      alert(validationErrors.email + " " + validationErrors.password)
      return;
      }
    }


    fetch('https://serverbookstore.vercel.app/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_access_token'
  },
  body: JSON.stringify({ email , password })
})
.then(response => response.json())
.then(data => {console.log(data)
alert(JSON.stringify(data))})
.catch(error => console.error('There was a problem with the fetch operation:', error));
    // Handle registration logic here
    console.log('Registering with username:', email, 'and password:', password);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Register</h2>
      <input 
        type="text" 
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <br />
      <input 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <br />
      <button 
        onClick={handleRegister} 
        style={{ padding: '8px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Register
      </button>
       <button 
        onClick={()=>{
          setlog(true);
        }} 
        style={{ padding: '8px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Login
      </button>
    </div>
  );
};

const AuthPage = () => {
  const  [log,setlog]=useState(true)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {log ? <LoginForm setlog={setlog} /> :
      <RegisterForm setlog={setlog}/>}
    </div>
  );
};

export default AuthPage;
