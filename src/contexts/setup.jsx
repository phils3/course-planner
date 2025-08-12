import { createContext, useState, useEffect } from "react";
import Adatok from "../components/adatok";

export const Beallitasok=createContext()


function Setup(){
    const [színek,SetSzin]=useState(["#2CEC56","#ABCAB2","#3CF2C8","#6C893D","#7863D6","#48B9FF","#F87400","#F8B600","#F9FF48","#FF9169","#EF7C8E","#B6E2D3","#BCA88E","#F4B9B8","#2979E1","#8FC363","#ED5050","#FC68E8"])
    const [hasznalt_színek_background,SetBackground]=useState([])
    const [randomSzín,SetRandomSzín]=useState(null)
    const [órák_száma,SetÓrák_száma]=useState(12)
    const [mobilOraSzam,SetMobilOraSzam]=useState(10)
    const[legeneralt_orak,SetLegeneralt_Orak]=useState(0)
    
    // Órarend méretek
    const [orarendWidth,SetOrarendWidth]=useState(80)
    
    useEffect(() => {
        const updateWidth = () => {
            const cssWidth = getComputedStyle(document.documentElement).getPropertyValue('--orarend-width');
            SetOrarendWidth(parseInt(cssWidth) || 80);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const [orarendHeight,SetOrarendHeight]=useState(80)
    
    useEffect(() => {
        const updateHeight = () => {
            if (window.innerWidth <= 900) {
                SetOrarendHeight(70);
            } else {
                SetOrarendHeight(80);
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);
    const oszlopSzelesseg = orarendWidth / 6 // 6 oszlop (órák + 5 nap)
    const fejlecWidth = orarendWidth
    const gombSzelesseg = "clamp(15vw, 25vw, 35vw)" // Új óra és törlés gombok szélessége
    const gombMagassag = "clamp(2vh, 3vh, 10vh)" // Új óra és törlés gombok magassága
    //const fontfamily=
    return(
        <Beallitasok.Provider value={{színek,hasznalt_színek_background,SetBackground,randomSzín,SetRandomSzín,legeneralt_orak,SetLegeneralt_Orak,orarendWidth,orarendHeight,oszlopSzelesseg,fejlecWidth,gombSzelesseg,gombMagassag,mobilOraSzam}}>
            <Adatok/>
        </Beallitasok.Provider>
    )
}
export default Setup