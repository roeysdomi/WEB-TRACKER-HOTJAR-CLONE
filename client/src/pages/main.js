import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import '../css/main.css'
import useFetch from '../util/useFetch'

// Main page respresent the mouse stimulation

// globals
let arr = []
let timeoutarr=[]
let counter = 0;
let lastplay=0;
let resolution=0;

const Main = () => {
   //Main objects and refs
  const mos = useRef(0);
  const resu = useRef(0);
  const [mx, setmx] = useState(0)
  let {id}=useParams()
  let {data, loading} = useFetch(`http://localhost:4000/getrecord/${id}`)

  // inside functions (require Main objects)
  const setRefs = (d) => {
    d = d.split("-")
    let x = d[0]
    let y = d[1]
    if(x==="click")
    {
        mos.current.style.width="90px";
        mos.current.style.height="90px";
        mos.current.style.color="green";
        mos.current.style.background="green";

    }
    else{
      mos.current.style.width="4px";
      mos.current.style.height="4px";
      mos.current.style.color="black";
    }
    mos.current.style.left = x + "px"
    mos.current.style.top = y + "px"
    let f=resolution.split("x")
    resu.current.style.width=f[0]+"px"
    resu.current.style.height=f[1]+"px"

  }

  const run = () => {
        let z=0
    for (let i=lastplay; i < arr.length; i++) {
      let seto= setTimeout(() => {
        setRefs(arr[i])
        lastplay=i
      }, z++ * 20)
      timeoutarr.push(seto)
     }
  }

  return (<div className="main">

    {
      (() => {
        if (loading) {
          return <b1>loading</b1>
        } else {
          return (<div ref={resu} className="screen">
            <div ref={mos} className="mouse"></div>
          </div>)
        }
      })()
    }
        <div className="con-control">
          <div onClick={() => {
              createNewArray(data)
              run()
            }} className="clickmain">Play</div>
            <div onClick={() => {
               cleartime()
            }} className="clickmain">Pause</div>
            <div onClick={() => {
               cleartime()
               lastplay=0;
            }} className="clickmain">Restart</div>
            <Link className="clickmain" onClick={()=>{cleartime()}}to={`/table`}>Back to table</Link>
        </div>


      {/*close main  */}
  </div>)

}

// outside function (wont require an compnent objects)
const cleartime=()=>
{
   timeoutarr.forEach(g=>
   {
     clearTimeout(g)
   })
}
const createNewArray=(data)=>{
     if(data===null){return}
     if(arr.length>0){return}
     console.log(data)
     resolution=data[0].screensize
     console.log(resolution)
      data.forEach((g) => {
        let rec=g.record.split(",")
         rec.forEach((z)=>{
           arr.push(z)
         })
      });
      console.log(arr)
}
export default Main
