import { useContext, useState, useEffect } from "react";
import "../index.css"
import {Tárgyak_listaja} from "./adatok";

function szamtostring(szam){
    return szam.toString().length
}

function Adatbekérés() {
    
    const [targynev,SetTargynev]=useState("")
    const [nap,SetNap]=useState("hétfő")
    const [kezdes1,SetKezdes1]=useState(null)
    const [kezdes2,SetKezdes2]=useState(null)
    const [vége1,Setvége1]=useState(null)
    const [vége2,SetVége2]=useState(null)
    const [on,SetOn]=useState(true) //auto szín kiválasztása gomb, alapból true
    const [gombnyomas,SetGombnyomas]=useState(false)
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
      // Szín kiválasztásának kezelése
    const handleColorChange = (color) => {
        if (!on) {
            SetSzín(color);
        }
        //console.log("kiválasztott szín: ",szín)
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
      
    const gradientBackground = "linear-gradient(45deg, #363636  20%,  #17876E 100%)";    
    return ( 
        <>
        
        <div style={{height:"59vh",width:"35vw",position:"absolute",top:"20vh",left:"23vw",display:"block",borderRadius:"8px", color:"black",fontWeight:"bolder",background:gradientBackground, boxShadow: "inset 0 4px 5px rgba(255, 255, 255, 0.6), inset 5px -6px 6px rgba(0, 0, 0, 0.5)"}} >
            <p style={{textAlign:"center",fontSize:"28px",color:"white",fontFamily:"monospace"}}>Adatbekérés</p>
            <div style={{marginLeft:"12px"}}>
                <p style={{fontFamily:"monospace",fontSize:"20px" ,color:"white"}}>tárgynév</p>
                <input 
                value={targynev===null?"":targynev}
                onChange={(e)=>SetTargynev(e.target.value)}
                placeholder="programozás"
                style={{border:`${targynev===""&&gombnyomas?"1px solid red":"none"}`,fontSize:"20px",padding:"4px",borderRadius:"3px",background:"#242424",color:"#2CC295",fontFamily:"sans-serif"}}
                className={`${targynev===""&&gombnyomas?"hiányzó_adat":""}`}
                ></input>
                <p style={{fontFamily:"monospace",fontSize:"20px",color:"white"}}>nap</p>
                <select 
                style={{fontSize:"20px",border:"none",borderRadius:"3px",padding:"4px",background:"#242424",color:"#2CC295",cursor:"pointer"}}
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
                        <p style={{fontFamily:"monospace",fontSize:"20px",color:"white"}}>kezdés</p>
                        <span style={{fontSize:"20px",fontWeight:"bolder",background:"#242424",height:"33px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"3px"}}>
                            <input 
                            value={kezdes1===null?"":kezdes1}
                            onChange={(e)=>SetKezdes1(e.target.value)}
                            type="number"
                            min={8}
                            max={20}
                            placeholder="8"
                            style={{width:"40px",fontSize:"20px",padding:"4px 0px 4px 10px",border:`${targynev===""&&gombnyomas?"1px solid red":"none"}` ,borderRadius:"3px",background:"#242424",color:"#2CC295",fontFamily:"sans-serif"}} className={`${targynev===""&&gombnyomas?"hiányzó_adat":""}`}>
                            
                            </input>
                            :
                            <input  
                                value={kezdes2===null?"":kezdes2}
                                onChange={(e)=>SetKezdes2(e.target.value)}
                                type="number"
                                min={8}
                                max={20}
                                placeholder="00"
                                style={{width:"40px",fontSize:"20px",padding:"4px 0px 4px 10px",background:"#242424",border:`${targynev===""&&gombnyomas?"1px solid red":"none"}` ,borderRadius:"3px",color:"#2CC295",fontFamily:"sans-serif"}} className={`${targynev===""&&gombnyomas?"hiányzó_adat":""}`}>

                            </input>
                        </span>
                    </div>
                    <div>
                        <p style={{fontFamily:"monospace",fontSize:"20px",color:"white"}}>vége</p>
                        <span style={{fontSize:"20px",fontWeight:"bolder",background:"#242424",height:"33px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"3px"}}>
                            <input 
                            value={vége1===null?"":vége1}
                            onChange={(e)=>Setvége1(e.target.value)}
                            type="number"
                            min={8}
                            max={20}
                            placeholder="10"
                            style={{width:"40px",fontSize:"20px",padding:"4px 0px 4px 10px",background:"#242424",border:`${targynev===""&&gombnyomas?"1px solid red":"none"}` ,borderRadius:"3px",color:"#2CC295",fontFamily:"sans-serif"}} className={`${targynev===""&&gombnyomas?"hiányzó_adat":""}`}>

                            </input>
                            :
                            <input  
                                value={vége2===null?"":vége2}
                                onChange={(e)=>SetVége2(e.target.value)}
                                type="number"
                                min={8}
                                max={20}
                                placeholder="00"
                                style={{width:"40px",fontSize:"20px",padding:"4px 0px 4px 10px",background:"#242424",border:`${targynev===""&&gombnyomas?"1px solid red":"none"}` ,borderRadius:"3px",color:"#2CC295",fontFamily:"sans-serif"}} className={`${targynev===""&&gombnyomas?"hiányzó_adat":""}`}>

                            </input>
                        </span>
                        
                    </div>
                    
                </div>
                
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
                       
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor:on?"#777171": színek[index],
                          borderRadius: '50%',
                          border: színek[index] === szín ? '3px solid #000' : 'none',  // Ha ki van választva, keret
                          cursor: 'pointer',
                          marginLeft:"10px",
                          pointerEvents: on ? 'none' : 'auto' 
                        }}
                      ></div>
                        ))
                    }
                    
                    {/* <span style={{borderRadius:"50%",width:"20px",height:"20px",background:"#FE7C7C",cursor:"pointer"}}></span>
                    <span style={{borderRadius:"50%",width:"20px",height:"20px",background:"#76F0DA",cursor:"pointer",marginLeft:"8px"}}></span>
                    <span style={{borderRadius:"50%",width:"20px",height:"20px",background:"#E5BD81",cursor:"pointer",marginLeft:"8px"}}></span>
                    <span style={{borderRadius:"50%",width:"20px",height:"20px",background:"#3CC4FF",cursor:"pointer",marginLeft:"8px"}}></span>
                    <span style={{borderRadius:"50%",width:"20px",height:"20px",background:"#3BB900",cursor:"pointer",marginLeft:"8px"}}></span>
                    <span style={{borderRadius:"50%",width:"20px",height:"20px",background:"#F470E7",cursor:"pointer",marginLeft:"8px"}}></span> */}

                   
                
                    
                </div>
               <button style={{padding:"15px",fontSize:"20px",margin:"35px auto auto auto",border:"none",cursor:"pointer",borderRadius:"4px",display:"block",background:"#17876E",color:"white",fontFamily:"sans-serif",fontWeight:"bold",boxShadow: "inset 0 1px 5px rgba(255, 255, 255, 0.6), inset 1px -2px 6px rgba(0, 0, 0, 0.6)"}} onClick={()=>
               {
                
                
                //megvizsgálás nem e üresek az adatmezők
               /*  SetHetfo([...hetfo,
                    {
                        id:id,
                        targynev:targynev,
                        nap:nap,
                        ora_kezdes_oraban:kezdes1,
                        ora_kezdes_percben:kezdes2,
                        ora_vege_oraban:vége1,
                        ora_vege_percben:vége2,
                        auto_szin_valasztas_IsOn:true
                        }    
                ])
                SetId(id+1) */
                //targynev!==""&& szamtostring(kezdes1)===0 && szamtostring(kezdes2)===0 && szamtostring(vége1)===0 && szamtostring(vége2)===0
                if(targynev!==""&& kezdes1!==null && kezdes2!==null && vége1!==null && vége2!==null){
                    if(nap==="hétfő"){
                        SetHetfo([...hetfo,
                            {
                                id:id,
                                targynev:targynev,
                                nap:nap,
                                ora_kezdes_oraban:kezdes1,
                                ora_kezdes_percben:kezdes2,
                                ora_vege_oraban:vége1,
                                ora_vege_percben:vége2,
                                auto_szin_valasztas_IsOn:true,
                                szin: szín
                                }    
                        ])
                        SetId(id+1)
                    }
                    if(nap==="kedd"){
                        SetKedd([...kedd,
                            {
                                id:id,
                                targynev:targynev,
                                nap:nap,
                                ora_kezdes_oraban:kezdes1,
                                ora_kezdes_percben:kezdes2,
                                ora_vege_oraban:vége1,
                                ora_vege_percben:vége2,
                                auto_szin_valasztas_IsOn:true,
                                szin: szín
                        }])
                        SetId(id+1)
                    }
                    if(nap==="szerda"){
                        SetSzerda([...szerda,
                            {
                                id:id,
                                targynev:targynev,
                                nap:nap,
                                ora_kezdes_oraban:kezdes1,
                                ora_kezdes_percben:kezdes2,
                                ora_vege_oraban:vége1,
                                ora_vege_percben:vége2,
                                auto_szin_valasztas_IsOn:true,
                                szin: szín
                        }])
                        SetId(id+1)
                    }
                    if(nap==="csütörtök"){
                        SetCsutortok([...csutortok,
                            {
                                id:id,
                                targynev:targynev,
                                nap:nap,
                                ora_kezdes_oraban:kezdes1,
                                ora_kezdes_percben:kezdes2,
                                ora_vege_oraban:vége1,
                                ora_vege_percben:vége2,
                                auto_szin_valasztas_IsOn:true,
                                szin: szín
                        }])
                        SetId(id+1)
                    }
                    if(nap==="péntek"){
                        SetPentek([...pentek,
                            {
                                id:id,
                                targynev:targynev,
                                nap:nap,
                                ora_kezdes_oraban:kezdes1,
                                ora_kezdes_percben:kezdes2,
                                ora_vege_oraban:vége1,
                                ora_vege_percben:vége2,
                                auto_szin_valasztas_IsOn:true,
                                szin: szín
                        }])
                        SetId(id+1)
                    }

                } 
                
                
                console.log("hetfo: ",hetfo)
                console.log("kedd: ",kedd)
                console.log("szerda: ",szerda)
                console.log("csutortok: ",csutortok)
                console.log("pentek: ",pentek)

                SetTargynev("")
                SetKezdes1(null)
                SetNap("hétfő")
                SetKezdes2(null)
                Setvége1(null)
                SetVége2(null)
                SetGombnyomas(!gombnyomas)
                }}>Kész</button>
               
              
            </div>
            
        </div>
        </>
     );
}

export default Adatbekérés;