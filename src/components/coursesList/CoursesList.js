import { useState, useMemo, useEffect } from "react";
import {Link, NavLink} from 'react-router-dom';
import useApiService from "../../services/courseService";
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import {Card, Button, ListGroup} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import StarsRating from 'react-star-rate';
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import './coursesList.scss'


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
  const PER_PAGE = 10;
function CoursesList() {
 
    
    const {process, setProcess, getAllCourses} = useApiService();

    const [coursesList, setCoursesList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);

    //pagination
    const [currentPage, setCurrentPage] = useState(0);

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
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
     const offset = currentPage * PER_PAGE;
    function renderItems(arr) { 
       const items = arr.slice(offset, offset + PER_PAGE).map((item, i) => {
        return(
            <li key={item.id}>  
                <Card>
                    <Link to={`/lessons/${item.id}/${item.lessons[0].id}`}>
                       <ReactHlsPlayer
                                    poster={item.image}
                                    src={item.lessons[0].link}
                                    width="100%"
                                    onMouseOver={(e) =>{e.target.play(); e.target.muted = true}}
                                    onMouseOut={(e) =>{{e.target.pause(); e.target.muted = true}}}
                                /> 
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            
                        </Card.Body>
                    </Link>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item key="1">Lessons: {item.lessonsCount}</ListGroup.Item>
                        <ListGroup.Item key="2">Skills: {item.skills}</ListGroup.Item>
                        <ListGroup.Item key="3">
                        <StarsRating value={item.rating} disabled='true'/>
                        </ListGroup.Item>
                    </ListGroup>
                    
                </Card>
                </li>
            
           
        )
       })
       
       return (
        
        <ul className="courses__list">
            {items}
        </ul>
       )

    }
     const pageCount = Math.ceil(coursesList.length / PER_PAGE);
  
    const elements = useMemo(() => {
        return setContent(process, () => renderItems(coursesList), newItemLoading);
    }, [process, currentPage])
    return(
        <div className="courses">
            <div className="container">
                {elements}
                {  elements ?          
                  <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                /> : null
                }
            </div>
        </div>
    )
}


export default CoursesList;