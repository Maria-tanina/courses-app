import CoursesList from "../coursesList/CoursesList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Banner from "../banner/Banner";

function CoursesPage() {
    return(
        <>
            <ErrorBoundary>
                <Banner/>
                <CoursesList/>
            </ErrorBoundary>  
        </>
    )
}

export default CoursesPage;