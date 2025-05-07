import { useEffect, useState } from "react";
import io from "socket.io-client";

// ✅ Dynamic backend URL depending on environment
const socket = io(
  process.env.NODE_ENV === "production"
    ? "https://student-cafeteria.onrender.com" // ✅ Production backend URL
    : "http://localhost:5000" // ✅ Local development URL
);

const OrderNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // ✅ Listen for order updates
    socket.on("orderUpdate", (order) => {
      setNotifications((prev) => [
        ...prev,
        `Order ${order.orderId} is now ${order.status}`,
      ]);
    });

    // ✅ Cleanup on unmount
    return () => {
      socket.off("orderUpdate");
    };
  }, []);

  return (
    <>
      {notifications.length > 0 && (
        <div className="notification-container">
          <div className="notification-box">
            <h4>Order Notifications</h4>
            <ul>
              {notifications.map((notif, index) => (
                <li key={index}>{notif}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderNotification;
