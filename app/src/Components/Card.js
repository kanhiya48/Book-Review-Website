import react from "react";
import { useState } from "react";
import Modal from "./Modal";
import RateModal from "./RateModal";
import AuthContext from "../Authcontext";
import { useContext } from "react";
const Card = ({ book }) => {
   const auth=useContext(AuthContext);
    const [show,setShow]=useState(false);
    const [bookItem,setItem]=useState();
    const [ModalShow,setModalShow]=useState(false);
    console.log(auth.status+"sttttttaaaaaatttuuuuuuus")
    const ratebook=()=>{
        if(auth.status===false)
        {
            alert("Login to rate boook");
        }
        else{
            console.log("true")
            setModalShow(true)
            
        }
    }
    return (
        <>
            {
                book.map((item) => {
                    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let amount=item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    if(thumbnail!= undefined && amount !=undefined)
                    {
                        return (
                            <>
                           <div style={{"text-align":"center"}}>
                            <div className="card" onClick={()=>{setShow(true);setItem(item)}}>
                                <img src={thumbnail} alt="" />
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <p className="amount">&#8377;{amount}</p>
                                </div>
                            </div>
                              {auth.status ? <button onClick={() => { ratebook(); setItem(item); setModalShow(true) }} style={{ 
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
}}>
  Rate this book
</button>
 : ''}
                              </div>
                              <Modal show={show} item={bookItem} onClose={()=>setShow(false)}/>
                              <RateModal show={ModalShow} item={bookItem} onClose={()=>setModalShow(false)}/>
                            </>
                        )
                    }
                    
                })
            }

        </>
    )
}
export default Card;