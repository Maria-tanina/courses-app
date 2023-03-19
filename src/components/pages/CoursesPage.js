import CoursesList from "../coursesList/CoursesList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

function CoursesPage() {
    return(
        <>
            <ErrorBoundary>
                <CoursesList/>
            </ErrorBoundary>  
        </>
    )
}

export default CoursesPage;