import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Subscriptions.module.scss";
import { Trash2, Edit, ChevronDown, Power, PowerOff, XCircle, AlertTriangle } from 'lucide-react';
import EditSubscriptionModal from "../../components/EditSubscriptionModal/EditSubscriptionModal";

const SubscriptionItem = ({ sub, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isExpired = new Date(sub.renewalDate) < new Date() && sub.status !== 'cancelled';
  
  const statusText = isExpired ? 'expired' : sub.status;

  const handleToggleStatus = async () => {
    const newStatus = sub.status === 'active' ? 'inactive' : 'active';
    onUpdate(sub._id, { status: newStatus });
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this subscription? This action cannot be undone.")) {
      onUpdate(sub._id, { status: 'cancelled' });
    }
  };

  return (
    <li className={styles.subItem}>
      <div className={styles.subItemHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.subInfo}>
          <strong>{sub.name}</strong>
        </div>
        <div className={styles.subMainDetails}>
          <span className={`${styles.statusText} ${styles[statusText]}`}>
            {statusText}
          </span> 
          <div className={styles.subInDetail}>
            <span className={styles.subPrice}>{sub.price} {sub.currency} / {sub.frequency}</span>
            <ChevronDown className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`} size={20} />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className={styles.subItemDetails}>
          <p><strong>Category:</strong> {sub.category}</p>
          <p><strong>Payment Method:</strong> {sub.paymentMethod.replace('_', ' ')}</p>
          <p><strong>Next Renewal:</strong> {new Date(sub.renewalDate).toLocaleDateString()}</p>
          <div className={styles.actions}>
            <button onClick={() => onUpdate(sub, 'edit')} className={styles.actionBtn}><Edit size={16} /> Edit</button>
            
            {isExpired ? (
              <button className={`${styles.actionBtn} ${styles.expiredBtn}`} disabled>
                <AlertTriangle size={16} /> Expired
              </button>
            ) : (
              <button onClick={handleToggleStatus} className={styles.actionBtn} disabled={sub.status === 'cancelled'}>
                {sub.status === 'active' ? <><PowerOff size={16} /> Deactivate</> : <><Power size={16} /> Activate</>}
              </button>
            )}

            {sub.status !== 'cancelled' && !isExpired && (
                <button onClick={handleCancel} className={`${styles.actionBtn} ${styles.cancelBtn}`}>
                    <XCircle size={16} /> Cancel
                </button>
            )}
            <button onClick={() => onDelete(sub._id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}><Trash2 size={16} /> Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

const Subscriptions = () => {
  const { user, BASE_URL } = useAuth();
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSub, setEditingSub] = useState(null);

  const fetchAllSubscriptions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/subscriptions/user/${user._id}`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setSubs(data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []);
      }
    } catch (err) {
      console.error("Failed to fetch subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSubscriptions();
  }, [user]);

  const handleDelete = async (subscriptionId) => {
    if (!window.confirm("Are you sure you want to permanently delete this subscription?")) return;
    try {
      await fetch(`${BASE_URL}/api/v1/subscriptions/${subscriptionId}`, { method: 'DELETE', credentials: 'include' });
      fetchAllSubscriptions();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Cannot Delete");
    }
  };

  const handleUpdate = async (subOrId, data) => {
    const subId = typeof subOrId === 'string' ? subOrId : subOrId._id;
    if (data === 'edit') {
      setEditingSub(subOrId);
      return;
    }
    try {
      await fetch(`${BASE_URL}/api/v1/subscriptions/${subId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchAllSubscriptions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>My Subscriptions</h1>
      {loading ? (
        <p>Loading your subscriptions...</p>
      ) : subs.length === 0 ? (
        <p>You haven't added any subscriptions yet. Go to the dashboard to add one!</p>
      ) : (
        <ul className={styles.subList}>
          {subs.map((sub) => (
            <SubscriptionItem key={sub._id} sub={sub} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </ul>
      )}
      {editingSub && (
        <EditSubscriptionModal
          subscription={editingSub}
          onClose={() => setEditingSub(null)}
          onSuccess={() => {
            setEditingSub(null);
            fetchAllSubscriptions();
          }}
        />
      )}
    </div>
  );
};

export default Subscriptions;
