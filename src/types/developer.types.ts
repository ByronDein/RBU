export interface Developer {
    codigoDesarrollador: number;
    nombre: string;
    rut: string;
    correoElectronico: string;
    fechaContratacion: string;
    aniosExperiencia: number;
    registroActivo: boolean;
}

export interface CreateDeveloperRequest {
    nombre: string;           // máximo 200 caracteres
    rut: string;              // máximo 10 caracteres
    correoElectronico: string; // máximo 100 caracteres
    fechaContratacion: string; // formato: YYYY-MM-DDTHH:mm:ss
    aniosExperiencia: number;  // mínimo 0
}

export interface UpdateDeveloperRequest {
    nombre: string;           // máximo 200 caracteres
    rut: string;              // máximo 10 caracteres
    correoElectronico: string; // máximo 100 caracteres
    fechaContratacion: string; // formato: YYYY-MM-DDTHH:mm:ss
    aniosExperiencia: number;  // mínimo 0
}