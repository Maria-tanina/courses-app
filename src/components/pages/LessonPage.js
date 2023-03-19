import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, NavLink} from 'react-router-dom';
import useApiService from '../../services/courseService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import {Card, ListGroup} from 'react-bootstrap';
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import './lessonPage.scss';

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
   
function LessonPage() {
    
    const [course, setCourse] = useState({});
    const [lesson, setLesson] = useState({});
    const {process, setProcess, getCourse, getLesson, clearError} = useApiService();
    const {courseId} = useParams();
    const {lessonId} = useParams();
    useEffect(() => {
        updateLesson();
      
    }, [courseId, lessonId])

    const updateLesson = () => {
        clearError();
        getCourse(courseId)
            .then(onCourseLoaded)
            .then((course) => getLesson(course, lessonId))
            .then(lesson => {
                setLesson(lesson);
               
            })
            .then(() => setProcess('confirmed'));
        

    }
   
    const onCourseLoaded = (course) => {
        setCourse(course);
        return course;
    }
   
    return(
        <section className="course__lessons">
            <div className="container">
                <div className="lesson__inner">
                    {setContent(process, () => <View data={course} lesson={lesson} lessons={course.lessons}/>, course)}
                </div>
            </div>
        </section>
        
    )
}

const View = ({data, lesson, lessons}) => {
     const isDisplay = (data.lessonStatus === 'locked') ? 'flex' : 'none';
     const isLocked = (data.lessonStatus === 'locked') ? 'locker' : '';
        const pictureOnPicture = (e) => {
            e.target.requestPictureInPicture();
        }      
           document.onkeydown = function(e) {
    
            e = e || window.event;
        
            if (e.shiftKey && e.ctrlKey) {
        
              document.getElementsByTagName('video')[0].playbackRate = 2;
            } else if (e.altKey && e.ctrlKey) {
                document.getElementsByTagName('video')[0].playbackRate = 0.5;
            }

            return true;
    }
    return(
        <>
            <Card style={{ width: "50%" }}>
                <div className="course__info">
                    <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width='20px' viewBox="0 0 448 512"><path fill='white' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></Link>
                    <h5 className="course__title">{data.title}</h5>
                </div>
                <div className={isLocked}>
                         {lesson ? <ReactHlsPlayer
                                     onClick={pictureOnPicture}
                                    src={lesson.link}
                                    controls={true}
                                    width="100%"
                                /> : null} 
                    <div style={{'display': isDisplay}} id="sociallocker-overlay"><svg width={'30px'} style={{'marginRight': '20px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='white' d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>Unlock content with a social share.</div>
                    
                </div>
               {(data.lessonStatus === 'unlocked') ? <p>Press ctrl + shift for 2x speed <br/>Press alt + ctrl for 0.5x speed</p> : null} 
            </Card>
          
       { lessons ? <ListGroup defaultActiveKey={lessons[0].id}>
                { lessons.map((lesson, i) => {
                    return(
                        
                            <NavLink to={`/lessons/${data.id}/${lesson.id}`} style={({isActive}) => ({backgroundColor: isActive ? '#d1d7dc' : 'inherit'})}>
                                <ListGroup.Item  action key={lesson.id}>
                                    <h5 className='lesson__number'>Lesson {i+1}</h5>
                                    <img className='lesson__image' src={lesson.previewImageLink + '/lesson-' +lesson.order + '.webp'} alt="lesson" />
                                    {lesson.title}
                                </ListGroup.Item>
                            </NavLink>
                        
        )
            }) }
            </ListGroup> : null }  
        </>
       
        
    )
}

export default LessonPage;


