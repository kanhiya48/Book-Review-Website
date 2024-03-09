import react ,{useState}from "react";
import Card from "./Card";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../Authcontext.js";
const Main=()=>{
const navigate=useNavigate();
const auth=useContext(AuthContext);
 useEffect(()=>{
    const token = localStorage.getItem('token');
   
    if(token){

// Include token in the Authorization header
const headers = {
  Authorization: `Bearer ${token}`,
};

// Send HTTP request to backend with the headers
fetch('https://serverbookstore.vercel.app/subsequentlogin', { headers }).then((res)=>{
    console.log("working")
  return res.json().then((data)=>{
  console.log(data)
  if(data.result === 'valid'){
    console.log("yes working")
    auth.login();
  }})
});
    }
  })



    const [search,setSearch]=useState("");
    const [bookData,setData]=useState([]);
    const searchBook=(evt)=>{
        if(evt.key==="Enter"||(evt.target.tagName === "BUTTON" && evt.type === "click"))
        {
            axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyBq6Dsol79clXOR5vhDQmzYbXUj0ImikEM'+'&maxResults=40')
            .then(res=>setData(res.data.items))
            .catch(err=>console.log(err))
        }

    }
    return(
        <>
            <div className="header">
                
                <div className="row1">
                    <h1>A room without books is like<br/> a body without a soul.</h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter Your Book Name"
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook}/>
                        <button onClick={searchBook}><i onClick={searchBook} className="fas fa-search"></i></button>
                    </div><div>
                        <br/>
                   <div>
      <button style={{ 
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        marginRight: '10px',
        textDecoration: 'none',
        cursor: 'pointer'
      }}>
       { auth.status ? <button onClick={() => {
  localStorage.removeItem('token');
  window.location.reload()
}} style={{ 
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
  textDecoration: 'none',
}}>
  <p style={{ margin: '0' }}>Logout</p>
</button>
 :<button onClick={() => {
  navigate("/Auth")
}} style={{ 
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
  textDecoration: 'none',
}}>
  <p style={{ margin: '0' }}>Login</p>
</button>
}
      </button>
      <button style={{ 
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        textDecoration: 'none',
        cursor: 'pointer'
      }}>
        <Link to="/reviews" style={{ textDecoration: 'none', color: 'white' }}>
          <p style={{ margin: '0' }}>See Reviews of Books</p>
        </Link>
      </button>
    </div>
       </div>
                    <img src="./images/bg2.png" alt="" />
                </div>
            </div>

            <div className="container">
              {
                    <Card book={bookData}/>
              }  
            </div>
        </>
    )
}
export default Main;