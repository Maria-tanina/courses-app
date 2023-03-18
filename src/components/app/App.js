import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Page404 } from '../pages';
import Spinner from '../spinner/Spinner';
import AppHeader from '../appHeader/AppHeader';

const CoursesPage = lazy(() => import('../pages/CoursesPage'));
const LessonPage = lazy(() => import('../pages/LessonPage'));

function App() {
  return (
    <Router>    
      <div className="App">
        <AppHeader/>
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path="/" element={<CoursesPage/>}/>
                <Route path="/:lessonId" element={<LessonPage/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
