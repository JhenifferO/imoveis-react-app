import style from './header.module.scss'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrClose} from 'react-icons/gr'
import {useState} from 'react' 
import Nav from "./Nav"

const MobileNavigation = () =>{
    const [menuMobile, setMenuMobile] = useState(false)
    
    const handleMenuMobile = () => {
        setMenuMobile(!menuMobile)
        console.log(menuMobile)
    }

    return (
        <nav className={style.mobileNavigation}>
            {!menuMobile && 
            <GiHamburgerMenu 
                className={style.hamburger} 
                size={'40px'}
                onClick={()=> handleMenuMobile()}
            />}

            {menuMobile && 
            <GrClose 
                className={style.close} 
                size={'40px'}
                color={'white'}
                onClick={()=> handleMenuMobile()}
            />}

            {menuMobile === true && <Nav/>}
        </nav>
    )
}

export default MobileNavigation