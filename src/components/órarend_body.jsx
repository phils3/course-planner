import Napi_órarend from "./napi_órarend.jsx";
import Órák_szekció from "./Órák_szekció.jsx"
//import TargyHalmaz from "./adatok.jsx";
import { useContext } from "react";
import {Tárgyak_listaja} from "./adatok.jsx"
import { Beallitasok } from '../contexts/setup';


function Órarend_body({color="#54AA9A",onSubjectDelete}) {
    const {hetfo}= useContext(Tárgyak_listaja)
    const {kedd}=useContext(Tárgyak_listaja)
    const {szerda}=useContext(Tárgyak_listaja)
    const {csutortok}=useContext(Tárgyak_listaja)
    const {pentek}=useContext(Tárgyak_listaja)
    const { oszlopSzelesseg, orarendWidth, orarendHeight } = useContext(Beallitasok);
       

    return ( 
        <div className="orarend-body" style={{width:`${orarendWidth}vw`,height:`${orarendHeight}vh`,display:"flex"}}>
            <Órák_szekció kezd_ora={8} vég_ora={19} órák_háttér={"#5885AF"} szám_szín={"#C3E0E5"} bottom_border_szín={"#9B9797"}/>
            <div style={{height:`${orarendHeight}vh`,width:`${oszlopSzelesseg * 5}vw`,display:"flex"}}>
                <Napi_órarend color={"#5845AF"} targyak_listaja={hetfo} nap="hétfő" onSubjectDelete={onSubjectDelete}/>
                <Napi_órarend color={"#595AF"} targyak_listaja={kedd} nap="kedd" onSubjectDelete={onSubjectDelete}/>
                <Napi_órarend color={"#5845AF"} targyak_listaja={szerda} nap="szerda" onSubjectDelete={onSubjectDelete}/>
                <Napi_órarend color={"#595AF"} targyak_listaja={csutortok} nap="csütörtök" onSubjectDelete={onSubjectDelete}/>
                <Napi_órarend color={"#5845AF"} targyak_listaja={pentek} utolso={true} nap="péntek" onSubjectDelete={onSubjectDelete}/>
            </div>
        </div>
     );
}

export default Órarend_body;