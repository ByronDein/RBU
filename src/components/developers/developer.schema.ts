import { z } from 'zod';

export const developerSchema = z.object({
    nombre: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(200, 'El nombre no puede exceder 200 caracteres'),
    rut: z.string()
        .min(7, 'RUT inválido')
        .max(10, 'RUT no puede exceder 10 caracteres'),
    correoElectronico: z.string()
        .email('Email inválido')
        .max(100, 'Email no puede exceder 100 caracteres'),
    fechaContratacion: z.string()
        .min(1, 'Fecha de contratación es requerida'),
    aniosExperiencia: z.number()
        .min(1, 'Los años de experiencia no pueden ser negativos ni 0')
        .max(50, 'Años de experiencia no pueden exceder 50')
        .int('Los años de experiencia deben ser un número entero'),
});


export type DeveloperFormData = z.infer<typeof developerSchema>;
