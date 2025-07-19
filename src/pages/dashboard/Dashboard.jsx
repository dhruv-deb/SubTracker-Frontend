import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Dashboard.module.scss";
import AddSubscriptionForm from "../../components/AddSubscriptionForm/AddSubscriptionForm";
import { Trash2 } from 'lucide-react';

const Dashboard = () => {
  const { user, BASE_URL } = useAuth();
  const [allUpcomingSubs, setAllUpcomingSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState(30);

  const fetchUpcoming30Days = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/subscriptions/upcoming/${user._id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        const subscriptions = data.data || [];
        subscriptions.sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
        setAllUpcomingSubs(subscriptions);
      }
    } catch (err) {
      console.error("Failed to fetch upcoming subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcoming30Days();
  }, [user]);

  const handleDelete = async (subscriptionId) => {
    if (!window.confirm("Are you sure you want to delete this subscription?")) {
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/v1/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to delete subscription.');
      }
      fetchUpcoming30Days();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSubs = useMemo(() => {
    if (filterPeriod == 7) {
      const now = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(now.getDate() + 7);
      return allUpcomingSubs.filter(sub => new Date(sub.renewalDate) <= sevenDaysFromNow);
    }
    return allUpcomingSubs;
  }, [filterPeriod, allUpcomingSubs]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Welcome, {user?.name}</h1>
      </div>
      <div className={styles.contentGrid}>
        <div className={styles.addSubscriptionCard}>
          <AddSubscriptionForm onSuccess={fetchUpcoming30Days} />
        </div>
        <div className={styles.upcomingSection}>
          <div className={styles.upcomingHeader}>
            <h2>Upcoming Renewals</h2>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className={styles.filterDropdown}
            >
              <option value="30">Next 30 days</option>
              <option value="7">Next 7 days</option>
            </select>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : filteredSubs.length === 0 ? (
            <p>No upcoming renewals in this period.</p>
          ) : (
            <ul className={styles.subList}>
              {filteredSubs.map((sub) => (
                <li key={sub._id} className={styles.subItem}>
                  <div className={`${styles.statusDot} ${styles[sub.status]}`}></div>
                  <div className={styles.subInfo}>
                    <strong>{sub.name}</strong>
                    <span>Renews: {new Date(sub.renewalDate).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.subActions}>
                    <div className={styles.subPrice}>
                      {sub.price} {sub.currency}
                    </div>
                    <button onClick={() => handleDelete(sub._id)} className={styles.deleteButton}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
