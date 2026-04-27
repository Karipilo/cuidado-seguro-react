import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/ui/Formulario";
import { usuarios } from "../data/usuario";

const Registro = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nombres: "",
    apellidos: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
    fechaNacimiento: "",
    genero: "",
    telefono: "+569",
    direccion: "",
    tipoUsuario: "PACIENTE",

    rutPaciente: "",

    grupoSanguineo: "",
    factorRh: "",
    alergias: "",
    enfermedadesCronicas: "",
    medicamentosActuales: "",
    contactoEmergencia: "",
    telefonoEmergencia: "+569",
    seguroMedico: "",
    numeroPoliza: "",

    aceptaTerminos: false,

    rutPaciente: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validarPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/;
    return regex.test(password);
  };

  const pacienteAsociado = usuarios.find(
    (u) =>
      u.tipoUsuario === "PACIENTE" &&
      u.numeroDocumento === formData.rutPaciente
  );

  const handleRegistro = (e) => {
    e.preventDefault();

    let camposObligatorios = [
      "username",
      "password",
      "email",
      "nombres",
      "apellidos",
      "numeroDocumento",
      "fechaNacimiento",
      "genero",
      "telefono",
      "direccion"
    ];

    if (formData.tipoUsuario === "PACIENTE") {
      camposObligatorios.push(
        "grupoSanguineo",
        "factorRh",
        "contactoEmergencia",
        "telefonoEmergencia",
        "seguroMedico"
      );
    }

    if (formData.tipoUsuario === "TUTOR") {
      camposObligatorios.push("rutPaciente");
    }

    for (let campo of camposObligatorios) {
      if (!formData[campo] || formData[campo] === "+569") {
        alert("Todos los campos obligatorios deben completarse");
        return;
      }
    }

    if (!validarPassword(formData.password)) {
      alert("La contraseña debe tener mínimo 6 caracteres, una mayúscula, un número y un símbolo");
      return;
    }

    if (formData.tipoUsuario === "TUTOR" && !pacienteAsociado) {
      alert("El RUT del paciente no existe");
      return;
    }

    if (!formData.aceptaTerminos) {
      alert("Debe aceptar los términos y condiciones");
      return;
    }

    const usuarioFinal = {
      ...formData,
      roles: [`ROLE_${formData.tipoUsuario}`],
      versionTerminos: 1,

      pacientesRuts:
        formData.tipoUsuario === "TUTOR"
          ? [formData.rutPaciente]
          : []
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioFinal));

    if (formData.tipoUsuario === "PACIENTE") {
      navigate("/dashboardPaciente");
    } else if (formData.tipoUsuario === "TUTOR") {
      navigate("/dashboardTutor");
    } else {
      navigate("/dashboardProfesional");
    }
  };

  return (
    <Formulario title="Registro" buttonText="Crear cuenta" onSubmit={handleRegistro}>

      <Form.Group className="mb-3">
        <Form.Label>Usuario</Form.Label>
        <Form.Control name="username" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nombres</Form.Label>
        <Form.Control name="nombres" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control name="apellidos" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Correo</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name="password" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Número de documento</Form.Label>
        <Form.Control name="numeroDocumento" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control type="date" name="fechaNacimiento" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Select name="genero" onChange={handleChange}>
          <option value="">Seleccione</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Teléfono</Form.Label>
        <div className="d-flex">
          <span className="form-control" style={{ width: "80px", background: "#eee" }}>+569</span>
          <Form.Control
            type="text"
            placeholder="12345678"
            onChange={(e) =>
              setFormData({
                ...formData,
                telefono: "+569" + e.target.value
              })
            }
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Dirección</Form.Label>
        <Form.Control name="direccion" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tipo de usuario</Form.Label>
        <Form.Select
          name="tipoUsuario"
          value={formData.tipoUsuario}
          onChange={handleChange}
        >
          <option value="PACIENTE">Paciente</option>
          <option value="TUTOR">Tutor</option>
          <option value="PROFESIONAL">Profesional</option>
        </Form.Select>
      </Form.Group>

      {/* TUTOR */}
      {formData.tipoUsuario === "TUTOR" && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>RUT del paciente</Form.Label>
            <Form.Control
              name="rutPaciente"
              onChange={handleChange}
            />
          </Form.Group>
        </>
      )}

      {/* PACIENTE */}
      {formData.tipoUsuario === "PACIENTE" && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Grupo sanguíneo</Form.Label>
            <Form.Select name="grupoSanguineo" onChange={handleChange}>
              <option value="">Seleccione</option>
              <option>O</option>
              <option>A</option>
              <option>B</option>
              <option>AB</option>
              <option>No lo sé</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Factor RH</Form.Label>
            <Form.Select name="factorRh" onChange={handleChange}>
              <option value="">Seleccione</option>
              <option>+</option>
              <option>-</option>
              <option>No lo sé</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Alergias</Form.Label>
            <Form.Control name="alergias" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enfermedades crónicas</Form.Label>
            <Form.Control name="enfermedadesCronicas" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medicamentos actuales</Form.Label>
            <Form.Control name="medicamentosActuales" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contacto de emergencia</Form.Label>
            <Form.Control name="contactoEmergencia" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono de emergencia</Form.Label>
            <Form.Control
              placeholder="+56912345678"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  telefonoEmergencia: e.target.value
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de previsión</Form.Label>
            <Form.Select name="seguroMedico" onChange={handleChange}>
              <option value="">Seleccione</option>
              <option>Fonasa</option>
              <option>Isapre</option>
              <option>Particular</option>
            </Form.Select>
          </Form.Group>
        </>
      )}

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Acepto los términos y condiciones"
          onChange={(e) =>
            setFormData({
              ...formData,
              aceptaTerminos: e.target.checked
            })
          }
        />
      </Form.Group>

    </Formulario>
  );
};

export default Registro;