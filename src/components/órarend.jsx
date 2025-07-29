import Fejléc from "./fejléc.jsx"
import Órarend_body from "./órarend_body.jsx"
import Adatok from "./adatok.jsx";
import { useEffect, useState } from "react";
function Órarend({width,height}) {
    const[Width,SetWidth]=useState(window.innerWidth/5)
    

    // useEffect(()=>{
    //     window.addEventListener("resize",()=>{SetWidth(window.innerWidth/2)})
    //     console.log(Width)
    // },[Width])
    
    return ( 
        <div style={{width:`${width}vw`,height:`${height}vh`,display:"flex",flexDirection:"column"}}>
            <Fejléc órák_háttér_színe={"#C3E0E5"} betű_szín={"#274472"} padding={.8} fontSize={1.2} width={Width}/>
            {/* <Adatok/> */}
            <Órarend_body width={80} height={80} color={"#54AA9A"}/>
            
        </div>
     );
}

export default Órarend;