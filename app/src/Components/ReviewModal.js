import react, { useEffect, useState } from 'react';
const ReviewModal=({show,item,onClose,review})=>{
    const [thisitemreview,setthisitemreview]=useState();
    useEffect(()=>{
        const arr=[];
        review.forEach(element => {
            if(element.item.id===item)
            {
                arr.push(element);
            }
        });
        setthisitemreview(arr);
    },[])
    if(!show)
    {
        return null;
    }
    // let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    return(
        <>
  <div className="overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="overlay-inner" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', maxWidth: '80%', maxHeight: '80%', overflowY: 'auto' }}>
      <button className="close" onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px', color: 'rgba(0, 0, 0, 0.5)' }}><i class="fas fa-times"></i></button>
      <div>
        {thisitemreview.map((item) => (
          <div style={{ margin: '20px', padding: '20px', border: '3px solid brown', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>User Email: {item.email}</div>
            <div style={{ marginBottom: '10px' }}>Review: {item.review}</div>
            <div>Rating: {item.rating}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</>

    )
}
export default ReviewModal;