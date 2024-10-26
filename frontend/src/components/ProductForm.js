import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductForm = ({ existingProduct, onProductSaved, onCancel }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass product data to the parent component for saving
    onProductSaved({
      name: product.name,
      description: product.description,
      price: parseFloat(product.price), // Ensure price is a float
      quantity: parseInt(product.quantity, 10), // Ensure quantity is an integer
    });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>{existingProduct ? 'Edit Product' : 'Add Ornament'}</h3>
      <Form.Group controlId="formBasicName">
        <Form.Label>Ornament Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter product name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          placeholder="Enter description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          placeholder="Enter price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {existingProduct ? 'Update' : 'Add'} Product
      </Button>
      <Button variant="secondary" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Cancel
      </Button>
    </Form>
  );
};

export default ProductForm;
