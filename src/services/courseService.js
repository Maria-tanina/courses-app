import { useHttp } from "../hooks/http.hook";
const useApiService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp();


    const _apiBase = 'http://api.wisey.app/';
    const _version = 'api/v1';
  //`${_apiBase}${_version}/core/preview-courses`, 'GET', null, {'Content-Type': 'application/json','Authorization': `Bearer ${token}`}

    const getAllCourses = async () => {
       const res = await request(`http://localhost:8000/courses`);
       return res.map(_transformCourses);
    }    
    const getCourse = async (id) => {
       const res = await request(`http://localhost:8000/courses`);
       return res.map(_transformCourses).filter(item => item.id === id)[0];
    }
    const getLesson = async (obj, id) => {
      return obj.lessons.filter(lesson => lesson.id === id)[0];
   }
    const _transformCourses = (course) => {
        return {
            id: course.id,
            title: course.title,
            launchDate: course.launchDate,
            description:  course.description ? `${course.description}` : 'There is no description for this course',
            image: course.previewImageLink + '/cover.webp',
            lessonsCount: course.lessons.length,
            skills: course.meta.skills ? course.meta.skills.map(skill => {
                return(
                  <span>{skill} </span>
                )
              }) : null,
            rating: course.rating,
            courseVideo: course.meta.courseVideoPreview ? course.meta.courseVideoPreview.link : '',
            lessons: course.lessons,
            lessonImage: `${course.lessons[0].previewImageLink}/lesson-${course.lessons[0].order}.webp`,
            lessonStatus: course.lessons[0].status,
            lessonTitle: course.lessons[0].title,
            lessonDuration: course.lessons[0].duration,
            lessonLink: course.lessons[0].link
           
        }
    }
   
 
   
    return {process, getAllCourses, getCourse,getLesson,  clearError, setProcess}
} 

export default useApiService;