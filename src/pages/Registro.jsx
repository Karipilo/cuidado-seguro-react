import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/ui/Formulario";
import { usuarios } from "../data/usuario";
import "../styles/auth.css";

const Registro = () => {

  const navigate = useNavigate();

  // Estado para controlar los pasos
  const [paso, setPaso] = useState(1);

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
    otroGenero: "",
    telefono: "",
    direccion: "",
    tipoUsuario: "",

    rutPaciente: "",

    grupoSanguineo: "",
    factorRh: "",
    alergias: "",
    enfermedadesCronicas: "",
    medicamentosActuales: "",
    contactoEmergencia: "",
    telefonoEmergencia: "",
    seguroMedico: "",
    numeroPoliza: "",
    numeroLicencia: "",
    profesion: "",
    otraProfesion: "",
    especialidad: "",
    subespecialidad: "",
    universidad: "",
    añoGraduacion: "",
    experienciaAños: "",
    institucion: "",
    horasSemanales: "",

    aceptaTerminos: false
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

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const pacienteAsociado = usuarios.find(
    (u) =>
      u.tipoUsuario === "PACIENTE" &&
      u.numeroDocumento === formData.rutPaciente
  );

  const obtenerConsentimiento = () => {

    if (formData.tipoUsuario === "PACIENTE") {
      return `
    De acuerdo con la Ley N° 20.584 y la Ley N° 19.628,
    autorizo el tratamiento y almacenamiento de mis
    datos personales y clínicos para fines médicos,
    asistenciales y de continuidad del cuidado.
    `;
    }

    if (formData.tipoUsuario === "TUTOR") {
      return `
    Declaro actuar como representante autorizado
    del paciente y autorizo el acceso a información
    médica conforme a la Ley N° 20.584 y la normativa
    de protección de datos personales vigente en Chile.
    `;
    }

    if (formData.tipoUsuario === "PROFESIONAL") {
      return `
    Me comprometo a resguardar la confidencialidad
    y el uso responsable de la información clínica
    conforme a la Ley N° 20.584 y las normas éticas
    aplicables al ejercicio profesional en Chile.
    `;
    }

    return "";
  };

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

    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    usuariosGuardados.push(usuarioFinal);

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuariosGuardados)
    );

    if (formData.tipoUsuario === "PACIENTE") {
      navigate("/dashboardPaciente");
    } else if (formData.tipoUsuario === "TUTOR") {
      navigate("/dashboardTutor");
    } else {
      navigate("/dashboardProfesional");
    }



  };

  return (
    <div className="auth-container">

      <Formulario
        title="Registro"
        buttonText=""
        onSubmit={handleRegistro}
      >

        <h5 className="text-center mb-4">
          Paso {paso} de 4
        </h5>

        {/* PASO 1 */}

        {paso === 1 && (
          <>

            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {

                  if (
                    !formData.username ||
                    !formData.email ||
                    !formData.password ||
                    !formData.nombres ||
                    !formData.apellidos
                  ) {
                    alert("Complete todos los campos");
                    return;
                  }
                  if (!validarEmail(formData.email)) {
                    alert("Ingrese un correo válido");
                    return;
                  }

                  if (!validarPassword(formData.password)) {
                    alert("Contraseña inválida");
                    return;
                  }

                  setPaso(2);
                }}
              >
                Siguiente
              </button>

            </div>

          </>
        )}

        {/* PASO 2 */}

        {paso === 2 && (
          <>

            <Form.Group className="mb-3">
              <Form.Label>RUT</Form.Label>
              <Form.Control
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>

              <Form.Select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
              >
                <option value="">
                  Seleccione
                </option>

                <option value="MASCULINO">
                  Masculino
                </option>

                <option value="FEMENINO">
                  Femenino
                </option>

                <option value="PREFIERE_NO_DECIR">
                  Prefiero no decirlo
                </option>

                <option value="OTRO">
                  Otro
                </option>

              </Form.Select>
              {formData.genero === "OTRO" && (

                <Form.Group className="mb-3">

                  <Form.Label>
                    Especifique el género
                  </Form.Label>

                  <Form.Control
                    name="otroGenero"
                    value={formData.otroGenero}
                    onChange={handleChange}
                  />

                </Form.Group>

              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>

              <div className="d-flex">

                <span
                  className="form-control"
                  style={{
                    width: "80px",
                    background: "#eee"
                  }}
                >
                  +569

                </span>

                <Form.Control
                  type="text"
                  placeholder="12345678"
                  value={formData.telefono}
                  maxLength={8}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      telefono: e.target.value.replace(/\D/g, "")
                    })
                  }
                />

              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>

              <Form.Control
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPaso(1)}
              >
                Volver
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {

                  if (
                    !formData.numeroDocumento ||
                    !formData.fechaNacimiento ||
                    !formData.genero ||
                    (
                      formData.genero === "OTRO" &&
                      !formData.otroGenero
                    )||
                    !formData.direccion ||
                      !formData.telefono
                  ) {
                alert("Complete todos los campos");
              return;
                  }

              setPaso(3);
                }}
              >
              Siguiente
            </button>

          </div>

      </>
        )}

      {/* PASO 3 */}

      {paso === 3 && (
        <>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de usuario</Form.Label>

            <Form.Select
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleChange}
            >
              <option value="">
                Seleccione un tipo de usuario
              </option>

              <option value="PACIENTE">
                Paciente
              </option>

              <option value="TUTOR">
                Tutor
              </option>

              <option value="PROFESIONAL">
                Profesional
              </option>

            </Form.Select>
          </Form.Group>

          {/* TUTOR */}

          {formData.tipoUsuario === "TUTOR" && (
            <>

              <Form.Group className="mb-3">
                <Form.Label>
                  RUT del paciente
                </Form.Label>

                <Form.Control
                  name="rutPaciente"
                  value={formData.rutPaciente}
                  onChange={handleChange}
                />
              </Form.Group>

            </>
          )}

          {/* PACIENTE */}

          {formData.tipoUsuario === "PACIENTE" && (
            <>

              <Form.Group className="mb-3">
                <Form.Label>
                  Grupo sanguíneo
                </Form.Label>

                <Form.Select
                  name="grupoSanguineo"
                  onChange={handleChange}
                  value={formData.grupoSanguineo}
                >
                  <option value="">
                    Seleccione
                  </option>

                  <option>O</option>
                  <option>A</option>
                  <option>B</option>
                  <option>AB</option>
                  <option>No lo sé</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Factor RH
                </Form.Label>

                <Form.Select
                  name="factorRh"
                  onChange={handleChange}
                  value={formData.factorRh}
                >
                  <option value="">
                    Seleccione
                  </option>

                  <option>+</option>
                  <option>-</option>
                  <option>No lo sé</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Alergias
                </Form.Label>

                <Form.Control
                  name="alergias"
                  onChange={handleChange}
                  value={formData.alergias}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Enfermedades crónicas
                </Form.Label>

                <Form.Control
                  name="enfermedadesCronicas"
                  onChange={handleChange}
                  value={formData.enfermedadesCronicas}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Medicamentos actuales
                </Form.Label>

                <Form.Control
                  name="medicamentosActuales"
                  onChange={handleChange}
                  value={formData.medicamentosActuales}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Contacto de emergencia
                </Form.Label>

                <Form.Control
                  name="contactoEmergencia"
                  onChange={handleChange}
                  value={formData.contactoEmergencia}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono de Emergencia</Form.Label>

                <div className="d-flex">

                  <span
                    className="form-control"
                    style={{
                      width: "80px",
                      background: "#eee"
                    }}
                  >
                    +569
                  </span>

                  <Form.Control
                    type="text"
                    placeholder="12345678"
                    maxLength={8}
                    value={formData.telefonoEmergencia}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        telefonoEmergencia: e.target.value.replace(/\D/g, "")
                      })
                    }
                  />

                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Tipo de previsión
                </Form.Label>
                <Form.Select
                  name="seguroMedico"
                  onChange={handleChange}
                  value={formData.seguroMedico}
                >
                  <option value="">
                    Seleccione
                  </option>

                  <option>Fonasa</option>
                  <option>Isapre</option>
                  <option>Capredena/Dipreca</option>
                  <option>Particular/Sin Previsión</option>
                </Form.Select>
              </Form.Group>

            </>
          )}

          {/* PROFESIONAL */}

          {formData.tipoUsuario === "PROFESIONAL" && (
            <>

              <Form.Group className="mb-3">
                <Form.Label>
                  Número de licencia
                </Form.Label>

                <Form.Control
                  name="numeroLicencia"
                  value={formData.numeroLicencia}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Profesión
                </Form.Label>

                <Form.Select
                  name="profesion"
                  value={formData.profesion}
                  onChange={handleChange}
                >
                  <option value="">
                    Seleccione
                  </option>

                  <option>Médico</option>
                  <option>Enfermero/a</option>
                  <option>Kinesiólogo/a</option>
                  <option>Nutricionista</option>
                  <option>Psicólogo/a</option>
                  <option>Fonoaudiólogo/a</option>
                  <option>Terapeuta ocupacional</option>
                  <option>TENS</option>
                  <option value="OTRO">
                    Otro
                  </option>
                </Form.Select>
                {formData.profesion === "OTRO" && (

                  <Form.Group className="mb-3 mt_3">

                    <Form.Label>
                      Especifique la profesión
                    </Form.Label>

                    <Form.Control
                      name="otraProfesion"
                      value={formData.otraProfesion}
                      onChange={handleChange}
                    />

                  </Form.Group>

                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Especialidad
                </Form.Label>

                <Form.Control
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Subespecialidad
                </Form.Label>

                <Form.Control
                  name="subespecialidad"
                  value={formData.subespecialidad}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Universidad
                </Form.Label>

                <Form.Control
                  name="universidad"
                  value={formData.universidad}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Año de graduación
                </Form.Label>

                <Form.Select
                  name="añoGraduacion"
                  value={formData.añoGraduacion}
                  onChange={handleChange}
                >
                  <option value="">
                    Seleccione
                  </option>

                  {Array.from({ length: 50 }, (_, i) => {
                    const year = new Date().getFullYear() - i;

                    return (
                      <option key={year}>
                        {year}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Años de experiencia
                </Form.Label>

                <Form.Select
                  name="experienciaAños"
                  value={formData.experienciaAños}
                  onChange={handleChange}
                >
                  <option value="">
                    Seleccione
                  </option>

                  {[...Array(71).keys()].map((n) => (
                    <option key={n}>
                      {n}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Institución
                </Form.Label>

                <Form.Control
                  name="institucion"
                  value={formData.institucion}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Horas semanales
                </Form.Label>

                <Form.Select
                  name="horasSemanales"
                  value={formData.horasSemanales}
                  onChange={handleChange}
                >
                  <option value="">
                    Seleccione
                  </option>

                  {[10, 20, 22, 30, 40, 44, 45].map((h) => (
                    <option key={h}>
                      {h}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

            </>
          )}

          <div className="d-flex justify-content-between mt-4">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setPaso(2)}
            >
              Volver
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {

                if (!formData.tipoUsuario) {
                  alert("Seleccione un tipo de usuario");
                  return;
                }

                if (
                  formData.tipoUsuario === "TUTOR" &&
                  !formData.rutPaciente
                ) {
                  alert("Ingrese el RUT del paciente");
                  return;
                }

                if (
                  formData.tipoUsuario === "PACIENTE" &&
                  (
                    !formData.grupoSanguineo ||
                    !formData.factorRh ||
                    !formData.contactoEmergencia ||
                    !formData.telefonoEmergencia ||
                    !formData.alergias ||
                    !formData.enfermedadesCronicas ||
                    !formData.medicamentosActuales ||
                    !formData.seguroMedico ||
                    !formData.subespecialidad
                  )
                ) {
                  alert("Complete todos los datos del paciente");
                  return;
                }

                if (
                  formData.tipoUsuario === "PROFESIONAL" &&
                  (
                    !formData.numeroLicencia ||
                    !formData.profesion ||
                    (
                      formData.profesion === "OTRO" &&
                      !formData.otraProfesion
                    ) ||
                    !formData.especialidad ||
                    !formData.universidad ||
                    !formData.añoGraduacion ||
                    !formData.experienciaAños ||
                    !formData.institucion ||
                    !formData.horasSemanales
                  )
                ) {
                  alert("Complete todos los datos del profesional");
                  return;
                }

                setPaso(4);
              }}
            >
              Siguiente
            </button>

          </div>

        </>
      )}

      {/* PASO 4 */}

      {paso === 4 && (
        <>
          <div className="consentimiento-box mb-3">

            <h6>
              Consentimiento informado
            </h6>

            <p>
              {obtenerConsentimiento()}
            </p>

          </div>
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

          <div className="d-flex justify-content-between mt-4">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setPaso(3)}
            >
              Volver
            </button>

            <button
              type="submit"
              className="btn btn-success"
            >
              Crear cuenta
            </button>

          </div>

        </>
      )}

    </Formulario>

    </div >
  );
};

export default Registro;