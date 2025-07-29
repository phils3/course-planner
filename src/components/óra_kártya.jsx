import { Beallitasok } from "../contexts/setup"
import { useContext,useEffect, useState } from "react";
function Óra_kártya({background_color,óra_név,kezdo_ora,kezdo_perc,vege_ora,vege_perc, width, left, marginLeft, marginRight}) {
    
    //1 óra div magassága= 80/órákszáma vh, 80/12=6.66vh = 95.933px ha az ablakom 1439px magas
    //60 perc magassága 95.933px
    //1perc 1.6 px
    //60 perc 6.66vh
    //1perc=0.111vh
    //let px=1.6 1perc hány px
    let vh=0.111 //1 perc
    let magassag=((parseInt(vege_ora)*60+parseInt(vege_perc))-(parseInt(kezdo_ora)*60+parseInt(kezdo_perc)))*vh
    //console.log("magassag: ",(vege_ora*60+vege_perc)-(kezdo_ora*60+kezdo_perc))
    
   
    let marginTop= (parseInt(kezdo_ora)*60+parseInt(kezdo_perc)-(8*60+0))*vh//-67.4
    //console.log("margintop1: ",marginTop)
    
    
    // useEffect(() => {
    //     let randomszin = getRandomUnusedColor(színek, hasznalt_színek_background);
    //     console.log("randomszin: ", randomszin);
        
    //     // Frissítjük a randomSzín-t, ha még nem szerepel a listában
    //     if (!hasznalt_színek_background.includes(randomszin)) {
    //         SetRandomSzín(randomszin);
    //         SetBackground((prevSzínek) => [...prevSzínek, randomszin]); // Új szín hozzáadása
    //         hasznalt_színek_background.push(randomszin); // Hozzáadjuk a használt színek listájához
    //         console.log("random szin: ", randomszin);
    //         console.log("használt színek: ", hasznalt_színek_background);
    //     }
    // }, []); // Csak egyszer fut le, amikor a komponens először renderelődik

        return ( 
            <div style={{
                left: left !== undefined ? left : "50%",
                transform: left !== undefined ? undefined : "translateX(-50%)",
                borderRadius:"5px",
                background:`${background_color}`,
                top:`${marginTop}vh`,
                height:`${magassag}vh`,
                position:"absolute",
                width: width !== undefined ? width : `${80/6-1}vw`,
                padding:"0px",
                boxSizing: "border-box",
                marginLeft: marginLeft !== undefined ? marginLeft : undefined,
                marginRight: marginRight !== undefined ? marginRight : undefined,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                overflow: "hidden"
            }}>
                <p style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    margin: 0,
                    wordBreak: "break-word"
                }}>{óra_név}</p>
                <p style={{
                    fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
                    fontFamily: "sans-serif",
                    margin: 0,
                    wordBreak: "break-word"
                }}>{`${kezdo_ora}:${kezdo_perc}-${vege_ora}:${vege_perc}`}</p>
            </div>
            
         );
    
    
}

export default Óra_kártya;