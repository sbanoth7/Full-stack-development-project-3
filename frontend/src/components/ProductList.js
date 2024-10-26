import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct, addProduct, updateProduct } from '../api';
import ProductForm from './ProductForm';
import { Button, Card } from 'react-bootstrap';
import '../index.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsEditing(true);
  };

  const handleProductSaved = async (product) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, product);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === selectedProduct.id ? { ...p, ...product } : p))
      );
    } else {
      const newProduct = await addProduct(product);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container">
      <h4>Silver Ornaments List</h4>
      {isEditing ? (
        <ProductForm
          existingProduct={selectedProduct}
          onProductSaved={handleProductSaved}
          onCancel={handleCancel}
        />
      ) : (
        <Button variant="primary" onClick={handleAdd}>
          Add Ornament
        </Button>
      )}
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <Card key={product.id} className="card" style={{ width: '18rem' }}>
              <img src={`/images/products/${product.image}`} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {product.description}
                  <br />
                  <strong>Price:</strong> ${product.price}
                  <br />
                  <strong>Quantity:</strong> {product.quantity}
                </Card.Text>
                <Button variant="info" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default ProductList;

