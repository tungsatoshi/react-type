import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Product } from "../interfaces/Product";

type Props = {
  show: boolean;
  closeForm: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formValues: Product;
};

const ProductForm = ({
  show,
  handleInputChange,
  handleSubmit,
  formValues,
  closeForm,
}: Props) => {
  useEffect(() => {}, [show]);

  return (
    <Form onSubmit={handleSubmit}>
      <h2> Product Form</h2>

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          onChange={handleInputChange}
          value={formValues.name}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          onChange={handleInputChange}
          value={formValues.price}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          name="desc"
          onChange={handleInputChange}
          value={formValues.desc}
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button onClick={closeForm} variant="danger">
        Close
      </Button>
    </Form>
  );
};

export default ProductForm;
