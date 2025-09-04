import { developerService } from '@/services/developer.service';
import type { CreateDeveloperRequest, Developer } from '@/types/developer.types';
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const useDevelopers = () => {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchDevelopers = async () => {
        try {
            setLoading(true);
            const data = await developerService.getAllDevelopers();
            setDevelopers(data);
            setError(null);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching developers');
        }
        finally {
            setLoading(false);
        }
    }

    const getDeveloperById = async (id: number) => {
        return await developerService.getDeveloperById(id);
    }

    const assignDeveloperToProject = async (developerId: number, projectId: number) => {
        try {
            const response = await developerService.assingToProject(developerId, projectId);
            await fetchDevelopers();
            return response;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error asignando desarrollador al proyecto';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    const unassignDeveloperFromProject = async (developerId: number, projectId: number) => {
        try {
            const response = await developerService.unassignFromProject(developerId, projectId);
            await fetchDevelopers();
            return response;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desasignando desarrollador del proyecto';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    const reactivateDeveloper = async (id: number) => {
        try {
            const response = await developerService.activateDeveloper(id);
            await fetchDevelopers();
            toast.success('Desarrollador reactivado con éxito');
            return response;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error reactivando desarrollador';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    const getAllProjectsByDeveloper = async (developerId: number) => {
        try {
            return await developerService.getAllProjectsByDeveloper(developerId);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching projects for developer');
            throw err;
        }
    }

    const createDeveloper = async (developerData: CreateDeveloperRequest) => {
        try {
            const newDeveloper = await developerService.createDeveloper(developerData);
            setDevelopers((prev) => [...prev, newDeveloper]);
            toast.success('Desarrollador creado con éxito');
            return newDeveloper;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error creando desarrollador';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    const updateDeveloper = async (id: number, developerData: CreateDeveloperRequest) => {
        try {
            const updatedDeveloper = await developerService.updateDeveloper(id, developerData);
            setDevelopers((prev) => [...prev, updatedDeveloper]);
            toast.success('Desarrollador editado con éxito');
            return updatedDeveloper;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error editando desarrollador';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }
    const deleteDeveloper = async (id: number) => {
        try {
            await developerService.deleteDeveloper(id);
            await fetchDevelopers();
            toast.success('Desarrollador deshabilitado con éxito');
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error deshabilitando desarrollador';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }

    useEffect(() => {
        fetchDevelopers();
    }, [])

    return {
        developers,
        loading,
        error,
        fetchDevelopers,
        getDeveloperById,
        getAllProjectsByDeveloper,
        assignDeveloperToProject,
        unassignDeveloperFromProject,
        reactivateDeveloper,
        createDeveloper,
        updateDeveloper,
        deleteDeveloper
    }
}