/**
 * Utilidades y datos mock para simular base de datos
 * Proporciona datos de ejemplo para testing y demostración
 */

// Usuarios de ejemplo para testing
export const mockUsers = [
  {
    id: '1',
    nombre: 'Carlos González',
    email: 'carlos.gonzalez@ejemplo.com',
    password: '123456',
    tipoUsuario: 'tutor',
    parentesco: 'padre',
    idPaciente: 'P001',
    codigoCentro: 'CENTRO001',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    nombre: 'María Silva',
    email: 'maria.silva@ejemplo.com',
    password: '123456',
    tipoUsuario: 'tutor',
    parentesco: 'madre',
    idPaciente: 'P002',
    codigoCentro: 'CENTRO001',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    nombre: 'Carla Rodríguez',
    email: 'carla.rodriguez@ejemplo.com',
    password: '123456',
    tipoUsuario: 'profesional',
    tipoProfesional: 'medico',
    institucion: 'Hospital del Niño',
    rnpi: 'RNPI123456',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    nombre: 'Pedro Martínez',
    email: 'pedro.martinez@ejemplo.com',
    password: '123456',
    tipoUsuario: 'profesional',
    tipoProfesional: 'medico',
    institucion: 'Clínica San José',
    rnpi: 'RNPI789012',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    nombre: 'Ana María González',
    email: 'ana.gonzalez@ejemplo.com',
    password: '123456',
    tipoUsuario: 'paciente',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Pacientes de ejemplo
export const mockPatients = [
  {
    id: 'P001',
    rut: '12.345.678-9',
    nombre: 'Ana María González',
    edad: 8,
    fechaNacimiento: '2015-09-15',
    diagnostico: 'Trastorno del Espectro Autista - Nivel 2',
    fechaDiagnostico: '2022-03-15',
    medicoTratante: 'Dra. Carla Rodríguez',
    especialidad: 'Neurología Infantil',
    telefono: '+56 9 8765 4321',
    email: 'ana.gonzalez@ejemplo.com',
    direccion: 'Calle Principal 123, Santiago',
    tutor: 'Carlos González',
    parentesco: 'Padre',
    telefonoTutor: '+56 9 1234 5678',
    emailTutor: 'carlos.gonzalez@ejemplo.com',
    medicamentos: [
      {
        nombre: 'Risperidona',
        dosis: '0.5 mg',
        frecuencia: 'Cada 12 horas',
        via: 'Oral',
        inicio: '2022-04-01'
      },
      {
        nombre: 'Melatonina',
        dosis: '3 mg',
        frecuencia: 'Antes de dormir',
        via: 'Oral',
        inicio: '2022-05-15'
      }
    ],
    controles: [
      {
        tipo: 'Evaluación Neurológica',
        fecha: '2024-01-15',
        profesional: 'Dra. Carla Rodríguez',
        estado: 'Completado',
        observaciones: 'Buena respuesta al tratamiento'
      },
      {
        tipo: 'Terapia Ocupacional',
        fecha: '2024-02-20',
        profesional: 'Lic. María López',
        estado: 'Pendiente',
        observaciones: 'Evaluación de habilidades motoras finas'
      }
    ]
  },
  {
    id: 'P002',
    rut: '9.876.543-2',
    nombre: 'Diego Andrés Silva',
    edad: 12,
    fechaNacimiento: '2011-06-20',
    diagnostico: 'Trastorno por Déficit de Atención e Hiperactividad',
    fechaDiagnostico: '2021-08-10',
    medicoTratante: 'Dr. Pedro Martínez',
    especialidad: 'Psiquiatría Infantil',
    telefono: '+56 9 2345 6789',
    email: 'diego.silva@ejemplo.com',
    direccion: 'Avenida Secundaria 456, Santiago',
    tutor: 'María Silva',
    parentesco: 'Madre',
    telefonoTutor: '+56 9 3456 7890',
    emailTutor: 'maria.silva@ejemplo.com',
    medicamentos: [
      {
        nombre: 'Metilfenidato',
        dosis: '10 mg',
        frecuencia: 'Cada 8 horas',
        via: 'Oral',
        inicio: '2021-09-01'
      }
    ],
    controles: [
      {
        tipo: 'Control Psiquiátrico',
        fecha: '2024-01-20',
        profesional: 'Dr. Pedro Martínez',
        estado: 'Programado',
        observaciones: 'Control de medicación'
      }
    ]
  },
  {
    id: 'P003',
    rut: '11.223.344-5',
    nombre: 'Valentina Sofía Reyes',
    edad: 6,
    fechaNacimiento: '2017-11-30',
    diagnostico: 'Trastorno del Lenguaje Expresivo',
    fechaDiagnostico: '2023-02-15',
    medicoTratante: 'Dra. Carla Rodríguez',
    especialidad: 'Neurología Infantil',
    telefono: '+56 9 4567 8901',
    email: 'valentina.reyes@ejemplo.com',
    direccion: 'Calle Terciaria 789, Santiago',
    tutor: 'Patricia Reyes',
    parentesco: 'Madre',
    telefonoTutor: '+56 9 5678 9012',
    emailTutor: 'patricia.reyes@ejemplo.com',
    medicamentos: [],
    controles: [
      {
        tipo: 'Evaluación del Lenguaje',
        fecha: '2024-02-10',
        profesional: 'Lic. Ana González',
        estado: 'Programado',
        observaciones: 'Evaluación trimestral'
      }
    ]
  }
];

// Notas clínicas de ejemplo
export const mockClinicalNotes = [
  {
    id: 1,
    pacienteId: 'P001',
    tipoNota: 'evolucion',
    contenido: 'Paciente presenta mejoría en la interacción social. Responde mejor a estímulos verbales y mantiene contacto visual por períodos más largos.',
    indicaciones: 'Continuar con terapia ocupacional semanal. Mantener dosis actual de medicación.',
    profesional: 'Dra. Carla Rodríguez',
    fecha: '2024-01-15T10:30:00'
  },
  {
    id: 2,
    pacienteId: 'P001',
    tipoNota: 'consulta',
    contenido: 'Tutor reporta dificultad en el sueño. Paciente presenta irritabilidad durante la tarde.',
    indicaciones: 'Evaluar ajuste de melatonina. Recomendar rutina de sueño estructurada.',
    profesional: 'Dra. Carla Rodríguez',
    fecha: '2024-01-10T14:20:00'
  },
  {
    id: 3,
    pacienteId: 'P002',
    tipoNota: 'evolucion',
    contenido: 'Paciente muestra mejor concentración en actividades escolares. Disminución de conductas impulsivas.',
    indicaciones: 'Mantener dosis actual. Continuar monitoreo académico.',
    profesional: 'Dr. Pedro Martínez',
    fecha: '2024-01-12T09:15:00'
  }
];

// Mensajes de ejemplo
export const mockMessages = [
  {
    id: 1,
    userId: '1',
    asunto: 'Consulta sobre medicación',
    contenido: 'Quisiera saber si es normal que mi hijo presente somnolencia después de tomar la risperidona.',
    destinatario: 'centro',
    fecha: '2024-01-10T10:30:00',
    estado: 'respondido',
    respuesta: 'Es un efecto secundario común. Consultar con el médico si persiste.'
  },
  {
    id: 2,
    userId: '1',
    asunto: 'Cambio de terapia',
    contenido: 'Nos mudamos a otra comuna, ¿podemos continuar la terapia ocupacional en el nuevo centro?',
    destinatario: 'centro',
    fecha: '2024-01-15T14:20:00',
    estado: 'pendiente'
  }
];

/**
 * Inicializa datos mock en localStorage si no existen
 */
export const initializeMockData = () => {
  // Inicializar usuarios si no existen
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }

  // Inicializar pacientes si no existen
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(mockPatients));
  }

  // Inicializar notas clínicas si no existen
  if (!localStorage.getItem('clinical_notes')) {
    localStorage.setItem('clinical_notes', JSON.stringify(mockClinicalNotes));
  }

  // Inicializar mensajes si no existen
  if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify(mockMessages));
  }
};

/**
 * Obtiene usuarios desde localStorage
 */
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

/**
 * Guarda usuarios en localStorage
 */
export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

/**
 * Obtiene pacientes desde localStorage
 */
export const getPatients = () => {
  const patients = localStorage.getItem('patients');
  return patients ? JSON.parse(patients) : [];
};

/**
 * Obtiene un paciente por su ID
 */
export const getPatientById = (id) => {
  const patients = getPatients();
  return patients.find(patient => patient.id === id);
};

/**
 * Obtiene un paciente por su RUT
 */
export const getPatientByRut = (rut) => {
  const patients = getPatients();
  // Limpiar RUT para comparación
  const cleanRut = rut.replace(/[^\dKk]/g, '');
  return patients.find(patient => {
    const cleanPatientRut = patient.rut.replace(/[^\dKk]/g, '');
    return cleanPatientRut === cleanRut;
  });
};
