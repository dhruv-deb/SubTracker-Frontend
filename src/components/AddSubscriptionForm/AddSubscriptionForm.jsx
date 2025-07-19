import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./AddSubscriptionForm.module.scss";

const AddSubscriptionForm = ({ onSuccess }) => {
  const { BASE_URL } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD"); // New state
  const [frequency, setFrequency] = useState("monthly");
  const [category, setCategory] = useState("other"); // New state
  const [paymentMethod, setPaymentMethod] = useState("credit_card"); // New state
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      startDate,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/v1/subscriptions`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add subscription");
      }

      // Reset all form fields
      setName("");
      setPrice("");
      setCurrency("USD");
      setFrequency("monthly");
      setCategory("other");
      setPaymentMethod("credit_card");
      setStartDate("");
      onSuccess();
    } catch (err){
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add New Subscription</h3>
      <input
        type="text"
        placeholder="Name (e.g. Netflix)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className={styles.priceRow}>
        <input
          type="number"
          placeholder="Price"
          className={styles.priceInput}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="entertainment">Entertainment</option>
        <option value="utilities">Utilities</option>
        <option value="food">Food</option>
        <option value="health">Health</option>
        <option value="education">Education</option>
        <option value="other">Other</option>
      </select>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
        <option value="credit_card">Credit Card</option>
        <option value="debit_card">Debit Card</option>
        <option value="paypal">PayPal</option>
        <option value="bank_transfer">Bank Transfer</option>
        <option value="other">Other</option>
      </select>
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Subscription"}
      </button>
    </form>
  );
};

export default AddSubscriptionForm;
