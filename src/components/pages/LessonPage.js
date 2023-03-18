import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, generatePath} from 'react-router-dom';
import useApiService from '../../services/courseService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import {Card, ListGroup} from 'react-bootstrap';
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
    const [lesson, setLesson] = useState({});
    const {process, setProcess, getCourse, clearError} = useApiService();
    const {lessonId} = useParams();
    useEffect(() => {
        updateLesson();
    }, [lessonId])

    const updateLesson = () => {
        clearError();
        getCourse(lessonId)
            .then(onLessonLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onLessonLoaded = (lesson) => {
        setLesson(lesson);
    }
    
    return(
        <div className="container">
            <div className="lesson__inner">
                 {setContent(process, () => <View data={lesson} lessons={lesson.lessons}/>, lesson)}
            </div>
        </div>
        
    )
}

const View = ({data, lessons}) => {
     const isDisplay = (data.lessonStatus === 'locked') ? 'flex' : 'none';
     const isLocked = (data.lessonStatus === 'locked') ? 'locker' : '';
     
    return(
        <>
            <Card style={{ width: "40%" }}>
                <div className={isLocked}>
                    <Card.Link href={data.lessonLink}>
                        <Card.Img variant="top" src={data.lessonImage} />
                        <Card.Body>
                            <Card.Title>{data.lessonTitle}</Card.Title>
                            <Card.Text>
                            Duration: {data.lessonDuration}
                            </Card.Text>
                        </Card.Body>
                    </Card.Link>
                    <div style={{'display': isDisplay}} id="sociallocker-overlay"><svg width={'30px'} style={{'marginRight': '20px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='white' d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>Unlock content with a social share.</div>
                </div>
            </Card>
       { lessons ? <ListGroup defaultActiveKey={lessons[0].id}>
                { lessons.map((lesson, i) => {
                    return(
                        <ListGroup.Item  action key={lesson.id}>
                            <Link to={`../${lesson.id}`}>
                            <h5 className='lesson__number'>Lesson {i+1}</h5>
                            <img className='lesson__image' src={lesson.previewImageLink + '/lesson-' +lesson.order + '.webp'} alt="lesson" />
                            {lesson.title}
                            </Link>
                         </ListGroup.Item>
        )
            }) }
            </ListGroup> : null }  
        </>
       
        
    )
}

export default LessonPage;


