import type { Project } from "@/types/project.types";
import apiService from "./api.service";
import axios from "axios";
import type { Developer, CreateDeveloperRequest, UpdateDeveloperRequest } from "@/types/developer.types";

export class DeveloperService {
    private baseUrl = '/api/desarrolladores';

    async getAllDevelopers(): Promise<Developer[]> {
        try {
            return await apiService.get<Developer[]>(this.baseUrl);
        } catch (error) {
            console.error('Error fetching developers:', error);
            throw error;
        }
    }

    async getDeveloperById(id: number): Promise<Developer> {
        try {
            return await apiService.get<Developer>(`${this.baseUrl}/${id}`);
        } catch (error) {
            console.error(`Error fetching developer ${id}:`, error);
            throw error;
        }
    }

    async activateDeveloper(id: number): Promise<Developer> {
        try {
            return await apiService.put<Developer>(`${this.baseUrl}/${id}/reactivar`, {});
        } catch (error) {
            console.error(`Error activating developer ${id}:`, error);
            throw error;
        }
    }

    async createDeveloper(developer: CreateDeveloperRequest): Promise<Developer> {
        try {
            const response =  await apiService.post<Developer>(this.baseUrl, developer);
            return response;
        } catch (error) {
            console.error('Error creating developer:', error);
            throw error;
        }
    }

    async updateDeveloper(id: number, developer: UpdateDeveloperRequest): Promise<Developer> {
        try {
            return await apiService.put<Developer>(`${this.baseUrl}/${id}`, developer);
        } catch (error) {
            console.error(`Error updating developer ${id}:`, error);
            throw error;
        }
    }

    async deleteDeveloper(id: number): Promise<void> {
        try {
            return await apiService.delete<void>(this.baseUrl, id);
        } catch (error) {
            console.error(`Error deleting developer ${id}:`, error);
            throw error;
        }
    }

    async assingToProject(developerId: number, projectId: number): Promise<Developer> {
        try {
            return await apiService.post<Developer>(`/api/proyectos/${projectId}/desarrolladores/${developerId}`, {});
        } catch (error) {
            console.error(`Error assigning developer ${developerId} to project ${projectId}:`, error);
            throw error;
        }
    }

    async getAllProjectsByDeveloper(developerId: number): Promise<Project[]> {
        return apiService.get<Project[]>(`${this.baseUrl}/${developerId}/proyectos`);
        //Creo que esta mal la api de obtener proeyctos por desarollador porque dice 
        // /api/desarrolladores/:codigoProyecto/proyectos y no dice codigoDesarrolador,
        // por lo que no se si funcione el poder traer todos los proyectos por desarrollador
        // voy a probar con /pi/desarrollador/:codigoDesarolladro/proyectos pero si no lo voy a documentar para ponerlo en un readm.me
    }

    async unassignFromProject(developerId: number, projectId: number): Promise<void> {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/proyectos/${projectId}/desarrolladores/${developerId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error unassigning developer ${developerId} from project ${projectId}:`, error);
            throw error;
        }
    }
}

export const developerService = new DeveloperService();