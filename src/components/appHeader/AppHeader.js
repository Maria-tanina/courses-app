import {NavLink} from 'react-router-dom';
import './appHeader.scss';
import logo from './logo.svg'

function AppHeader() {
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__logo"><img src={logo} alt="" /></div>
                    <nav className="header__nav">
                        <ul className="header__list">
                            <li><NavLink end to="/" style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}>Courses</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;