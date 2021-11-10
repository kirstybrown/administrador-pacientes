import React, {useState} from "react";
import uuid from 'react-uuid';
import PropTypes from "prop-types";

const Formulario = ({crearCita}) => {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [ error, actualizarError ] = useState(false);



// Función que se ejecuta cada vez que el usuario escribe en un input
const handleChange = e =>  {
    actualizarCita({
        ...cita,
        [e.target.name]: e.target.value
    })
}

// Extraer los valores
const { mascota, propietario, fecha, hora, sintomas } = cita;

// Cuando el usuario presiona agregar cita
const submitCita = e => {
    e.preventDefault();

    // Validar 
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
       actualizarError(true);
        return;
    }

    // Eliminar el mensaje previo
    actualizarError(false);

    // Asignar un ID
    //cita.id = uuidv4();
    cita.id = uuid();

    // Crear la cita
    crearCita(cita);

    // Reiniciar el form
    actualizarCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })
}


    return (
        <>
            <h2>Crear Cita</h2> 

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />
                <label>Nombre Dueño/a</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño/a de la mascota"
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;