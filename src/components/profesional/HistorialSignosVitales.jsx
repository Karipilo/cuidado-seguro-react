import React from "react";

import { Card, Table, Badge } from "react-bootstrap";

const HistorialSignosVitales = ({ paciente, profesional }) => {
  const obtenerGrupoEtario = (edad) => {
    if (edad < 1) {
      return "recienNacido";
    }

    if (edad < 2) {
      return "lactante";
    }

    if (edad < 6) {
      return "preescolar";
    }

    if (edad < 12) {
      return "escolar";
    }

    if (edad < 18) {
      return "adolescente";
    }

    if (edad < 65) {
      return "adulto";
    }

    return "adultoMayor";
  };

  const grupoEtario = obtenerGrupoEtario(paciente?.edad || 0);

  const registros = [...(paciente?.signosVitales || [])].reverse();

  return (
    <Card className="dashboard-modern-card mt-4">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Historial Signos Vitales
        </Card.Title>
        <p className="text-muted mb-3">
          Grupo etario detectado:
          <strong> {grupoEtario}</strong>
        </p>

        {registros.length > 0 ? (
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Fecha</th>

                <th>Hora</th>

                <th>Presión</th>

                <th>Frecuencia Cardíaca</th>

                <th>Temperatura</th>

                <th>Saturación</th>

                <th>Observaciones</th>
              </tr>
            </thead>

            <tbody>
              {registros.map((registro, index) => {
                const [fecha, horaCompleta] = (registro.fecha || "").split(",");

                const hora = horaCompleta?.trim() || "--";

                const observaciones = [];

                /* =====================
                         SATURACIÓN
                      ===================== */

                if (registro.saturacion < 90) {
                  observaciones.push({
                    texto: "Saturación crítica",
                    color: "danger",
                  });
                } else if (registro.saturacion < 94) {
                  observaciones.push({
                    texto: "Saturación baja",
                    color: "warning",
                  });
                }

                /* =====================
                         TEMPERATURA
                      ===================== */

                if (registro.temperatura < 35) {
                  observaciones.push({
                    texto: "Hipotermia",
                    color: "primary",
                  });
                } else if (registro.temperatura < 36) {
                  observaciones.push({
                    texto: "Temperatura baja",
                    color: "info",
                  });
                } else if (registro.temperatura >= 38.5) {
                  observaciones.push({
                    texto: "Fiebre",
                    color: "danger",
                  });
                } else if (registro.temperatura >= 37.6) {
                  observaciones.push({
                    texto: "Febrícula",
                    color: "warning",
                  });
                }

                /* =====================
                         FRECUENCIA CARDÍACA
                      ===================== */

                const frecuencia = Number(registro.frecuencia);

                switch (grupoEtario) {
                  case "recienNacido":
                    if (frecuencia < 100) {
                      observaciones.push({
                        texto: "FC baja",
                        color: "primary",
                      });
                    } else if (frecuencia > 180) {
                      observaciones.push({
                        texto: "FC elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "lactante":
                    if (frecuencia < 100) {
                      observaciones.push({
                        texto: "FC baja",
                        color: "primary",
                      });
                    } else if (frecuencia > 160) {
                      observaciones.push({
                        texto: "FC elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "preescolar":
                    if (frecuencia < 80) {
                      observaciones.push({
                        texto: "FC baja",
                        color: "primary",
                      });
                    } else if (frecuencia > 120) {
                      observaciones.push({
                        texto: "FC elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "escolar":
                    if (frecuencia < 70) {
                      observaciones.push({
                        texto: "FC baja",
                        color: "primary",
                      });
                    } else if (frecuencia > 110) {
                      observaciones.push({
                        texto: "FC elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "adolescente":
                    if (frecuencia < 60) {
                      observaciones.push({
                        texto: "FC baja",
                        color: "primary",
                      });
                    } else if (frecuencia > 105) {
                      observaciones.push({
                        texto: "FC elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "adulto":

                  case "adultoMayor":
                    if (frecuencia < 60) {
                      observaciones.push({
                        texto: "FC baja",
                        color: "primary",
                      });
                    } else if (frecuencia > 100) {
                      observaciones.push({
                        texto: "FC elevada",
                        color: "warning",
                      });
                    }

                    break;

                  default:
                    break;
                }

                /* =====================
                         PRESIÓN ARTERIAL
                      ===================== */

                const presionTexto = registro.presion || "";

                const valoresPresion = presionTexto.match(/\d+/g);

                const sistolica = valoresPresion
                  ? Number(valoresPresion[0])
                  : 0;

                const diastolica = valoresPresion
                  ? Number(valoresPresion[1])
                  : 0;

                switch (grupoEtario) {
                  case "recienNacido":
                    if (sistolica < 60 || diastolica < 20) {
                      observaciones.push({
                        texto: "Hipotensión",
                        color: "primary",
                      });
                    } else if (sistolica > 90 || diastolica > 60) {
                      observaciones.push({
                        texto: "Presión elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "lactante":
                    if (sistolica < 70 || diastolica < 50) {
                      observaciones.push({
                        texto: "Hipotensión",
                        color: "primary",
                      });
                    } else if (sistolica > 100 || diastolica > 65) {
                      observaciones.push({
                        texto: "Presión elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "preescolar":
                    if (sistolica < 80 || diastolica < 50) {
                      observaciones.push({
                        texto: "Hipotensión",
                        color: "primary",
                      });
                    } else if (sistolica > 110 || diastolica > 80) {
                      observaciones.push({
                        texto: "Presión elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "escolar":
                    if (sistolica < 85 || diastolica < 55) {
                      observaciones.push({
                        texto: "Hipotensión",
                        color: "primary",
                      });
                    } else if (sistolica > 120 || diastolica > 80) {
                      observaciones.push({
                        texto: "Presión elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "adolescente":
                    if (sistolica < 90 || diastolica < 60) {
                      observaciones.push({
                        texto: "Hipotensión",
                        color: "primary",
                      });
                    } else if (sistolica > 120 || diastolica > 80) {
                      observaciones.push({
                        texto: "Presión elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "adulto":
                    if (sistolica < 90 || diastolica < 60) {
                      if (sistolica < 90 && diastolica < 60) {
                        observaciones.push({
                          texto: "Hipotensión sistólica y diastólica",
                          color: "primary",
                        });
                      } else if (sistolica < 90) {
                        observaciones.push({
                          texto: "Hipotensión sistólica",
                          color: "primary",
                        });
                      } else if (diastolica < 60) {
                        observaciones.push({
                          texto: "Hipotensión diastólica",
                          color: "primary",
                        });
                      }
                    } else if (sistolica >= 140 || diastolica >= 90) {
                      if (sistolica >= 140 && diastolica >= 90) {
                        observaciones.push({
                          texto: "Hipertensión sistólica y diastólica",
                          color: "danger",
                        });
                      } else if (sistolica >= 140) {
                        observaciones.push({
                          texto: "Hipertensión sistólica",
                          color: "danger",
                        });
                      } else if (diastolica >= 90) {
                        observaciones.push({
                          texto: "Hipertensión diastólica",
                          color: "danger",
                        });
                      }
                    } else if (sistolica >= 121 || diastolica >= 81) {
                      observaciones.push({
                        texto: "Presión elevada",
                        color: "warning",
                      });
                    }

                    break;

                  case "adultoMayor":
                    if (sistolica < 90 || diastolica < 60) {
                      if (sistolica < 90 && diastolica < 60) {
                        observaciones.push({
                          texto: "Hipotensión sistólica y diastólica",
                          color: "primary",
                        });
                      } else if (sistolica < 90) {
                        observaciones.push({
                          texto: "Hipotensión sistólica",
                          color: "primary",
                        });
                      } else if (diastolica < 60) {
                        observaciones.push({
                          texto: "Hipotensión diastólica",
                          color: "primary",
                        });
                      }
                    } else if (sistolica >= 150 || diastolica >= 90) {
                      if (sistolica >= 150 && diastolica >= 90) {
                        observaciones.push({
                          texto: "Hipertensión sistólica y diastólica",
                          color: "danger",
                        });
                      } else if (sistolica >= 150) {
                        observaciones.push({
                          texto: "Hipertensión sistólica",
                          color: "danger",
                        });
                      } else if (diastolica >= 90) {
                        observaciones.push({
                          texto: "Hipertensión diastólica",
                          color: "danger",
                        });
                      }
                    } else if (sistolica >= 131 || diastolica >= 86) {
                      observaciones.push({
                        texto: "Presión elevada",
                        color: "warning",
                      });
                    }

                    break;

                  default:
                    break;
                }

                return (
                  <tr key={index}>
                    <td>{fecha}</td>

                    <td>{hora}</td>

                    <td>{registro.presion}</td>

                    <td>{registro.frecuencia} lpm</td>

                    <td>{registro.temperatura} °C</td>

                    <td>{registro.saturacion} %</td>

                    <td>
                      {observaciones.length > 0 ? (
                        observaciones.map((obs, i) => (
                          <Badge key={i} bg={obs.color} className="me-1">
                            {obs.texto}
                          </Badge>
                        ))
                      ) : (
                        <Badge bg="success">Normal</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted mb-0">
            No existen registros de signos vitales.
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default HistorialSignosVitales;
