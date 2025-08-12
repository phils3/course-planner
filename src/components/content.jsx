import React, { useContext,useEffect } from 'react'
import { useState } from "react"
import Órarend from "./órarend"
//import "../index.css"
import Adatbekérés from "./adatbekérés"
import Adatok from "./adatok" 
import { Tárgyak_listaja } from "./adatok";
import DotGrid from './Dotgrid';
import { Beallitasok } from '../contexts/setup';

function Content() {
    const [open,SetOpen]=useState(false)
    const [showHelp,setShowHelp]=useState(false)
    const [progress,setProgress]=useState(100)
    const [deletedSubject,setDeletedSubject]=useState(null)
    const [deleteProgress,setDeleteProgress]=useState(100)
    const { torlesOsszesOra, hetfo, kedd, szerda, csutortok, pentek } = useContext(Tárgyak_listaja);
    const { orarendWidth, orarendHeight, gombSzelesseg, gombMagassag } = useContext(Beallitasok);
    
    const osszesKredit = [...hetfo, ...kedd, ...szerda, ...csutortok, ...pentek].reduce((sum, targy) => sum + (targy.kredit || 0), 0);
    
    const handleHelpHover = () => {
        setShowHelp(true)
        setProgress(100)
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev <= 0) {
                    clearInterval(interval)
                    setShowHelp(false)
                    return 0
                }
                return prev - 2
            })
        }, 100)
    }
    
    const handleSubjectDelete = (subjectName) => {
        setDeletedSubject(subjectName)
        setDeleteProgress(100)
        const interval = setInterval(() => {
            setDeleteProgress(prev => {
                if (prev <= 0) {
                    clearInterval(interval)
                    setDeletedSubject(null)
                    return 0
                }
                return prev - 1.67 // 100/60 frames = 1.67 per frame for 3 seconds
            })
        }, 50) // 50ms intervals for smoother animation
    }
    
  return (
    <div style={{position:"relative",width:"100vw",height:"100vh",overflow:"hidden",background:"#1F1F1F"}}>
    <DotGrid
      dotSize={window.innerWidth <= 450 ? 3 : 8}
      gap={window.innerWidth <= 450 ? 10 : 25}
      baseColor="#515252ff"
      activeColor="#27b0ffff"
      proximity={120}
      shockRadius={250}
      shockStrength={5}
      resistance={750}
      returnDuration={1.5}
      blur={open}
    />
    <div className="orarend-container" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",padding:"0",margin:"0",flexDirection:"column", boxSizing:"border-box",width:"100vw",position:"relative",zIndex:2}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"-4vh",position:"relative",zIndex:3}}>
          <button style={{marginBottom:"2vh",marginTop:"-3vh",padding:"1rem",fontSize:"clamp(1rem, 2vw, 1.7em)",borderRadius:"15px",cursor:"pointer",background:"#46464615",backdropFilter:"blur(6px)",borderTop:"1px solid #A8A3A3",borderBottom:"1px solid #A8A3A3",borderRight:"none",borderLeft:"none",color:"#48F56D",boxShadow:"inset 0 -6px 4px rgba(123, 123, 123, 0.25), inset 0 9px 18px rgba(193, 193, 193, 0.25)",transition:"transform 0.1s ease",width:gombSzelesseg,height:gombMagassag,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"}} onMouseDown={(e)=>e.target.style.transform="translateY(2px)"} onMouseUp={(e)=>e.target.style.transform="translateY(0)"} onMouseLeave={(e)=>e.target.style.transform="translateY(0)"} onClick={()=>SetOpen(!open)}>+ új óra</button>

          <button style={{backgroundColor:"#D0262665",backdropFilter:"blur(6px)",color:"white",borderLeft:"none",borderRight:"none",borderTop:"1px solid #FF0000",borderBottom:"1px solid #FF0000",cursor:"pointer",marginLeft:"2vw",marginBottom:"2vh",marginTop:"-3vh",padding:"1rem",borderRadius:"12px",fontSize:"clamp(1rem, 2vw, 1.7em)",fontFamily:"'Poppins', sans-serif",transition:"transform 0.1s ease",boxShadow:"inset 0 -6px 4px rgba(123, 123, 123, 0.25), inset 0 9px 18px rgba(193, 193, 193, 0.25)",width:gombSzelesseg,height:gombMagassag,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"}} onMouseDown={(e)=>e.target.style.transform="translateY(2px)"} onMouseUp={(e)=>e.target.style.transform="translateY(0)"} onMouseLeave={(e)=>e.target.style.transform="translateY(0)"} onClick={torlesOsszesOra}>Törlés</button>
          <button style={{borderRadius:"50%",width:"30px",height:"30px",background:"#46464680",color:"white",borderTop:"1px solid #A8A3A3",borderBottom:"1px solid #A8A3A3",borderRight:"none",borderLeft:"none",cursor:"pointer",marginBottom:"5vh",marginLeft:"20px",boxShadow:"inset 0 -6px 4px rgba(123, 123, 123, 0.25), inset 0 9px 18px rgba(193, 193, 193, 0.25)"}} onClick={handleHelpHover}>?</button>
          <span style={{display:showHelp?"block":"none",marginLeft:"15px",fontSize:"20px",marginBottom:"5vh",color:"white",background:"#2C2C2C",padding:"20px",borderRadius:"10px",position:"relative",fontFamily:"'Poppins', sans-serif",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)",transition:"opacity 0.3s ease-in-out"}}>
              ezzel a gombal lehet törölni az órákat
              <div style={{position:"absolute",bottom:"0",left:"0",height:"3px",width:`${progress}%`,background:"#48F56D",transition:"width 0.1s linear",borderRadius:"0 0 10px 10px"}}></div>
          </span>
        </div>
        <div style={{display:deletedSubject?"flex":"none",width:"100%",marginTop:"-30px",marginBottom:"30px",justifyContent:"center",alignItems:"center",position:"relative",zIndex:3}}>
          <span style={{color:"white",background:"#2C2C2C",padding:"15px 20px",borderRadius:"10px",position:"relative",fontFamily:"'Poppins', sans-serif",fontSize:"18px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)"}}
          >A <span style={{color:"#00DF82",margin:"0px 10px 0px 10px",fontSize:"25px",fontWeight:"bolder"}}>{deletedSubject}</span> tárgy törlésre került
          <div style={{position:"absolute",bottom:"0",left:"0",height:"3px",width:`${deleteProgress}%`,background:"#FF5252",transition:"width 0.05s linear",borderRadius:"0 0 10px 10px"}}></div>
          </span>
        </div>
        <div className="kredit-display" style={{marginTop:"-20px",marginBottom:"20px",position:"relative",zIndex:3}}>
          <p style={{fontFamily:"monospace",fontSize:"20px",color:"white",margin:0}}>Kredit szám: <span style={{background:"linear-gradient(135deg, #00ff00, #0066ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",fontWeight:"bold",fontSize:"28px"}}>{osszesKredit}</span></p>
        </div>
          <div style={{position:"relative",width:`${orarendWidth}vw`,height:`${orarendHeight}vh`,display:"flex",justifyContent:"center",alignItems:"center"}}>
               <div className={open ? "blur_div" : ""}> 
                  <Órarend width={orarendWidth} height={orarendHeight} onSubjectDelete={handleSubjectDelete}/>
               </div> 
              {open && <Adatbekérés onClose={()=>SetOpen(false)}/>}
          
        
        </div>

    </div>
  </div>
  )
}

export default Content
