import React, { useContext,useEffect } from 'react'
import { useState } from "react"
import Órarend from "./órarend"
//import "../index.css"
import Adatbekérés from "./adatbekérés"
import Adatok from "./adatok" 
import { Tárgyak_listaja } from "./adatok";

function Content() {
    const [open,SetOpen]=useState(false)
    const { torlesOsszesOra } = useContext(Tárgyak_listaja);
    
  return (
    <div className="orarend-container" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#4E4E4E",padding:"0",margin:"0",flexDirection:"column",boxSizing:"border-box",width:"100vw"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <button style={{marginBottom:"2vh",marginTop:"-3vh",padding:"1rem",fontSize:"1.5em",borderTopLeftRadius:"12px", borderTopRightRadius:"5px",borderBottomLeftRadius:"5px",borderBottomRightRadius:"12px",border:"none",cursor:"pointer"}} onClick={()=>SetOpen(!open)}>+ új óra</button>

        <button style={{backgroundColor:"#ef233c",color:"white",border:"none",cursor:"pointer",margin:"3vw",marginBottom:"2vh",marginTop:"-3vh",padding:"1rem",borderRadius:"12px",fontSize:"1.5em",fontFamily:"'Poppins', sans-serif"}} onClick={torlesOsszesOra}>Törlés</button>
      </div>
        <div style={{position:"relative",width:"80vw",height:"80vh",display:"inline-block"}}>
            
            {open===true?
        <div>
        <div style={{position:"absolute",top:"0px",width:"100%",height:"80vh"}} className="blur_div"><Órarend width={80} height={80}/> </div>
      
        <div style={{position:"absolute",top:"0px",width:"100%",height:"86.6vh",opacity:"0.5",background:"black"}} className="blur_div"> </div>
        <Adatbekérés/>
    </div>
    
    :<Órarend width={80} height={80}/>}
        
      
    </div>
    
</div>

  )
}

export default Content
