import { projectService } from '@/services/project.service';
import type { CreateProjectRequest, Project } from '@/types/project.types';
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await projectService.getAllProjects();
            setProjects(data);
            setError(null);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching projects');
        }
        finally {
            setLoading(false);
        }
    }

    const getProjectById = async (id: number) => {
        return await projectService.getProjectById(id);
    }

    const createProject = async (projectData: CreateProjectRequest) => {
        try {
            const newProject = await projectService.createProject(projectData);
            setProjects((prev) => [...prev, newProject]);
            toast.success('Proyecto creado con éxito');
            return newProject;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creando proyecto';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    const updateProject = async (id: number, projectData: CreateProjectRequest) => {
        try {
            const updatedProject = await projectService.updateProject(id, projectData);
            setProjects((prev) =>
                prev.map(project =>
                    project.codigoProyecto === id ? updatedProject : project
                )
            );
            toast.success('Proyecto editado con éxito');
            return updatedProject;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error editando proyecto';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    const reactivateProject = async (id: number) => {
        try {
            const response = await projectService.reactivateProject(id);
            await fetchProjects();
            toast.success('Proyecto reactivado con éxito');
            return response;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error reactivando proyecto';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    const deleteProject = async (id: number) => {
        try {
            await projectService.deleteProject(id);
            await fetchProjects();
            toast.success('Proyecto deshabilitado con éxito');
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error deshabilitando proyecto';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    const assignDeveloperToProject = async (developerId: number, projectId: number) => {
        try {
            const updatedProject = await projectService.assignDeveloperToProject(developerId, projectId);
            // ✅ Actualizar el proyecto en el estado local
            setProjects((prev) =>
                prev.map(project =>
                    project.codigoProyecto === projectId ? updatedProject : project
                )
            );
            return updatedProject;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error assigning developer to project');
            throw err;
        }
    }

    const removeDeveloperFromProject = async (developerId: number, projectId: number) => {
        try {
            const updatedProject = await projectService.removeDeveloperFromProject(developerId, projectId);
            setProjects((prev) =>
                prev.map(project =>
                    project.codigoProyecto === projectId ? updatedProject : project
                )
            );
            return updatedProject;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error removing developer from project');
            throw err;
        }
    }

    // const getProjectDevelopers = async (projectId: number) => {
    //     try {
    //         return await projectService.getProjectDevelopers(projectId);
    //     }
    //     catch (err) {
    //         setError(err instanceof Error ? err.message : 'Error fetching project developers');
    //         throw err;
    //     }
    // }

    useEffect(() => {
        fetchProjects();
    }, [])

    return {
        projects,
        loading,
        error,
        fetchProjects,
        getProjectById,
        createProject,
        updateProject,
        reactivateProject,
        deleteProject,
        assignDeveloperToProject,
        removeDeveloperFromProject,
        // getProjectDevelopers
    }
}