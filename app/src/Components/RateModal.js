import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RateModal({ show, onClose, item }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
const navigate = useNavigate();
  if (!show) {
    return null;
  }

  const handleRateBook = () => {
    // Logic to submit rating and review to backend
    if(review.length===0)
    {
      alert("write Review empty review can not be submitted")
    }
    else{
        const token = localStorage.getItem('token');
    fetch('https://serverbookstore.vercel.app/ratebook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ rating , review,item })
})
.then(response => response.json())
.then(data => {console.log(data)
 

alert(JSON.stringify(data))
})
.catch(error => console.error('There was a problem with the fetch operation:', error));
onClose();
}
  };

  return (
   <div className="overlay" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
  <div className="overlay-inner" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', maxWidth: '500px', width: '90%', maxHeight: '80%', overflowY: 'auto' }}>
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose} style={{ float: 'right', cursor: 'pointer', fontSize: '20px', color: '#aaa' }}>&times;</span>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Rate and Review: {item.volumeInfo.title}</h2>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="rating" style={{ marginRight: '10px' }}>Rating:</label>
          <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: '50px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="review" style={{ marginRight: '10px' }}>Review:</label>
          <textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <button onClick={handleRateBook} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
      </div>
    </div>
  </div>
</div>

  );
}

export default RateModal;
