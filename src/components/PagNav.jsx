import {NavLink} from 'react-router-dom'
import Logo from './Logo'
import styles from './PagNav.module.css'
function PagNav() {
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
                </li>
            </ul> 
        </nav>
    )
}
    
export default PagNav
