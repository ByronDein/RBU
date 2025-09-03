import { developerService } from "@/services/developer.service"
import type { Developer } from "@/types/developer.types";
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


const DeveloperList = () => {
    const [developer, setDeveloper] = useState<Developer[]>([])
    const fetchDevelopers = async () => {
        const data = await developerService.getAllDevelopers();
        setDeveloper(data);
    }
    useEffect(() => {
        fetchDevelopers();

    }, [])

    console.log(developer);

    return (
        <div className="w-full max-w-7xl">
            <h1>Lista de desarrolladores</h1>
            <Table className="max-w-[500px]">
                <TableCaption>Desarrolladores</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nombre Completo</TableHead>
                        <TableHead>Rut</TableHead>
                        <TableHead>Coreo Electrónico</TableHead>
                        <TableHead >Feca de contratación</TableHead>
                        <TableHead>Años de experiencia</TableHead>
                        <TableHead>Cantidad de proyectos asignados</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {developer ? (
                        developer.map((dev) => (
                            <TableRow key={dev.codigoDesarrollador}>

                                <TableCell>{dev.nombre}</TableCell>
                                <TableCell>{dev.correoElectronico}</TableCell>
                                <TableCell>{dev.rut}</TableCell>
                                <TableCell>{dev.aniosExperiencia}</TableCell>
                                <TableCell>{dev.fechaContratacion}</TableCell>
                                <TableCell> {dev.proyectosAsignados ? dev.proyectosAsignados.length : 0} </TableCell>
                                <TableCell>{dev.registroActivo ? 'Activo' : 'Inactivo'}</TableCell>
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

export default DeveloperList