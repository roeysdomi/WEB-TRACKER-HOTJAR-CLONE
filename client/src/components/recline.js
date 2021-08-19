import React, {useState, useEffect, useRef} from 'react';
import '../css/recline.css'
import { Link } from 'react-router-dom'

const Recline=(prop)=>{

  return(
    <>
     <div className="con_line">
       <div className="line">
         <div className="date">{prop.info.date}</div>
         <div className="time">{prop.info.time}</div>
        <div className="play"> <Link to={`/table/${prop.info.sesid}`}>Play</Link></div> 
       </div>
     </div>
    </>
  )
}
export default Recline
