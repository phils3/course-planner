import { useContext, useState, useEffect } from "react";
import "../index.css"
import "../hideNumberInputArrows.css"
import {Tárgyak_listaja} from "./adatok";

function szamtostring(szam){
    return szam.toString().length
}

function Adatbekérés({onClose}) {
    
    const [targynev,SetTargynev]=useState("")
    const [nap,SetNap]=useState("hétfő")
    const [kezdes1,SetKezdes1]=useState(null)
    const [kezdes2,SetKezdes2]=useState(null)
    const [vége1,Setvége1]=useState(null)
    const [vége2,SetVége2]=useState(null)
    const [on,SetOn]=useState(true) //auto szín kiválasztása gomb, alapból true
    const [gombnyomas,SetGombnyomas]=useState(false)
    const [kredit,SetKredit]=useState(null)
    //context rész importálása az adatok fájlból
    const {hetfo}=useContext(Tárgyak_listaja)
    const {SetHetfo}=useContext(Tárgyak_listaja)
    const {kedd}=useContext(Tárgyak_listaja)
    const {SetKedd}=useContext(Tárgyak_listaja)
    const {szerda}=useContext(Tárgyak_listaja)
    const {SetSzerda}=useContext(Tárgyak_listaja)
    const {csutortok}=useContext(Tárgyak_listaja)
    const {SetCsutortok}=useContext(Tárgyak_listaja)
    const {pentek}=useContext(Tárgyak_listaja)
    const {SetPentek}=useContext(Tárgyak_listaja)
    const {id}=useContext(Tárgyak_listaja)
    const {SetId}=useContext(Tárgyak_listaja)
    
    const {szín}=useContext(Tárgyak_listaja)
    const{SetSzín}=useContext(Tárgyak_listaja)
    //kiválasztható színek listája
    let színek=["#FE7C7C","#76F0DA","#E5BD81","#3CC4FF","#3BB900","#F470E7","#6D7ED3","#A325D4","#FBC740","#199A96","#FDD1D2"]

    // Automatikus szín választás, ha az auto szín választás be van kapcsolva
    useEffect(() => {
        if (on) {
            const randomIndex = Math.floor(Math.random() * színek.length);
            SetSzín(színek[randomIndex]);
        }
    }, [on, gombnyomas]);
    
    // Enter gomb kezelése
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [targynev, kezdes1, kezdes2, vége1, vége2, kredit, nap, szín, hetfo, kedd, szerda, csutortok, pentek, id]);
    
      // Szín kiválasztásának kezelése
    const handleColorChange = (color) => {
        if (!on) {
            SetSzín(color);
        }
        //console.log("kiválasztott szín: ",szín)
    };
    
    const handleSubmit = () => {
        if(targynev!==""&& kezdes1!=="" && kezdes1!==null && kezdes2!=="" && kezdes2!==null && vége1!=="" && vége1!==null && vége2!=="" && vége2!==null){
            const kreditValue = kredit && kredit !== "" ? parseInt(kredit) : 0;
            const newSubject = {
                id:id,
                targynev:targynev,
                nap:nap,
                ora_kezdes_oraban:parseInt(kezdes1),
                ora_kezdes_percben:parseInt(kezdes2),
                ora_vege_oraban:parseInt(vége1),
                ora_vege_percben:parseInt(vége2),
                auto_szin_valasztas_IsOn:true,
                szin: szín,
                kredit: kreditValue
            };
            
            if(nap==="hétfő") SetHetfo([...hetfo, newSubject]);
            if(nap==="kedd") SetKedd([...kedd, newSubject]);
            if(nap==="szerda") SetSzerda([...szerda, newSubject]);
            if(nap==="csütörtök") SetCsutortok([...csutortok, newSubject]);
            if(nap==="péntek") SetPentek([...pentek, newSubject]);
            
            SetId(id+1);
            SetTargynev("");
            SetKezdes1(null);
            SetNap("hétfő");
            SetKezdes2(null);
            Setvége1(null);
            SetVége2(null);
            SetKredit(null);
            SetGombnyomas(!gombnyomas);
            onClose();
        } else {
            const inputs = document.querySelectorAll('.targynev-input, .ora-input, .perc-input');
            inputs.forEach(input => {
                if (input.value === '' || input.value === null) {
                    input.classList.add('validation-error');
                    setTimeout(() => {
                        input.classList.remove('validation-error');
                    }, 3000);
                }
            });
        }
    };
    let targy={
        id:0,
        targynev:"",
        nap:"",
        ora_kezdes_oraban:8,
        ora_kezdes_percben:30,
        ora_vege_oraban:10,
        ora_vege_percben:0,
        auto_szin_valasztas_IsOn:true
    }    
      
    
    return ( 
        <>
        <div style={{position:"fixed",top:window.innerWidth <= 900 ? "auto" : "50%",left:"50%",bottom:window.innerWidth <= 900 ? "3vh" : "auto",transform:window.innerWidth <= 900 ? "translateX(-50%)" : "translate(-50%, -50%)",width:window.innerWidth <= 450 ? "calc(95vw + 4px)" : window.innerWidth <= 900 ? "calc(60vw + 4px)" : "calc(35vw + 4px)",height:window.innerWidth <= 900 ? "calc(70vh + 4px)" : "calc(49vh + 4px)",borderRadius:"11px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#585858", zIndex:3}}>
        <div className="forgoDiv" style={{position:"absolute",width:"80vw",height:"20vh",background:"linear-gradient(to bottom,#00DF82,#585858 )",top:"15vh",left:"-22vw",transform:"translate(-50%, -50%)",animation:"spin 5s linear infinite",transformOrigin:"50% 50%",zIndex:1}}></div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{height:window.innerWidth <= 900 ? "70vh" : "49vh",width:window.innerWidth <= 450 ? "95vw" : window.innerWidth <= 900 ? "60vw" : "35vw",display:"block",borderRadius:"8px", color:"black",fontWeight:"bolder",background:"#1F1F1F",position:"relative",zIndex:2,margin:"1px"}} >
            <button style={{position:"absolute",top:"10px",right:"10px",background:"#ff4444",color:window.innerWidth <= 900 ? "#555555" : "white",border:"none",borderRadius:"50%",width:"30px",height:"30px",cursor:"pointer",fontSize:window.innerWidth <= 900 ? "20px" : "16px",fontWeight:window.innerWidth <= 900 ? "bolder" : "bold",display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>×</button>
            <p style={{textAlign:"center",fontSize:"28px",color:"white",fontFamily:"monospace"}}>Adatbekérés</p>
            <div className="adatbekeres" style={{marginLeft:"12px"}}>
                <p style={{fontFamily:"monospace",fontSize:"20px" ,color:"white"}}>tárgynév*</p>
                <input 
                value={targynev===null?"":targynev}
                onChange={(e)=>SetTargynev(e.target.value)}
                placeholder="programozás"
                style={{border:`${targynev===""&&gombnyomas?"1px solid red":"1px solid #928787"}`,fontSize:"20px",padding:"4px",borderRadius:"3px",background:"#242424",color:"#2CC295",fontFamily:"sans-serif"}}
                className={`targynev-input ${targynev===""&&gombnyomas?"hiányzó_adat":""}`}
                ></input>
                <p style={{fontFamily:"monospace",fontSize:"20px",color:"white"}}>nap*</p>
                <select 
                style={{fontSize:"20px",borderRadius:"3px",padding:"4px",background:"#242424",color:"#2CC295",cursor:"pointer",border:"1px solid #928787"}}
                value={nap}
                onChange={(e)=>SetNap(e.target.value)}>
                    <option >hétfő</option>
                    <option>kedd</option>
                    <option>szerda</option>
                    <option>csütörtök</option>
                    <option>péntek</option>
                </select>
                <div style={{display:"flex"}}>
                    <div style={{marginRight:"40px"}}>
                        <p style={{fontFamily:"monospace",fontSize:"20px",color:"white"}}>kezdés*</p>
                        <span style={{fontSize:"20px",fontWeight:"bolder",background:"#242424",height:"33px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"3px",color:"white"}}>
                            <input 
                            value={kezdes1===null?"":kezdes1}
                            onChange={(e)=>{
                                const val = parseInt(e.target.value)
                                if(e.target.value === "" || (e.target.value.length <= 2 && (val >= 8 && val <= 19 || e.target.value === "1"))) {
                                    SetKezdes1(e.target.value)
                                }
                            }}
                            type="number"
                            min={8}
                            max={19}
                            maxLength={2}
                            placeholder="8"
                            style={{fontSize:"20px",padding:"4px 0px 4px 10px",border:`${targynev===""&&gombnyomas?"1px solid red":"1px solid #928787"}` ,borderRadius:"3px",background:"#242424",color:"#2CC295",fontFamily:"sans-serif"}} className={`ora-input ${targynev===""&&gombnyomas?"hiányzó_adat":""}`}>
                            
                            </input>
                            :
                            <input  
                                value={kezdes2===null?"":kezdes2}
                                onChange={(e)=>{
                                    const val = parseInt(e.target.value)
                                    if(e.target.value === "" || (e.target.value.length <= 2 && val >= 0 && val <= 59)) {
                                        SetKezdes2(e.target.value)
                                    }
                                }}
                                type="number"
                                min={0}
                                max={59}
                                maxLength={2}
                                placeholder="00"
                                style={{fontSize:"20px",padding:"4px 0px 4px 10px",background:"#242424",border:`${targynev===""&&gombnyomas?"1px solid red":"1px solid #928787"}` ,borderRadius:"3px",color:"#2CC295",fontFamily:"sans-serif"}} className={`perc-input ${targynev===""&&gombnyomas?"hiányzó_adat":""}`}>

                            </input>
                        </span>
                    </div>
                    <div>
                        <p style={{fontFamily:"monospace",fontSize:"20px",color:"white"}}>vége*</p>
                        <span style={{fontSize:"20px",fontWeight:"bolder",background:"#242424",height:"33px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"3px",color:"white"}}>
                            <input 
                            value={vége1===null?"":vége1}
                            onChange={(e)=>{
                                const val = parseInt(e.target.value)
                                if(e.target.value === "" || (e.target.value.length <= 2 && (val >= 8 && val <= 19 || e.target.value === "1"))) {
                                    Setvége1(e.target.value)
                                }
                            }}
                            type="number"
                            min={8}
                            max={19}
                            maxLength={2}
                            placeholder="10"
                            style={{fontSize:"20px",padding:"4px 0px 4px 10px",background:"#242424",border:`${targynev===""&&gombnyomas?"1px solid red":"1px solid #928787"}` ,borderRadius:"3px",color:"#2CC295",fontFamily:"sans-serif"}} className={`ora-input ${targynev===""&&gombnyomas?"hiányzó_adat":""}`}>

                            </input>
                            :
                            <input  
                                value={vége2===null?"":vége2}
                                onChange={(e)=>{
                                    const val = parseInt(e.target.value)
                                    if(e.target.value === "" || (e.target.value.length <= 2 && val >= 0 && val <= 59)) {
                                        SetVége2(e.target.value)
                                    }
                                }}
                                type="number"
                                min={0}
                                max={59}
                                maxLength={2}
                                placeholder="00"
                                style={{fontSize:"20px",padding:"4px 0px 4px 10px",background:"#242424",border:`${targynev===""&&gombnyomas?"1px solid red":"1px solid #928787"}` ,borderRadius:"3px",color:"#2CC295",fontFamily:"sans-serif"}} className={`perc-input ${targynev===""&&gombnyomas?"hiányzó_adat":""}`}>

                            </input>
                        </span>
                        
                    </div>
                    
                </div>
                
                <p style={{fontFamily:"monospace",fontSize:"20px",color:"white"}}>kredit szám</p>
                <input 
                value={kredit===null?"":kredit}
                onChange={(e)=>SetKredit(e.target.value)}
                type="number"
                min={1}
                placeholder="3"
                style={{border:`${kredit===""&&gombnyomas?"1px solid red":"1px solid #928787"}`,fontSize:"20px",padding:"4px",borderRadius:"3px",background:"#242424",color:"#2CC295",fontFamily:"sans-serif",marginBottom:"15px"}}
                className={`kredit-input ${kredit===""&&gombnyomas?"hiányzó_adat":""}`}
                ></input>
                <div style={{display:"flex",alignItems:"center",cursor:"pointer",marginBottom:"15px"}} onClick={()=>SetOn(!on)}>
                    <p style={{fontFamily:"monospace",fontSize:"20px",color:"white"}}>auto szín választás</p>
                    <div style={{width:"65px",height:"28px",background:"#565A57",marginLeft:"25px",borderRadius:"40px",display:"flex",alignItems:"center",boxShadow:"inset 2px 2px 0px 0px #3A3A3A"}}>
                        <div style={{background:`${on?"#29E452":"#F9564C"}`,height:"24px",width:"24px",borderRadius:"50%",marginLeft:`${on?"41px":"0px"}`,transition:"ease-in-out .2s"}}></div>
                    </div>
                </div>
                <p style={{fontFamily:"monospace",fontSize:"20px",color:on ?"#A9A4A4": "white"}}>szín</p>
                <div style={{display:"flex",position:"relative",width:"24rem"}}>
                    {színek.map((szin,index)=>(
                        <div  key={index}
                        onClick={() => 
                            handleColorChange(szin) // Szín kiválasztása
                            
                        }
                        className="color-bounce"
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor:on?"#777171": színek[index],
                          borderRadius: '50%',
                          border: (!on && színek[index] === szín) ? '3px solid #00DF82' : 'none',
                          transform: (!on && színek[index] === szín) ? 'scale(1.5)' : 'scale(1)',
                          cursor: 'pointer',
                          marginLeft:"10px",
                          pointerEvents: on ? 'none' : 'auto',
                          transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), border 0.2s ease'
                        }}
                      ></div>
                        ))
                    }
                    
                  

                   
                
                    
                </div>
               <button className="kész_gomb" style={{padding:"15px",fontSize:"20px",margin:"35px auto auto auto",border:"none",cursor:"pointer",borderRadius:"4px",display:"block",background:"#17876E",color:"white",fontFamily:"sans-serif",fontWeight:"bold",boxShadow: "inset 0 1px 5px rgba(255, 255, 255, 0.6), inset 1px -2px 6px rgba(0, 0, 0, 0.6)"}} onClick={handleSubmit}>Kész</button>
               
              
            </div>
            
        </div>
        </div>
        </>
     );
}

export default Adatbekérés;