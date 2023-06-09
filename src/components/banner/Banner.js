import './banner.scss'
import { Button } from 'react-bootstrap';

function getHeight() {
    if(document.querySelector('.banner') && document.querySelector('.header')) {
        const height = document.querySelector('.banner').clientHeight + document.querySelector('.header').clientHeight;
        return height;
    }

}


const Banner = () => {
    return(
        <div className="banner">
            
                <div className="banner__info">
                    <h1 className="banner__title">Effective learning with Smartify</h1>
                    <p className="banner__descr">Be the best version of yourself</p>
                </div>
                <Button variant="dark" className="banner__button" size="lg" onClick={() => window.scroll({
                top: getHeight(),
                behavior: 'smooth'
            })}>Choose course</Button>
        </div>
    )
}

export default Banner;