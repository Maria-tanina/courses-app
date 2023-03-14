import './App.css';
import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Page404 } from '../pages';
import AppHeader from '../appHeader/AppHeader';

const CoursesPage = lazy(() => import('../pages/CoursesPage'));
const LessonPage = lazy(() => import('../pages/LessonPage'));
function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader/>
        <main>
          <Routes>
              <Route path="/" element={<CoursesPage/>}/>
              <Route path="/lesson" element={<LessonPage/>}/>
              <Route path="*" element={<Page404/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
