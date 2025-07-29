import { createContext, useState } from "react";
import Adatok from "../components/adatok";

export const Beallitasok=createContext()


function Setup(){
    const [színek,SetSzin]=useState(["#2CEC56","#ABCAB2","#3CF2C8","#6C893D","#7863D6","#48B9FF","#F87400","#F8B600","#F9FF48","#FF9169","#EF7C8E","#B6E2D3","#BCA88E","#F4B9B8","#2979E1","#8FC363","#ED5050","#FC68E8"])
    const [hasznalt_színek_background,SetBackground]=useState([])
    const [randomSzín,SetRandomSzín]=useState(null)
    const [órák_száma,SetÓrák_száma]=useState(12)
    const[legeneralt_orak,SetLegeneralt_Orak]=useState(0)
    //const fontfamily=
    return(
        <Beallitasok.Provider value={{színek,hasznalt_színek_background,SetBackground,randomSzín,SetRandomSzín,legeneralt_orak,SetLegeneralt_Orak}}>
            <Adatok/>
        </Beallitasok.Provider>
    )
}
export default Setup