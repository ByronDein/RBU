import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import DeveloperList from './components/developers/DeveloperList';
import ProjectList from './components/projects/ProjectsList';
// import HomePage from './pages/HomePage'; // Crea este componente

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/developers" element={<DeveloperList />} />
          <Route path="/projects" element={<ProjectList/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;