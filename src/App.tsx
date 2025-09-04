import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { CreateDeveloper, DeveloperDetailPage, DevelopersPage, EditDeveloper } from './pages/developer/index'
import ProjectsPage from './pages/project/ProjectsPage';
import CreateProject from './pages/project/CreateProject';
import EditProject from './pages/project/EditProject';
import ProjectDetail from './pages/project/ProjectDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/developers/create" element={<CreateDeveloper />} />
          <Route path="/developers/:id/edit" element={<EditDeveloper />} />
          <Route path="/developers/:id/detail" element={<DeveloperDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />
          <Route path="/projects/:id/detail" element={<ProjectDetail />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;