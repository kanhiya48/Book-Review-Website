import react, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import RateModal from "./RateModal";
import AuthContext from "../Authcontext";
import { useContext } from "react";
import ReviewModal from "./ReviewModal";
const Seereviews = () => {

    const [review,setreview]=useState();
     const [ ModalShow,setModalShow]=useState(false);
    useEffect(()=>{
        fetch('https://serverbookstore.vercel.app/seereviews')
  .then(response => {
   
    return response.json(); // Parse the JSON data in the response
  })
  .then(data => {
    // Handle the parsed JSON data
    console.log('Data:', data);
    setreview(data);

  })
  .catch(error => {
    // Handle errors during the fetch or JSON parsing
    console.error('Error:', error);
  });
  
    },[])
   const auth=useContext(AuthContext);
    const [show,setShow]=useState(false);
    const [bookItem,setItem]=useState();
    // const [ModalShow,setModalShow]=useState(false);
 console.log(review)
  
    return (
        <div>
  <h1 style={{ textAlign: 'center' }}>See Reviews given by our website Users</h1>
  <div style={{ maxWidth: 'none', margin: '0 auto', padding: '0 15px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      {review ? review.map((ele) => {
        const item = ele.item
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        if (thumbnail !== undefined && amount !== undefined) {
          return (
            <div style={{ textAlign: 'center' }}>
              <div className="card" onClick={() => { setShow(true); setItem(item) }}>
                <img src={thumbnail} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
                <div className="bottom">
                  <h3 className="title">{item.volumeInfo.title}</h3>
                  <p className="amount">&#8377;{amount}</p>
                </div>
              </div>
              <button onClick={() => { setItem(item); setModalShow(true) }} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease', marginTop: '10px' }}>
                See Reviews
              </button>
            </div>
          )
        }
      }) : ""}
    </div>
  </div>
</div>

    )
}
export default Seereviews;