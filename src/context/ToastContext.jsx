import React, { createContext, useContext, useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { CheckCircleFill, XCircleFill, InfoCircleFill, ExclamationTriangleFill } from "react-bootstrap-icons";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, variant = "info", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, variant, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Override global window.alert
  useEffect(() => {
    const nativeAlert = window.alert;
    
    window.alert = (message) => {
      // Determine type based on common error words
      const lower = String(message || "").toLowerCase();
      let variant = "info";
      if (lower.includes("error") || lower.includes("no encontrado") || lower.includes("falló") || lower.includes("incorrecto") || lower.includes("complete")) {
        variant = "danger";
      } else if (lower.includes("guardado") || lower.includes("exito") || lower.includes("correctamente") || lower.includes("completado")) {
        variant = "success";
      }
      showToast(message, variant);
    };

    return () => {
      window.alert = nativeAlert;
    };
  }, []);

  const getIcon = (variant) => {
    switch (variant) {
      case "success":
        return <CheckCircleFill className="me-3 text-success fs-3" />;
      case "danger":
        return <XCircleFill className="me-3 text-danger fs-3" />;
      case "warning":
        return <ExclamationTriangleFill className="me-3 text-warning fs-3" />;
      default:
        return <InfoCircleFill className="me-3 text-info fs-3" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="top-end"
        className="p-4"
        style={{ zIndex: 9999, position: "fixed" }}
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            onClose={() => removeToast(t.id)}
            delay={t.duration}
            autohide
            className={`border-0 shadow-lg rounded-4 overflow-hidden mb-3 bg-white`}
            style={{
              minWidth: "400px",
              borderLeft: `7px solid var(--bs-${t.variant === "danger" ? "danger" : t.variant === "success" ? "success" : "info"})`,
              animation: "slideIn 0.3s ease-out"
            }}
          >
            <Toast.Body className="d-flex align-items-center py-4 px-3">
              {getIcon(t.variant)}
              <div className="flex-grow-1 text-dark fw-bold" style={{ fontSize: "1.1rem" }}>
                {t.message}
              </div>
              <button
                type="button"
                className="btn-close ms-3"
                onClick={() => removeToast(t.id)}
                aria-label="Close"
              />
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
      
      {/* Keyframe animation in styled block */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
