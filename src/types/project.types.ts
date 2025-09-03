export interface Project {
    codigoProyecto: number;
    nombre: string;
    fechaInicio: string;
    fechaTermino: string;
    registroActivo: boolean;
}

export interface CreateProjectRequest {
    nombre: string;      // máximo 50 caracteres
    fechaInicio: string; // formato: YYYY-MM-DDTHH:mm:ss
    fechaTermino: string; // formato: YYYY-MM-DDTHH:mm:ss
}

export interface UpdateProjectRequest {
    nombre: string;      // máximo 50 caracteres
    fechaInicio: string; // formato: YYYY-MM-DDTHH:mm:ss
    fechaTermino: string; // formato: YYYY-MM-DDTHH:mm:ss
}