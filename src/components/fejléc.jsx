function Fejléc({órák_háttér_színe,betű_szín,padding,width}) {
    const gradientBackground = "linear-gradient(to bottom, #2EA98C   ,rgb(48, 47, 47) 100% )";
    let fontSize = "clamp(1rem, 2vw, 1.7em)";
    let orakOszlopSzelesseg = "11.4vw";
    let napOszlopSzelesseg = "11.4vw ";
    return ( 
        <div style={{display:"flex",width:"80vw"}}>
            <div style={{background:gradientBackground,textAlign:"center",color:"white",padding:`${padding}rem`,fontSize:fontSize,borderTopLeftRadius:"12px",borderRight:"1px solid #9B9797",width:orakOszlopSzelesseg,fontFamily:"sans-serif",letterSpacing:"0.5px",paddingBottom:"1.5rem",paddingTop:"1.5rem",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}>Órák</div>

            <div style={{background:gradientBackground,textAlign:"center",color:"white",padding:`${padding}rem`,fontSize:fontSize ,borderRight:"1px solid #9B9797",width:napOszlopSzelesseg,fontFamily:"sans-serif",letterSpacing:"0.5px",paddingBottom:"1.5rem",paddingTop:"1.5rem",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}>Hétfő</div>

            <div style={{background:gradientBackground,textAlign:"center",color:"white",padding:`${padding}rem`,fontSize:fontSize ,borderRight:"1px solid #9B9797",width:napOszlopSzelesseg,fontFamily:"sans-serif",letterSpacing:"0.5px",paddingBottom:"1.5rem",paddingTop:"1.5rem",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}>Kedd</div>

            <div style={{background:gradientBackground,textAlign:"center",color:"white",padding:`${padding}rem`,fontSize:fontSize ,borderRight:"1px solid #9B9797",width:napOszlopSzelesseg,fontFamily:"sans-serif",letterSpacing:"0.5px",paddingBottom:"1.5rem",paddingTop:"1.5rem",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}>Szerda</div>

            <div style={{background:gradientBackground,textAlign:"center",color:"white",padding:`${padding}rem`,fontSize:fontSize ,borderRight:"1px solid #9B9797",width:napOszlopSzelesseg,fontFamily:"sans-serif",letterSpacing:"0.5px",paddingBottom:"1.5rem",paddingTop:"1.5rem",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}> Csütörtök</div>

            <div style={{background:gradientBackground,textAlign:"center",color:"white",padding:`${padding}rem`,fontSize:fontSize,borderTopRightRadius:"12px",width:napOszlopSzelesseg,fontFamily:"sans-serif",letterSpacing:"0.5px",paddingBottom:"1.5rem",paddingTop:"1.5rem",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",borderRight:"none"}}>Péntek</div>
        </div>
     );
}

export default Fejléc;