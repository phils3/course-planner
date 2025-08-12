import Óra_kártya from "./óra_kártya"
import { useContext,useEffect, useState } from "react";
import { Beallitasok } from "../contexts/setup"
import {Tárgyak_listaja} from "./adatok";
function Napi_órarend({color, targyak_listaja,utolso=false, nap, onSubjectDelete}) {
    let órák_száma=12 //8:00-19:00 = 12 óra
    //console.log("napi orarend komponens: ", targyak_listaja[0])
    //1perc=0.111vh
    const [kártyaSzínek, setKártyaSzínek] = useState([]);
    let marginTop=0.11
    const {hasznalt_színek_background}=useContext(Beallitasok)
    const {színek}=useContext(Beallitasok) 
    const {SetBackground}=useContext(Beallitasok)
    const {randomSzín}=useContext(Beallitasok)
    const {SetRandomSzín}=useContext(Beallitasok)
    const {oszlopSzelesseg, orarendHeight}=useContext(Beallitasok)
    const egyOramagassag = orarendHeight / órák_száma // Ugyanaz mint az órák szekcióban
    const {szín}=useContext(Tárgyak_listaja)


    function getRandomUnusedColor(színek, hasznalt_színek_background) {
        // Szűrjük ki azokat a színeket, amelyek még nem szerepelnek a használt listában
        const elerheto_szinek = színek.filter(szin => !hasznalt_színek_background.includes(szin));
        let randomszin=elerheto_szinek[Math.floor(Math.random() * elerheto_szinek.length)]
        // Ha nincs elérhető szín, térjünk vissza null-lal vagy egy alapértelmezett színnel
        if (elerheto_szinek.length === 0) {
            console.warn("Nincs több elérhető szín!");
            return "#FFFFFF";
        }
        
        // Véletlenszerűen válasszunk egyet az elérhető színek közül
        if(!hasznalt_színek_background.includes(randomszin)){
            randomszin=elerheto_szinek[Math.floor(Math.random() * elerheto_szinek.length)]
            
            //SetBackground(randomszin)
            return randomszin
        }
            
        
        
    }
    useEffect(() => {
        if (targyak_listaja.length > 0) {
            const újSzínek = targyak_listaja.map(() => {
                let randomszin;

                if (szín === "") {
                    // Ha a szín üres, generálj egy véletlenszerű színt
                    randomszin = getRandomUnusedColor(színek, hasznalt_színek_background);
                } else {
                    // Ha van szín, akkor azt használjuk
                    randomszin = szín;
                }

                // Add hozzá a használt színekhez, hogy ne ismétlődjenek
                hasznalt_színek_background.push(randomszin);

                // Frissítsük a háttérszíneket
                SetBackground((prevSzínek) => [...prevSzínek, randomszin]);

                return randomszin;
            });

            setKártyaSzínek(újSzínek);
        }
    }, []);

    // Ütközés detektálás segédfüggvény
    function orakUtköznek(ora1, ora2) {
        const start1 = parseInt(ora1.ora_kezdes_oraban) * 60 + parseInt(ora1.ora_kezdes_percben);
        const end1 = parseInt(ora1.ora_vege_oraban) * 60 + parseInt(ora1.ora_vege_percben);
        const start2 = parseInt(ora2.ora_kezdes_oraban) * 60 + parseInt(ora2.ora_kezdes_percben);
        const end2 = parseInt(ora2.ora_vege_oraban) * 60 + parseInt(ora2.ora_vege_percben);
        return start1 < end2 && start2 < end1;
    }

    // Az oszlop teljes szélessége vw-ben a setup context-ből

    // Kiszámoljuk, mely órák ütköznek
    let positions = Array(targyak_listaja.length).fill(0);
    let widths = Array(targyak_listaja.length).fill(`calc(${oszlopSzelesseg}vw - 12px)`);
    for (let i = 0; i < targyak_listaja.length; i++) {
        for (let j = i + 1; j < targyak_listaja.length; j++) {
            if (orakUtköznek(targyak_listaja[i], targyak_listaja[j])) {
                widths[i] = `calc(${oszlopSzelesseg/2}vw - 9px)`;
                widths[j] = `calc(${oszlopSzelesseg/2}vw - 9px)`;
                positions[j] = 1; // a második ütköző jobbra kerül
            }
        }
    }
    
    
    return ( 
        <div style={{
            height: `${orarendHeight}vh`,
            width: `${oszlopSzelesseg}vw`,
            background: "#242424",
            position: "relative",
            borderBottomRightRadius: utolso ? "12px" : "none",
            borderRight: utolso ? "none" : "1px solid #9B9797",
            boxSizing: "border-box"
        }}>
           {/*  <hr style={{marginTop:`${marginTop}vh`, borderTop:"1px dashed #9B9797 ",borderBottom:"none",borderRight:"none"}}></hr> */}
            {Array.from({length: órák_száma - 1}, (_, i) => (
                <hr key={i} style={{position:"absolute",top:`${(i + 1) * egyOramagassag}vh`,left:0,right:0,margin:0,borderTop:"1px dashed #9B9797",borderBottom:"none",borderRight:"none",borderLeft:"none"}}></hr>
            ))}
       { targyak_listaja.map((targy,index)=>{
         const isPair = widths[index].includes('calc');
         const isRight = isPair && positions[index] === 1;
         return(
            <Óra_kártya
                key={index}
                background_color={targy.szin}
                óra_név={targy.targynev}
                kezdo_ora={targy.ora_kezdes_oraban}
                kezdo_perc={targy.ora_kezdes_percben}
                vege_ora={targy.ora_vege_oraban}
                vege_perc={targy.ora_vege_percben}
                kredit={targy.kredit}
                width={widths[index]}
                left={isPair ? (isRight ? `calc(${oszlopSzelesseg/2}vw + 3px)` : '6px') : undefined}
                marginLeft={undefined}
                marginRight={undefined}
                id={targy.id}
                nap={nap}
                onSubjectDelete={onSubjectDelete}
            />
        )
    }) 
}
        
        </div>
     );
}

export default Napi_órarend;