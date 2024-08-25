import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Set from './pages/Set';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/set/:set' element={<Set />} />
      </Routes>
    </Router>
  );
}

export default App;
