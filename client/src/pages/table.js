import React, {useState, useEffect, useRef} from 'react';
import '../css/table.css'
import Recline from '../components/recline'
import useFetch from '../util/useFetch'
// table page respresent the table of recrods
const Table=()=>{

  let {data, loading} = useFetch("http://localhost:4000/gettable")

  return(
    <>
    <div className="con-pic">
      <img src="https://coralogix.com/wp-content/uploads/2020/06/Coralogix-Logo-Green-circle.png" alt=""/>
    </div>
    <div className="title">Hotjar clone - Roey sdomi </div>
    <div className="title">Mouse records</div>
    <div className="title">(roeysdomi@gmail.com)</div>


     <div className="contable">
       <div className="table">
         {
             (() => {
           if(loading){return (<b1>loading table</b1>) }
           else{
                  if(data){
                            return(data.map((g)=>{return <Recline info={g} />}))
                          }
               }
             })()
         }
       </div>
     </div>
    </>
  )
}

export default Table
