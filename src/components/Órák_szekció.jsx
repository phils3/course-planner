function Órák_szekció({kezd_ora,vég_ora,órák_háttér,szám_szín,bottom_border_szín}) {

    let órák_száma = (vég_ora-kezd_ora)+1
    let órák_tömb=[]
    for (let i=kezd_ora;kezd_ora<=vég_ora ;kezd_ora++){
        órák_tömb.push(i)
        i++
    }
    
    return ( 
        <div style={{width:"11.4vw",display:"flex",flexDirection:"column"}}>
            {
                órák_tömb.map((óra,index)=>
                    <div key={óra} style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.7em)",
                        background: "#242424",
                        color: "#2cc295",
                        borderBottom: index === órák_tömb.length - 1 ? "none" : `1px solid ${bottom_border_szín}`,
                        borderRight: "1px solid "+bottom_border_szín,
                        height: `${80/órák_száma}vh`,
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        borderBottomLeftRadius: index===órák_tömb.length - 1 ?"12px":"none",
                        boxSizing: "border-box",
                        width:"11.4vw"
                    }}>{óra}:00</div>
                )
            }  
                
            
        </div>
     );
}

export default Órák_szekció;