import { Beallitasok } from "../contexts/setup"
import { useContext,useEffect, useState } from "react";
import { Tárgyak_listaja } from "./adatok.jsx";
function Óra_kártya({background_color,óra_név,kezdo_ora,kezdo_perc,vege_ora,vege_perc,kredit, width, left, marginLeft, marginRight, id, nap, onSubjectDelete}) {
    const { oszlopSzelesseg, orarendHeight } = useContext(Beallitasok);
    const { hetfo, SetHetfo, kedd, SetKedd, szerda, SetSzerda, csutortok, SetCsutortok, pentek, SetPentek } = useContext(Tárgyak_listaja);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [editingName, setEditingName] = useState(false);
    const [editingTime, setEditingTime] = useState(false);
    const [editingCredit, setEditingCredit] = useState(false);
    const [tempName, setTempName] = useState(óra_név);
    const [tempStartHour, setTempStartHour] = useState(kezdo_ora);
    const [tempStartMin, setTempStartMin] = useState(kezdo_perc);
    const [tempEndHour, setTempEndHour] = useState(vege_ora);
    const [tempEndMin, setTempEndMin] = useState(vege_perc);
    const [tempCredit, setTempCredit] = useState(kredit);
    const [hoverName, setHoverName] = useState(false);
    const [hoverTime, setHoverTime] = useState(false);
    const [hoverCredit, setHoverCredit] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [showMobileEdit, setShowMobileEdit] = useState(false);
    const isMobile = window.innerWidth <= 900;
    const isSmallMobile = window.innerWidth <= 450;
    
    const validateTime = () => {
        const startTime = parseInt(tempStartHour) * 60 + parseInt(tempStartMin);
        const endTime = parseInt(tempEndHour) * 60 + parseInt(tempEndMin);
        return startTime < endTime;
    };
    
    useEffect(() => {
        const timer = setTimeout(() => setIsNew(false), 400);
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            const cardElement = event.target.closest('.card-container');
            const isInputClick = event.target.tagName === 'INPUT';
            const isEditableFieldClick = event.target.closest('.editable-field');
            const isMenuButtonClick = event.target.tagName === 'BUTTON' && cardElement;
            
            if (!cardElement || (cardElement && !isInputClick && !isMenuButtonClick)) {
                if (editingTime) {
                    if (validateTime()) {
                        setEditingTime(false);
                        setTimeError(false);
                        saveChanges();
                    } else {
                        setTimeError(true);
                    }
                }
                if (editingName) {
                    setEditingName(false);
                    saveChanges();
                }
                if (editingCredit) {
                    setEditingCredit(false);
                    saveChanges();
                }
                if (isMobile && (showMobileEdit || showMobileMenu) && !isEditableFieldClick && !isMenuButtonClick) {
                    console.log('handleClickOutside - módok kikapcsolása');
                    setShowMobileEdit(false);
                    setShowMobileMenu(false);
                }
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [editingTime, editingName, editingCredit, showMobileEdit, showMobileMenu]);
    
    const handleMobileEdit = () => {
        console.log('handleMobileEdit - showMobileEdit bekapcsolása');
        setShowMobileEdit(true);
        setShowMobileMenu(false);
    };
    
    const handleMobileDelete = () => {
        setShowMobileMenu(false);
        handleDelete();
    };
    
    const formatTime = (hour, minute) => {
        const formattedMinute = minute.toString().padStart(2, '0');
        return `${hour}:${formattedMinute}`;
    };
    
    const saveChanges = () => {
        if (!validateTime()) {
            setTimeError(true);
            return;
        }
        setTimeError(false);
        
        const updatedSubject = {
            id, targynev: tempName, nap,
            ora_kezdes_oraban: parseInt(tempStartHour),
            ora_kezdes_percben: parseInt(tempStartMin),
            ora_vege_oraban: parseInt(tempEndHour),
            ora_vege_percben: parseInt(tempEndMin),
            kredit: parseInt(tempCredit),
            szin: background_color
        };
        
        const updateList = (list, setList) => {
            setList(list.map(item => item.id === id ? updatedSubject : item));
        };
        
        switch(nap) {
            case 'hétfő': updateList(hetfo, SetHetfo); break;
            case 'kedd': updateList(kedd, SetKedd); break;
            case 'szerda': updateList(szerda, SetSzerda); break;
            case 'csütörtök': updateList(csutortok, SetCsutortok); break;
            case 'péntek': updateList(pentek, SetPentek); break;
        }
    };
    
    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            if (onSubjectDelete) {
                onSubjectDelete(óra_név);
            }
            switch(nap) {
            case 'hétfő':
                SetHetfo(hetfo.filter(targy => targy.id !== id));
                break;
            case 'kedd':
                SetKedd(kedd.filter(targy => targy.id !== id));
                break;
            case 'szerda':
                SetSzerda(szerda.filter(targy => targy.id !== id));
                break;
            case 'csütörtök':
                SetCsutortok(csutortok.filter(targy => targy.id !== id));
                break;
            case 'péntek':
                SetPentek(pentek.filter(targy => targy.id !== id));
                break;
        }
        }, 300);
    };
    //1 óra div magassága= orarendHeight/órákszáma vh
    //60 perc magassága a teljes óra magasság
    //1perc = orarendHeight/12/60 vh
    let vh = orarendHeight/12/60 //1 perc vh-ban
    let magassag=((parseInt(vege_ora)*60+parseInt(vege_perc))-(parseInt(kezdo_ora)*60+parseInt(kezdo_perc)))*vh
    
    
   
    let marginTop= (parseInt(kezdo_ora)*60+parseInt(kezdo_perc)-(8*60+0))*vh//-67.4
   
        return ( 
            <div className={`
                card-container
                ${isNew ? 'card-enter' : ''}
                ${isDeleting ? 'card-exit' : ''}
                ${!isMobile ? 'card-hover' : 'card-tap'}
            `} style={{
                left: left !== undefined ? left : "6px",
                transform: left !== undefined ? undefined : "none",
                transformOrigin: "center",
                borderRadius:"5px",
                background:`${background_color}`,
                border: isMobile && showMobileEdit ? '2px solid #fff' : 'none',
                top:`${marginTop}vh`,
                height:`${magassag}vh`,
                position:"absolute",
                width: width !== undefined ? width : `calc(${oszlopSzelesseg}vw - 12px)`,
                padding:"0px",
                boxSizing: "border-box",
                marginLeft: marginLeft !== undefined ? marginLeft : undefined,
                marginRight: marginRight !== undefined ? marginRight : undefined,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                overflow: "hidden",
                cursor: isMobile ? "pointer" : "default",
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent'
            }} onClick={(e) => {
                if (isMobile) {
                    e.preventDefault();
                    e.stopPropagation();
                    const isEditableClick = !!(e.target.closest('.editable-field') || e.target.classList.contains('editable-field'));
                    console.log('Kártya kattintás - showMobileMenu:', showMobileMenu, 'showMobileEdit:', showMobileEdit, 'isEditableClick:', isEditableClick);
                    
                    if (showMobileEdit && !isEditableClick) {
                        console.log('Szerkesztési mód kikapcsolása');
                        setShowMobileEdit(false);
                    } else if (showMobileMenu) {
                        console.log('Menü bezárása');
                        setShowMobileMenu(false);
                    } else if (!showMobileEdit && !showMobileMenu) {
                        console.log('Menü megnyitása');
                        setShowMobileMenu(true);
                    }
                }
            }}>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: magassag < 8 ? "center" : "space-between",
                    padding: magassag < 8 ? "2px 0" : "8px 0",
                    filter: isMobile && showMobileMenu ? "blur(2px)" : "none"
                }}>

                
                <div className="editable-field" style={{position: 'relative', display: 'block', padding: '0', backgroundColor: showMobileEdit ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: '4px', boxShadow: showMobileEdit ? '0 0 8px rgba(255,255,255,0.3)' : 'none', marginLeft: showMobileEdit ? '0' : 'auto', marginRight: showMobileEdit ? 'auto' : 'auto', width: '100%'}} onMouseEnter={() => setHoverName(true)} onMouseLeave={() => setHoverName(false)} onClick={(e) => {if(isMobile && showMobileEdit) {e.preventDefault(); e.stopPropagation(); setEditingTime(false); setEditingCredit(false); setTimeError(false); setEditingName(true);}}} onSelectStart={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
                    {editingName ? (
                        <input 
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onBlur={() => {setEditingName(false); saveChanges();}}
                            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                            autoFocus
                            style={{fontSize: "clamp(0.9rem, 2vw, 1.3rem)", fontFamily: "sans-serif", fontWeight: "bold", background: 'transparent', border: '1px solid #fff', borderRadius: '3px', textAlign: 'center', color: 'inherit', padding: '7px'}}
                        />
                    ) : (
                        <p style={{
                            fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
                            fontFamily: "sans-serif",
                            fontWeight: "bold",
                            margin: 0,
                            wordBreak: "break-word",
                            cursor: 'pointer',
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            border: 'none',
                            width: '100%',
                            padding: '2px 0px',
                            boxSizing: 'border-box',
                            textAlign: showMobileEdit ? 'left' : 'center'
                        }} onClick={(e) => {if(!isMobile) {setEditingTime(false); setEditingCredit(false); setTimeError(false); setEditingName(true);}}}>{tempName}</p>
                    )}
                    {(!isMobile || showMobileEdit) && !editingName && (hoverName || showMobileEdit) && (
                        <span onClick={() => setEditingName(true)} style={{position: 'absolute', right: '2px', bottom: '2px', cursor: 'pointer', opacity: 0.7, fontSize: '12px'}}>
                            <svg width="8px" height="8px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#000000ff"></path> </g></svg>
                        </span>
                    )}
                </div>
                <div className="editable-field" style={{position: 'relative', display: 'block', padding: '0', backgroundColor: showMobileEdit ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: '4px', boxShadow: showMobileEdit ? '0 0 8px rgba(255,255,255,0.3)' : 'none'}} onMouseEnter={() => setHoverTime(true)} onMouseLeave={() => setHoverTime(false)} onClick={(e) => {if(isMobile && showMobileEdit) {e.preventDefault(); e.stopPropagation(); setEditingName(false); setEditingCredit(false); setTimeError(false); setEditingTime(true);}}} onSelectStart={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
                    {editingTime ? (
                        <div className="time-edit-container" style={{display: 'flex', gap: '2px', alignItems: 'center', padding: '2px', border: `1px solid ${timeError ? 'red' : '#fff'}`, borderRadius: '3px', fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)', width: '100%', maxWidth: '100%', boxSizing: 'border-box'}}>
                            <div className="start-time-group">
                                <input className="start-hour-input" value={tempStartHour} onChange={(e) => {setTempStartHour(e.target.value); setTimeError(false);}} onKeyDown={(e) => {if(e.key === 'Enter') {if(validateTime()) e.target.blur(); else setTimeError(true);}}} onBlur={() => {if(validateTime()) {setEditingTime(false); setTimeError(false); saveChanges();} else setTimeError(true);}} style={{width: '20px', textAlign: 'center', background: 'transparent', border: 'none', color: 'inherit', fontSize: '1rem'}} />
                                :
                                <input className="start-min-input" value={tempStartMin} onChange={(e) => {setTempStartMin(e.target.value); setTimeError(false);}} onKeyDown={(e) => {if(e.key === 'Enter') {if(validateTime()) e.target.blur(); else setTimeError(true);}}} onBlur={() => {if(validateTime()) {setEditingTime(false); setTimeError(false); saveChanges();} else setTimeError(true);}} style={{width: '20px', textAlign: 'center', background: 'transparent', border: 'none', color: 'inherit', fontSize: '1rem'}} />
                            </div>
                            -
                            <div className="end-time-group">
                                <input className="end-hour-input" value={tempEndHour} onChange={(e) => {setTempEndHour(e.target.value); setTimeError(false);}} onKeyDown={(e) => {if(e.key === 'Enter') {if(validateTime()) e.target.blur(); else setTimeError(true);}}} onBlur={() => {if(validateTime()) {setEditingTime(false); setTimeError(false); saveChanges();} else setTimeError(true);}} style={{width: '20px', textAlign: 'center', background: 'transparent', border: 'none', color: 'inherit', fontSize: '1rem'}} />
                                :
                                <input className="end-min-input" value={tempEndMin} onChange={(e) => {setTempEndMin(e.target.value); setTimeError(false);}} onKeyDown={(e) => {if(e.key === 'Enter') {if(validateTime()) e.target.blur(); else setTimeError(true);}}} onBlur={() => {if(validateTime()) {setEditingTime(false); setTimeError(false); saveChanges();} else setTimeError(true);}} style={{width: '20px', textAlign: 'center', background: 'transparent', border: 'none', color: 'inherit', fontSize: '1rem'}} />
                            </div>
                        </div>
                    ) : (
                        <p style={{
                            fontSize: "clamp(1rem, 2vw, 1.4rem)",
                            fontFamily: "sans-serif",
                            margin: 0,
                            wordBreak: "break-word",
                            cursor: 'pointer',
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            border: 'none',
                            width: '100%',
                           padding: '2px 0px',
                            boxSizing: 'border-box',
                            textAlign: showMobileEdit ? 'left' : 'center'
                        }} onClick={(e) => {if(!isMobile) {setEditingName(false); setEditingCredit(false); setTimeError(false); setEditingTime(true);}}}>{`${formatTime(tempStartHour, tempStartMin)}-${formatTime(tempEndHour, tempEndMin)}`}</p>
                    )}
                    {(!isMobile || showMobileEdit) && !editingTime && (hoverTime || showMobileEdit) && (
                        <span onClick={() => setEditingTime(true)} style={{position: 'absolute', right: '2px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', opacity: 0.7, fontSize: '12px'}}>
                            <svg width="8px" height="8px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#000000ff"></path> </g></svg>
                        </span>
                    )}
                </div>
                <div className="editable-field" style={{position: 'relative', display: 'block', padding: '0', backgroundColor: showMobileEdit ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: '4px', boxShadow: showMobileEdit ? '0 0 8px rgba(255,255,255,0.3)' : 'none'}} onMouseEnter={() => setHoverCredit(true)} onMouseLeave={() => setHoverCredit(false)} onClick={(e) => {if(isMobile && showMobileEdit) {e.preventDefault(); e.stopPropagation(); setEditingName(false); setEditingTime(false); setTimeError(false); setEditingCredit(true);}}} onSelectStart={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
                    {editingCredit ? (
                        <div style={{display: 'flex', gap: '5px', alignItems: 'center', padding: '7px'}}>
                            <input 
                                value={tempCredit}
                                onChange={(e) => setTempCredit(e.target.value)}
                                onBlur={() => {setEditingCredit(false); saveChanges();}}
                                onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                                autoFocus
                                style={{width: '40px', textAlign: 'center', background: 'transparent', border: '1px solid #fff', borderRadius: '3px', color: 'inherit', padding: '3px', fontSize: '1.1rem'}}
                            />
                            <span style={{fontSize: '1.1rem'}}>kredit</span>
                        </div>
                    ) : (
                        <p style={{
                            fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
                            fontFamily: "sans-serif",
                            margin: 0,
                            fontWeight: "bold",
                            color: "rgba(0, 0, 0, 0.9)",
                            cursor: 'pointer',
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            border: 'none',
                            width: '100%',
                            padding: showMobileEdit ? '8px 4px 8px 0px' : '8px 12px',
                            boxSizing: 'border-box',
                            textAlign: showMobileEdit ? 'left' : 'center'
                        }} onClick={(e) => {if(!isMobile) {setEditingName(false); setEditingTime(false); setTimeError(false); setEditingCredit(true);}}}>{tempCredit} kredit</p>
                    )}
                    {(!isMobile || showMobileEdit) && !editingCredit && (hoverCredit || showMobileEdit) && (
                        <span onClick={() => setEditingCredit(true)} style={{position: 'absolute', right: '2px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', opacity: 0.7, fontSize: '12px'}}>
                            <svg width="8px" height="8px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#000000ff"></path> </g></svg>
                        </span>
                    )}
                </div>
                {(!isMobile || showMobileEdit) && <div className="delete-icon" onClick={handleDelete} style={{position: 'absolute', top: '3px', right: '3px', width: '25px', height: '25px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>×</div>}
                </div>
                {isMobile && showMobileMenu && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        borderRadius: '5px',
                        zIndex: 15
                    }}>
                        <button onClick={(e) => {e.preventDefault(); e.stopPropagation(); handleMobileEdit();}} style={{
                            background: '#17876E',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '1px 2px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>Szerk</button>
                        <button onClick={(e) => {e.preventDefault(); e.stopPropagation(); handleMobileDelete();}} style={{
                            background: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '1px 2px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            
                        }}>Törlés</button>
                    </div>
                )}
            </div>
            
         );
    
    
}

export default Óra_kártya;