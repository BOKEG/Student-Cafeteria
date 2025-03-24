import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Ensure backend is running

const OrderNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for order updates
    socket.on("orderUpdate", (order) => {
      setNotifications((prev) => [...prev, `Order ${order.orderId} is now ${order.status}`]);
    });

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
