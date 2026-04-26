import { Form, Button, Container, Card } from "react-bootstrap";

const Formulario = ({ title, children, buttonText, onSubmit }) => {

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px", padding: "20px" }}>

        <h3 className="mb-3">{title}</h3>

        {/* formulario correcto */}
        <Form onSubmit={onSubmit}>
          {children}

          <Button type="submit" className="w-100 mt-3">
            {buttonText}
          </Button>
        </Form>

      </Card>
    </Container>
  );
};

export default Formulario;