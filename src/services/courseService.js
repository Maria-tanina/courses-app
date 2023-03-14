import { useHttp } from "../hooks/http.hook";
const useApiService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp();


    const _apiBase = 'http://api.wisey.app/';
    const _version = 'api/v1';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmU5ZGM2ZS01ZmEyLTRkYjUtODMxMS1hNDZlYzUwMmI5NDIiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3NDQ2NDMsImV4cCI6MTY3OTY0NDY0M30.nM6APsIfQVHq0CVjbv14aQWb6m9719_7LwatPZr1zwY'
    const _baseOffset = 210;
  

    const getAllCourses = async () => {
       const res = await request(`${_apiBase}${_version}/core/preview-courses`);
       return res.courses.map(_transformCourses);
    }
    const getCourse = async (id) => {
       const res = await request(`${_apiBase}${_version}/core/preview-courses/:${id}`);
       return _transformCourses(res);
    }
    
    const _transformCourses = (course) => {
        return {
            id: course.id,
            title: course.title,
            launchDate: course.launchDate,
            description:  course.description ? `${course.description.slice(0, 210)}...` : 'There is no description for this course',
            image: course.previewImageLink
        }
    }
 
   
    return {process, getAllCourses, getCourse, clearError, setProcess}
} 

export default useApiService;