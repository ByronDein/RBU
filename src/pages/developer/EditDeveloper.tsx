import DeveloperForm from '@/components/developers/DeveloperForm';
import { useDevelopers } from '@/hooks/use-developers';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import type { Developer } from '@/types/developer.types';

const EditDeveloper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getDeveloperById, loading, error } = useDevelopers();
    const [developer, setDeveloper] = React.useState<Developer | null>(null);
    const getDeveloper = async () => {
        if (id) {
            const response = await getDeveloperById(Number(id));
            setDeveloper(response);
            return
        }
    }
    useEffect(() => {
        getDeveloper();
    }, [id]);


    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-muted-foreground">Cargando desarrollador...</div>
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
    if (!developer) return <div>Desarrollador no encontrado</div>;
    return <DeveloperForm mode="edit" developer={developer} />;
};

export default EditDeveloper;