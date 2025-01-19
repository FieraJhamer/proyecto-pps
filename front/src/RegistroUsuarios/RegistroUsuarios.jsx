import { useAuth } from "../Auth";
import { useEffect, useState } from "react";
import "./RegistroUsuarios.css";

const RegistroUsuarios = () => {

    const { sesion } = useAuth();
    const [registro, setRegistro] = useState({
        nombre:"",
        apellido:"",
        email:"",
        telefono:"",
        password:"",
        superusuario:0
    });
    const [mensaje, setMensaje] = useState("")
    const [modoEdicion, setModoEdicion] = useState(false)
    const [usuarios, setUsuarios] = useState([])
    const [modoModificacion, setModoModificacion] = useState(false)
    const [usuarioAModificar, setUsuarioAModificar] = useState({})


  
    useEffect(() => {
      traerUsuarios();
    },[]);

    const obtenerUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3000/usuarios", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sesion.token}`
          },
        });
  
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
  
        const data = await response.json();
        setUsuarios(data); 
      } catch (error) {
        console.error(error);
      }
    };

    const eliminarUsuario = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sesion.token}`
          },
        });
  
        if (!response.ok) {
          throw new Error("Error al eliminar el usuario");
        }
  
        const data = await response.json();
        console.log(data); 
      } catch (error) {
        console.error(error);
      }
    };


    const traerUsuarios = async ()=>{
      await obtenerUsuarios()
    }

    const handleEliminarUsuario = async (id)=>{
      if(modoModificacion){
        alert("No se puede eliminar un usuario mientras se esta modificando.")
        return
      }
      if (id == sesion.id) {
        alert("No se puede eliminar al usuario porque esta en sesion")
        return
      }

      const confirmacion = window.confirm("¿Esta seguro de eliminar el usuario?")
      if (confirmacion){
        await eliminarUsuario(id)
        traerUsuarios()
      }
    }

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

  const validarNumeroDeTelefono = (numero) =>  numero.length == 10

    const validarPassword = (password) => {
        const tieneMinuscula = /[a-z]/.test(password);
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneNumero = /\d/.test(password);
        const longitudSuficiente = password.length >= 8
        return tieneMinuscula && tieneMayuscula && tieneNumero && longitudSuficiente;
    }; 

    const formatearNombreYApellido = (nombre, apellido) => {
        const formatear = (palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
        return [formatear(nombre), formatear(apellido)];
    };
     
    const onSubmit = async (e)=>{
        e.preventDefault()

        if (!validarPassword(registro.password)) {
            setMensaje("El password debe contener al menos 1 mayuscula, 1 minuscula, un numero y una longitud de 8 caracteres como minimo.")
            return
        }

        if (!validarEmail(registro.email)) {
            setMensaje("Debes ingresar un correo electronico valido.");
            return;
        }

        if (!validarNumeroDeTelefono(registro.telefono)) {
            setMensaje("Debes ingresar un numero de telefono valido.");
            return;   
        }

        const[nombreFormateado, apellidoFormateado] = formatearNombreYApellido(registro.nombre,registro.apellido)
        const registroFormateado = {...registro, nombre:nombreFormateado, apellido:apellidoFormateado}
        
        
        try {
            const response = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${sesion.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registroFormateado),
            });
    
            if (response.ok) {
                setMensaje("Usuario registrado."); 
                setRegistro({ 
                    nombre: "",
                    apellido: "",
                    email: "",
                    telefono: 0,
                    password: "",
                    superusuario: 0,
                });
                traerUsuarios()
            } else {
                const errorData = await response.json();
                setMensaje(`Error: ${errorData.message || "No se pudo registrar el usuario."}`);
            }
        } catch (error) {
            console.error(error);
            setMensaje("Error de red. Intenta nuevamente.");
        }

    }

    const onSubmitModificacion = async (e, usuario)=>{
      e.preventDefault()
      if (usuario.id_usuario == sesion.id) {
        setMensaje("No se puede modificar el usuario que esta usando el sistema.")
        return
      }
      
      const[nombreFormateado, apellidoFormateado] = formatearNombreYApellido(usuario.nombre,usuario.apellido)
      const registroFormateado = {...usuario, nombre:nombreFormateado, apellido:apellidoFormateado}

      try {
        const response = await fetch(`http://localhost:3000/usuarios/${usuario.id_usuario}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${sesion.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registroFormateado),
        });

        if (response.ok) {
            setMensaje("Usuario Modificado."); 
            traerUsuarios()
        } else {
            const errorData = await response.json();
            setMensaje(`Error: ${errorData.message || "No se pudo modificar el usuario."}`);
        }
    } catch (error) {
        console.error(error);
        setMensaje("Error de red. Intenta nuevamente.");
    }


  }

    return (
        <>
          {sesion.superusuario === 1 && !modoEdicion && (
            <>
              <form onSubmit={onSubmit} className="registro-usuarios">
                <div className="inputs-nombre">
                  <input
                    value={registro.nombre}
                    onChange={(e) =>
                      setRegistro({ ...registro, nombre: e.target.value })
                    }
                    name="nombre"
                    type="text"
                    required
                    placeholder="Nombre"
                  />
    
                  <input
                    value={registro.apellido}
                    onChange={(e) =>
                      setRegistro({ ...registro, apellido: e.target.value })
                    }
                    name="apellido"
                    type="text"
                    required
                    placeholder="Apellido"
                  />
                </div>
    
                <input
                  value={registro.email}
                  onChange={(e) =>
                    setRegistro({ ...registro, email: e.target.value })
                  }
                  name="email"
                  type="email"
                  required
                  placeholder="Correo electrónico"
                />
    
                <input
                  value={registro.telefono}
                  onChange={(e) =>
                    setRegistro({ ...registro, telefono: e.target.value })
                  }
                  name="telefono"
                  type="number"
                  min={0}
                  required
                  placeholder="Número de teléfono"
                />
    
                <input
                  value={registro.password}
                  onChange={(e) =>
                    setRegistro({ ...registro, password: e.target.value })
                  }
                  name="password"
                  type="password"
                  required
                  placeholder="Contraseña"
                />
    
                <label htmlFor="superusuario">Superusuario:</label>
                <input
                  value={registro.password}
                  onChange={(e) =>
                    setRegistro({
                      ...registro,
                      superusuario: e.target.checked ? parseInt(1) : parseInt(0),
                    })
                  }
                  name="superusuario"
                  type="checkbox"
                />
                <div className="button-container">
                  <button type="submit">Registrar usuario</button>
                  <button type="button" onClick={()=> setModoEdicion(true)} >Ver usuarios</button>
                </div>
              </form>
              <p>{mensaje}</p>
            </>
          )}
          {sesion.superusuario != 1 && (
            <h2>Debe ser superusario para poder registrar otros usuarios</h2>
          )}
          {sesion.superusuario == 1 && modoEdicion &&  (
            <>
            <h1>Usuarios</h1>
            <div className="lista-usuarios">
            <ul>
                {usuarios.map((usuario, i) => (
                  <li key={i}>
                    {usuario.nombre} {usuario.apellido} - {usuario.email} -{usuario.superusuario == 1 ? "Es superusuario" : "Usuario comun"} - id: {usuario.id_usuario}
                    <div>
                      <button  style={{color:"red"}} onClick={()=>{handleEliminarUsuario(usuario.id_usuario)}}>Eliminar</button>
                      <button onClick={()=> {
                        setModoModificacion(true);
                        setUsuarioAModificar(usuario)
                      }}>Modificar</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="btn-volver-container">
                <button  onClick={()=>setModoEdicion(false)}>Volver al registro</button>
              </div>
            </div>
            </>
          )}
          {sesion.superusuario == 1 && modoModificacion && (
            <>
            <form onSubmit={onSubmitModificacion}>
              <label htmlFor="nombre">Nombre:</label>
              <input
              value={usuarioAModificar.nombre}
              onChange={(e) =>
                setUsuarioAModificar({ ...usuarioAModificar, nombre: e.target.value })
              }
              name="nombre"
              type="text"
              required
            />
              <label htmlFor="apellido">Apellido:</label>
              <input
              value={usuarioAModificar.apellido}
              onChange={(e) =>
                setUsuarioAModificar({ ...usuarioAModificar, apellido: e.target.value })
              }
              name="apellido"
              type="text"
              required
            />
            <label htmlFor="superusuario">Superusuario:</label>
            <input
              checked={usuarioAModificar.superusuario == 1 ? true : false}
              onChange={(e) =>
                setUsuarioAModificar({
                    ...usuarioAModificar,
                      superusuario: e.target.checked ? parseInt(1) : parseInt(0),
                    })
                  }
                  name="superusuario"
                  type="checkbox"
            />
            <button onClick={(e)=> onSubmitModificacion(e,usuarioAModificar)}>Listo</button>
            <button type="button" onClick={()=>{
              setModoModificacion(false);
              setMensaje("")
              }
              }>Cancelar</button>
            </form>
            <p style={{color: mensaje == "Usuario Modificado." ? "green" : "red" }}>{mensaje}</p>
            </>
          )}
        </>
      );
    }; 

export default RegistroUsuarios;
