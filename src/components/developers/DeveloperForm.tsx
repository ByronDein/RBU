import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDevelopers } from '@/hooks/use-developers'
import { developerSchema, type DeveloperFormData } from './developer.schema'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Save } from 'lucide-react'
import axios from 'axios'
import type React from 'react'
import type { Developer } from '@/types/developer.types'

interface DeveloperFormProps {
    mode?: 'create' | 'edit';
    developer?: Developer;
    onSuccess?: () => void;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({ mode, developer, onSuccess }) => {
    const navigate = useNavigate();
    const { createDeveloper, updateDeveloper } = useDevelopers();
    
    const form = useForm<DeveloperFormData>({
        resolver: zodResolver(developerSchema),
        defaultValues: {
            nombre: developer?.nombre || '',
            rut: developer?.rut || '',
            correoElectronico: developer?.correoElectronico || '',
            fechaContratacion: developer?.fechaContratacion?.split('T')[0] || '',
            aniosExperiencia: developer?.aniosExperiencia || 1,
        },
    })

    const onSubmit = async (data: DeveloperFormData) => {
        try {
            // Convertir fecha a formato ISO con tiempo (midnight UTC)
            const fechaConTiempo = new Date(data.fechaContratacion + 'T00:00:00').toISOString();
            
            const cleanData = {
                ...data,
                fechaContratacion: fechaConTiempo,
                aniosExperiencia: Number(data.aniosExperiencia) || 0,
            };

            console.log('Enviando datos:', cleanData); 

            if (mode === 'create') {
                await createDeveloper(cleanData);
            } else {
                await updateDeveloper(developer!.codigoDesarrollador, cleanData);
            }

            onSuccess?.();
            navigate('/developers');
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Mostrar detalles del error para debugging
            if (axios.isAxiosError(error)) {
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
                console.error('Response headers:', error.response?.headers);
                console.error('Request data:', error.config?.data);
            }
        }
    }

    const title = mode === 'create' ? 'Crear Desarrollador' : 'Editar Desarrollador';
    const buttonText = mode === 'create' ? 'Crear' : 'Actualizar';
    const Icon = mode === 'create' ? Save : Edit;
    return (
        <div className='space-y-4'>
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    size="sm"
                    onClick={() => navigate('/developers')}
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
                                        <FormLabel>Nombre Completo</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Ej: Juan Pérez González"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Máximo 200 caracteres
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* RUT */}
                            <FormField
                                control={form.control}
                                name="rut"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RUT</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Ej: 12345678-9"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Formato: 12345678-9 (máximo 10 caracteres)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="correoElectronico"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="email"
                                                placeholder="juan.perez@empresa.com"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Máximo 100 caracteres
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Fecha Contratación */}
                            <FormField
                                control={form.control}
                                name="fechaContratacion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Contratación</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='date' 
                                                className='[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Fecha de ingreso a la empresa
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Años Experiencia */}
                            <FormField
                                control={form.control}
                                name="aniosExperiencia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Años de Experiencia</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='number'
                                                min="1"
                                                max="50"
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === '' || isNaN(Number(value))) {
                                                        field.onChange(1);
                                                    } else {
                                                        const numValue = parseInt(value, 10);
                                                        field.onChange(numValue < 1 ? 1 : numValue);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Mínimo 1 años, máximo 50 años
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

                                    onClick={() => navigate('/developers')}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default DeveloperForm