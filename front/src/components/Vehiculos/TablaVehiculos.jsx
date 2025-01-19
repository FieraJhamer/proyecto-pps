import { useEffect, useState } from "react";
import './AgregarVehiculos.css'

export default function ListadoVehiculos() {
    const [lista,setLista]=useState([])

    const TraerRegistros = async ()=>{
        try{
            const response = await fetch('http://localhost:3000/vehiculos')
            if (!response.ok){
                throw new Error('Error al obtener los datos')
            }
            const data = await response.json()
            setLista(data)
        }
        catch (err){
            console.error('Error al obtener los registros:',err)
        }
    }

    useEffect(()=>{
        TraerRegistros()
    },[])

    return (
        <>
        <h1>Vehículos 🚗</h1>
        <div className="Vehiculos-table-container">
        {lista.length>0 ? (
            <table className="Vehiculos-tabla">
            <thead>
                <tr>
                <th>ID Vehiculo</th>
                <th>Matricula</th>
                <th>Estacionado</th>
                </tr>
            </thead>
            <tbody>
                {lista.map((vehiculo)=>(
                    <tr key={vehiculo.id_vehiculo}>
                    <td>{vehiculo.id_vehiculo}</td>
                    <td>{vehiculo.matricula}</td>
                    <td>{vehiculo.estacionado===1 ? 'Si' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        ) : (<p>No hay vehiculos registrados</p>)}
        </div>
        </>
    )

} 