import { useState } from 'react';
import axios from 'axios';

const Formulario = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    telefono: '',
    correo: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    if (name === 'edad' && value < 0) {
      setErrores((prev) => ({ ...prev, edad: 'La edad no puede ser negativa' }));
      return;
    } else {
      setErrores((prev) => ({ ...prev, edad: null }));
    }

    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const validarFormulario = () => {
    let errores = {};
    if (!datosFormulario.nombre) errores.nombre = 'El nombre es obligatorio';
    if (!datosFormulario.apellido) errores.apellido = 'El apellido es obligatorio';
    if (!datosFormulario.edad) errores.edad = 'La edad es obligatoria';
    if (!datosFormulario.telefono) errores.telefono = 'El teléfono es obligatorio';
    if (!datosFormulario.correo) errores.correo = 'El correo es obligatorio';

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      setMensaje('Por favor completa todos los campos');
      return;
    }

    try {
      const respuesta = await axios.post('http://localhost:5000/api/form', datosFormulario);
      console.log('Formulario enviado con éxito:', respuesta.data);
      setMensaje(respuesta.data.message);
      setDatosFormulario({
        nombre: '',
        apellido: '',
        edad: '',
        telefono: '',
        correo: ''
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setMensaje('Error al enviar el formulario');
    }
  };

  return (
    <div className="form-container">
      <img src="/logo.png" alt="Logo de Wanda's Pet Shop" className="logo" />
      <form onSubmit={manejarEnvio}>
        <div>
          <label>
            Nombre:
            <input type="text" name="nombre" value={datosFormulario.nombre} onChange={manejarCambio} />
            {errores.nombre && <p className="error">{errores.nombre}</p>}
          </label>
        </div>
        <div>
          <label>
            Apellido:
            <input type="text" name="apellido" value={datosFormulario.apellido} onChange={manejarCambio} />
            {errores.apellido && <p className="error">{errores.apellido}</p>}
          </label>
        </div>
        <div>
          <label>
            Edad:
            <input type="number" name="edad" value={datosFormulario.edad} onChange={manejarCambio} />
            {errores.edad && <p className="error">{errores.edad}</p>}
          </label>
        </div>
        <div>
          <label>
            Teléfono:
            <input type="tel" name="telefono" value={datosFormulario.telefono} onChange={manejarCambio} />
            {errores.telefono && <p className="error">{errores.telefono}</p>}
          </label>
        </div>
        <div>
          <label>
            Correo:
            <input type="email" name="correo" value={datosFormulario.correo} onChange={manejarCambio} />
            {errores.correo && <p className="error">{errores.correo}</p>}
          </label>
        </div>
        <button type="submit">Enviar</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
};

export default Formulario;