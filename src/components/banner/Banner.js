import './banner.scss'
import { Button } from 'react-bootstrap';




const Banner = () => {
    return(
        <div className="banner">
            <div className="banner__info">
                <h1 className="banner__title">Effective learning with Smartify</h1>
                <p className="banner__descr">Be the best version of yourself</p>
            </div>
            <Button variant="dark" className="banner__button" size="lg">Choose course</Button>
        </div>
    )
}

export default Banner;