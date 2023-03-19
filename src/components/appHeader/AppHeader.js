import {NavLink, Link} from 'react-router-dom';
import './appHeader.scss';
import logo from './logo.svg'

function AppHeader() {
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__logo"><Link to="/"><img src={logo} alt="logo" /></Link></div>
                    <nav className="header__nav">
                        <ul className="header__list">
                            <li><NavLink end to="/" style={({isActive}) => ({color: isActive ? '#F1BC2E' : 'inherit'})}>Courses</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;