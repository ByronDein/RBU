import apiService from "./api.service";
import type { Project, CreateProjectRequest, UpdateProjectRequest } from "@/types/project.types";
import type { Developer } from "@/types/developer.types";

export class ProjectService {
    private baseUrl = '/api/proyectos';

    async getAllProjects(): Promise<Project[]> {
        try {
            return await apiService.get<Project[]>(this.baseUrl);
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    async getProjectById(id: number): Promise<Project> {
        try {
            return await apiService.get<Project>(`${this.baseUrl}/${id}`);
        } catch (error) {
            console.error(`Error fetching project ${id}:`, error);
            throw error;
        }
    }

    async createProject(project: CreateProjectRequest): Promise<Project> {
        try {
            return await apiService.post<Project>(this.baseUrl, project);
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }

    async updateProject(id: number, project: UpdateProjectRequest): Promise<Project> {
        try {
            return await apiService.put<Project>(`${this.baseUrl}/${id}`, project);
        } catch (error) {
            console.error(`Error updating project ${id}:`, error);
            throw error;
        }
    }

    async reactivateProject(id: number): Promise<Project> {
        try {
            return await apiService.put<Project>(`${this.baseUrl}/${id}/reactivar`, {});
        } catch (error) {
            console.error(`Error reactivating project ${id}:`, error);
            throw error;
        }

    }

    async deleteProject(id: number): Promise<void> {
        try {
            return await apiService.delete<void>(this.baseUrl, id);
        } catch (error) {
            console.error(`Error deleting project ${id}:`, error);
            throw error;
        }
    }

    async assignDeveloperToProject(developerId: number, projectId: number): Promise<Project> {
        try {
            return await apiService.post<Project>(`${this.baseUrl}/${projectId}/asignarDesarrollador/${developerId}`, {});
        } catch (error) {
            console.error(`Error assigning developer ${developerId} to project ${projectId}:`, error);
            throw error;
        }
    }

    async removeDeveloperFromProject(developerId: number, projectId: number): Promise<Project> {
        try {
            return await apiService.delete<Project>(`${this.baseUrl}/${projectId}/desarrolladores/${developerId}`, developerId);
        } catch (error) {
            console.error(`Error removing developer ${developerId} from project ${projectId}:`, error);
            throw error;
        }
    }

    // async getProjectDevelopers(projectId: number): Promise<Developer[]> {
    //     try {
    //         return await apiService.get<Developer[]>(`${this.baseUrl}/${projectId}/desarrolladores`);
    //     } catch (error) {
    //         console.error(`Error fetching developers for project ${projectId}:`, error);
    //         throw error;
    //     }
    // }

    async getDevelopersByProject(projectId: number): Promise<Developer[]> {
        try {
            return await apiService.get<Developer[]>(`${this.baseUrl}/${projectId}/desarrolladores`);
        } catch (error) {
            console.error(`Error fetching developers for project ${projectId}:`, error);
            throw error;
        }
    }
}

export const projectService = new ProjectService();