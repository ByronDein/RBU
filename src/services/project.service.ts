import apiService from "./api.service";

import type { Project, CreateProjectRequest, UpdateProjectRequest } from "@/types/project.types";


export class ProjectService {
    private baseUrl = '/api/proyectos';


    async getAllProjects(): Promise<Project[]> {
        return apiService.get<Project[]>(this.baseUrl);
    }

    async getProjectById(id: number): Promise<Project[]> {
        return apiService.get<Project[]>(`${this.baseUrl}/${id}`);
    }

    async createProject(project:CreateProjectRequest): Promise<Project> {
        return apiService.post<Project>(this.baseUrl, project);
    }

    async updateProject(id: number, project:UpdateProjectRequest): Promise<Project> {
        return apiService.put<Project>(`${this.baseUrl}/${id}`, project);
    }

    async deleteProject(id: number): Promise<void> {
        return apiService.delete<void>(this.baseUrl, id);
    }

    // async assingToProject(: number, projectId: number): Promise<Project> {
    //     return apiService.post<Project>(`${this.baseUrl}/${}/asignarProyecto/${projectId}`, {});
    // }
}


export const projectService = new ProjectService();
