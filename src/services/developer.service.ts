import apiService from "./api.service";

import type { Developer, CreateDeveloperRequest, UpdateDeveloperRequest } from "@/types/developer.types";


export class DeveloperService {
    private baseUrl = '/api/desarrolladores';


    async getAllDevelopers(): Promise<Developer[]> {
        return apiService.get<Developer[]>(this.baseUrl);
    }

    async getDeveloperById(id: number): Promise<Developer[]> {
        return apiService.get<Developer[]>(`${this.baseUrl}/${id}`);
    }

    async createDeveloper(developer:CreateDeveloperRequest): Promise<Developer> {
        return apiService.post<Developer>(this.baseUrl, developer);
    }

    async updateDeveloper(id: number, developer:UpdateDeveloperRequest): Promise<Developer> {
        return apiService.put<Developer>(`${this.baseUrl}/${id}`, developer);
    }

    async deleteDeveloper(id: number): Promise<void> {
        return apiService.delete<void>(this.baseUrl, id);
    }

    async assingToProject(developerId: number, projectId: number): Promise<Developer> {
        return apiService.post<Developer>(`${this.baseUrl}/${developerId}/asignarProyecto/${projectId}`, {});
    }
}


export const developerService = new DeveloperService();