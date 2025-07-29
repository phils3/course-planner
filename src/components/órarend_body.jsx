import Napi_órarend from "./napi_órarend.jsx";
import Órák_szekció from "./Órák_szekció.jsx"
//import TargyHalmaz from "./adatok.jsx";
import { useContext } from "react";
import {Tárgyak_listaja} from "./adatok.jsx"


function Órarend_body({width=80,height=80,color="#54AA9A"}) {
    const {hetfo}= useContext(Tárgyak_listaja)
    const {kedd}=useContext(Tárgyak_listaja)
    const {szerda}=useContext(Tárgyak_listaja)
    const {csutortok}=useContext(Tárgyak_listaja)
    const {pentek}=useContext(Tárgyak_listaja)
       

    return ( 
        <div className="orarend-body" style={{width:`${width}vw`,height:`${height}vh`,display:"flex"}}>
            <Órák_szekció kezd_ora={8} vég_ora={19} órák_háttér={"#5885AF"} szám_szín={"#C3E0E5"} bottom_border_szín={"#9B9797"}/>
            <div style={{height:`${height}vh`,width:`${width/1}vw`,display:"flex"}}>
                <Napi_órarend color={"#5845AF"} targyak_listaja={hetfo}/>
                <Napi_órarend color={"#595AF"} targyak_listaja={kedd}/>
                <Napi_órarend color={"#5845AF"} targyak_listaja={szerda}/>
                <Napi_órarend color={"#595AF"} targyak_listaja={csutortok}/>
                <Napi_órarend color={"#5845AF"} targyak_listaja={pentek} utolso={true}/>
            </div>
        </div>
     );
}

export default Órarend_body;