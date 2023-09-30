import { useEffect, useRef, useState } from "react"
import styles from "./nav.module.scss"
import { useTranslation } from "react-i18next";
import LogoAR from "../Logo/LogoAR";
import LogoEn from "../Logo/LogoEn";
function DropDown({title,render,wrapperStyle}) {
    const [openMenu, setopenMenu] = useState(false)
    const toggleMenu = () => {
        setopenMenu(!openMenu);
      };
    
    useEffect(() => {
        function handleClickOutside(event) {
          if (openMenu && !event.target.closest(".closemenu")) {
            setopenMenu(false);
          }
        }
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [openMenu]);
    
  return (
    <div className={`${styles.dropDown_container} closemenu `}>
    <li className={styles.track} onClick={toggleMenu}>{title}</li>
    {openMenu && <div className={`${styles.menu} ${wrapperStyle} `} >
{render()}
    </div>}
    
    </div>
  )
}
function Nav({handleSearch}) {
    const SearchInput = useRef(null)
    const { t, i18n } = useTranslation();
  return (
    <div className={styles.wrapper}>
        <nav>
            <div className={styles.logo}>
              {i18n.language==="ar"?( <LogoAR/>):(<LogoEn/>)}
               
            </div>
            
            <div className={styles.main_link}>
            <li>{t("main")}</li>
            <li> {t("prices")}</li>
            <li>{t("sales")} </li>
            </div>
            <div className={styles.side_link}>
            <DropDown title={t("track_ship")}  render={()=>{
                return<>
                <input type="search" className={styles.track_search}  ref={SearchInput}  placeholder={t("shipNumber")}/>
                <button onClick={()=>handleSearch(SearchInput.current.value,SearchInput)}>{t("search")}</button>
                </>

            }} wrapperStyle={styles.trackDrop} />
            <li>{t("log")}</li>
            <DropDown title={i18n.language==="ar"?"AR":"ENG"}  render={()=>{
                return<>
               <div className={styles.select}>
                <li onClick={()=>i18n.changeLanguage("ar")} className={`${i18n.language==="ar"?styles.active:""}`}>{t("lang-ar")}</li>
                <li onClick={()=>i18n.changeLanguage("en")} className={`${i18n.language==="en"?styles.active:""}`}>{t("lang-en")}</li>
               </div>
                </>

            }} wrapperStyle={styles.langDrop} />
            </div>
        </nav>
    </div>
  )
}

export default Nav