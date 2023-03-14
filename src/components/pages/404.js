import Error from "../error/Error"
import { Link } from "react-router-dom"
 function Page404() {
    return(
        <div>
            <Error/>
            <Link style={{display: 'block', textAlign: 'center'}} to="/">Back to main page</Link>
        </div>
    )
}
export default Page404;