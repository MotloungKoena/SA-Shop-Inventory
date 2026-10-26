import { useState, useEffect } from 'react';
import './Dashboard.css';  

interface Product {
  id: number;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
}

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    costPrice: '',
    sellingPrice: '',
    stockQuantity: ''
  });

  // Fetch products when page loads
  useEffect(() => {
    fetch('http://localhost:5142/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5142/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          costPrice: parseFloat(formData.costPrice),
          sellingPrice: parseFloat(formData.sellingPrice),
          stockQuantity: parseInt(formData.stockQuantity)
        })
      });
      
      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]); // Add to UI instantly
        setFormData({ name: '', category: '', costPrice: '', sellingPrice: '', stockQuantity: '' }); // Clear form
      }
    } catch (error) {
      alert("Error saving product");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Inventory Management</h1>
      
      {/* ADD PRODUCT FORM */}
      <div className="widget-card" style={{ marginBottom: '2rem' }}>
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ padding: '0.5rem' }}/>
          <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '0.5rem' }}/>
          <input type="number" placeholder="Cost Price" value={formData.costPrice} onChange={e => setFormData({...formData, costPrice: e.target.value})} required style={{ padding: '0.5rem' }}/>
          <input type="number" placeholder="Selling Price" value={formData.sellingPrice} onChange={e => setFormData({...formData, sellingPrice: e.target.value})} required style={{ padding: '0.5rem' }}/>
          <input type="number" placeholder="Stock Qty" value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: e.target.value})} required style={{ padding: '0.5rem' }}/>
          <button type="submit" className="primary-btn" style={{ margin: 0 }}>Save Product</button>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div className="widget-card">
        <h3>Product List</h3>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '0.5rem' }}>Name</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center' }}>No products added yet.</td></tr>
            ) : (
              products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td>R {p.costPrice}</td>
                  <td>R {p.sellingPrice}</td>
                  <td style={{ color: p.stockQuantity < 5 ? 'red' : 'inherit' }}>{p.stockQuantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}