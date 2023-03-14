import { useState, useMemo, useEffect } from "react";
import useApiService from "../../services/courseService";
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error': 
            return <Error/>;
            break;
        default: 
            throw new Error('Error')
    }

}

function CoursesList() {
    const {process, setProcess, getAllCourses} = useApiService();

    const [coursesList, setCoursesList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    useEffect(() => {
        onRequest()
    }, [])
    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        setNewItemLoading(true);
        getAllCourses()
            .then(onCoursesListLoaded)
            .then(() => setProcess('confirmed'))

    }
    const onCoursesListLoaded = async(newCoursesList) => {
        setCoursesList([...newCoursesList]);
        setNewItemLoading(false);

    }
    function renderItems(arr) {
       const items = arr.map((item, i) => {
        return(
            <li key={item.id}>
                <img src={item.image} alt="" />
            </li>
        )
       })
       return (
        <ul>
            {items}
        </ul>
       )

    }
    const elements = useMemo(() => {
        return setContent(process, () => renderItems(coursesList), newItemLoading);
    }, [process])
    return(
        <div className="courses__list">
            <ul>
                <li>

                </li>
            </ul>
        </div>
    )
}

export default CoursesList;