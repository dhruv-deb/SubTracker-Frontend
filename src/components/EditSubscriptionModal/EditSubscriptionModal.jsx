import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./EditSubscriptionModal.module.scss";
import { X } from 'lucide-react';

const EditSubscriptionModal = ({ subscription, onClose, onSuccess }) => {
  const { BASE_URL } = useAuth();
  const [formData, setFormData] = useState({ ...subscription });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  useEffect(() => {
    setFormData({ ...subscription });
  }, [subscription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const payload = {
      name: formData.name,
      price: formData.price,
      currency: formData.currency,
      frequency: formData.frequency,
      category: formData.category,
      paymentMethod: formData.paymentMethod,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/v1/subscriptions/${subscription._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // Send the clean payload
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update subscription");
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        <h2>Edit Subscription</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <div className={styles.priceRow}>
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
            <select name="currency" value={formData.currency} onChange={handleChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
          <select name="frequency" value={formData.frequency} onChange={handleChange} required>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="food">Food</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="other">Other</option>
          </select>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
