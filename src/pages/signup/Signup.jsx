import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import styles from "./Signup.module.scss";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { BASE_URL } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Creating account...');

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/sign-up`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      toast.success('Account created! Please log in.', { id: toastId });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || 'Signup failed.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSignUp} className={styles.form}>
        <h2 className={styles.title}>Create Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Creating...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;

