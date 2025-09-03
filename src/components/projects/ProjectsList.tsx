import { projectService } from "@/services/project.service"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import type { Project } from "@/types/project.types";


const ProjectList = () => {
    const [project, setProject] = useState<Project[]>([])
    const fetchDevelopers = async () => {
        const data = await projectService.getAllProjects();
        setProject(data);
    }
    useEffect(() => {
        fetchDevelopers();

    }, [])

    console.log(project);

    return (
        <div>
            <h1>Lista de proyectos</h1>
            <Table className="max-w-[500px]">
                <TableCaption>Proyectos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nombre </TableHead>
                        <TableHead>Fecha de inicio</TableHead>
                        <TableHead>Fecha de termino</TableHead>
                        <TableHead >Cantidad de desarrolladores</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Cantidad de desarrolladores asignados</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {project ? (
                        project.map((proj) => (
                            <TableRow key={proj.codigoProyecto}>
                                <TableCell>{proj.nombre}</TableCell>
                                <TableCell>{proj.fechaInicio}</TableCell>
                                <TableCell>{proj.fechaTermino}</TableCell>
                                <TableCell>{proj.cantidadDesarrolladores ? proj.cantidadDesarrolladores.length: 0 }</TableCell>
                                <TableCell>{proj.estado}</TableCell>
                                <TableCell className="text-right">Editar | Eliminar | Asignar Proyecto</TableCell>

                            </TableRow>
                        ))
                    ) : (
                        <p>No se encontraron datos.</p>
                    )}
                </TableBody>
                {/* <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody> */}
            </Table>
        </div>
    )
}

export default ProjectList