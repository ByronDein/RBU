import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectForm from '@/components/projects/ProjectForm';
import { useProjects } from '@/hooks/use-project';
import type { Project } from '@/types/project.types';

const EditProject: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { projects, loading, error } = useProjects();
    
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        if (id && projects.length > 0) {
            const foundProject = projects.find(proj => proj.codigoProyecto === Number(id));
            setProject(foundProject || null);
        }
    }, [id, projects]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Cargando proyecto...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Proyecto no encontrado</div>
            </div>
        );
    }

    return <ProjectForm mode="edit" project={project} />;
};

export default EditProject;
