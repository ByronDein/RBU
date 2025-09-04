import { z } from "zod";

export const projectSchema = z.object({
    nombre: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres'),
    fechaInicio: z.string()
        .min(1, 'Fecha de inicio es requerida'),
    fechaTermino: z.string()
        .min(1, 'Fecha de término es requerida'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
