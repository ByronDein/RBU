import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { projectSchema, type ProjectFormData } from './project.schema';
import { useProjects } from '@/hooks/use-project';
import type { Project } from '@/types/project.types';

interface ProjectFormProps {
    mode: 'create' | 'edit';
    project?: Project;
    onSuccess?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
    mode,
    project,
    onSuccess
}) => {
    const navigate = useNavigate();
    const { createProject, updateProject } = useProjects();

    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            nombre: project?.nombre || '',
            fechaInicio: project?.fechaInicio?.split('T')[0] || '',
            fechaTermino: project?.fechaTermino?.split('T')[0] || '',
        },
    });

    const onSubmit = async (data: ProjectFormData) => {
        try {
            if (mode === 'create') {
                await createProject(data);
            } else {
                await updateProject(project!.codigoProyecto, data);
            }

            onSuccess?.();
            navigate('/projects');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const title = mode === 'create' ? 'Crear Proyecto' : 'Editar Proyecto';
    const buttonText = mode === 'create' ? 'Crear' : 'Actualizar';
    const Icon = mode === 'create' ? Save : Edit;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button

                    size="sm"
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                </Button>
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>

            {/* Formulario */}
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Nombre */}
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Proyecto</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ej: Sistema de Gestión"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Máximo 50 caracteres
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Fecha Inicio */}
                            <FormField
                                control={form.control}
                                name="fechaInicio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Inicio</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='date'
                                                className='[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Fecha de inicio del proyecto
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Fecha Término */}
                            <FormField
                                control={form.control}
                                name="fechaTermino"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Término</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='date'
                                                className='[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Fecha estimada de finalización
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Botones */}
                            <div className="flex gap-2 pt-4">
                                <Button type="submit" className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    {buttonText}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => navigate('/projects')}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectForm;
