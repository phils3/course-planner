import { Children } from "react";
import Órarend_body from "./órarend_body"
import { createContext, useState,useContext, useEffect } from "react";
import Content from "./content";
import { Beallitasok } from "../contexts/setup"
export const Tárgyak_listaja=createContext()

function Adatok(){
    // State-ek inicializálása közvetlenül a localStorage-ből
    const saved = JSON.parse(localStorage.getItem("orarend")) || {};
    const [hetfo,SetHetfo]=useState(saved.hetfo || [])
    const [kedd,SetKedd]=useState(saved.kedd || [])
    const [szerda,SetSzerda]=useState(saved.szerda || [])
    const [csutortok,SetCsutortok]=useState(saved.csutortok || [])
    const [pentek,SetPentek]=useState(saved.pentek || [])
    const[id,SetId]=useState(saved.id || 1)

    const {színek}=useContext(Beallitasok)
    const {hasznalt_színek_background}=useContext(Beallitasok)
    const {SetBackground}=useContext(Beallitasok)
    const {randomSzín}=useContext(Beallitasok)
    const {SetRandomSzín}=useContext(Beallitasok)

    //adatbekérésben kiválasztott szín
    const [szín,SetSzín]=useState("")
    //ebbe van minden tárgy
    const [minden_targy,SetMindenTargy]=useState([hetfo,kedd,szerda,csutortok,pentek])

    // Mentés localStorage-be
    useEffect(() => {
        localStorage.setItem("orarend", JSON.stringify({
            hetfo,
            kedd,
            szerda,
            csutortok,
            pentek,
            id
        }));
    }, [hetfo, kedd, szerda, csutortok, pentek, id]);

    // Törlés függvény
    function torlesOsszesOra() {
        SetHetfo([]);
        SetKedd([]);
        SetSzerda([]);
        SetCsutortok([]);
        SetPentek([]);
        SetId(1);
        localStorage.removeItem("orarend");
    }

     return(
        <Tárgyak_listaja.Provider value={{minden_targy,hetfo,SetHetfo,kedd,SetKedd,szerda,SetSzerda,csutortok,SetCsutortok,pentek,SetPentek,id,SetId,szín,SetSzín, torlesOsszesOra}}>
             
            <Content/>
        </Tárgyak_listaja.Provider>
    ) 
}

export default Adatok