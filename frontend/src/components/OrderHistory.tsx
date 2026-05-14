import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext.tsx';
import './OrderHistory.css';

interface OrderItem {
  name: string;
  image_url: string;
  quantity: number;
  unit_price: number | string;
  subtotal: number | string;
}

interface Order {
  order_id: number;
  order_status: string;
  total: number | string;
  address?: string; 
  order_date: string;
}

interface OrderDetail extends Order {
  items?: OrderItem[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#f97316',      // Naranja
  processing: '#3b82f6',   // Azul
  shipped: '#a855f7',      // Morado
  delivered: '#10b981',    // Verde
  cancelled: '#ef4444'     // Rojo
};

// 🔥 Traducido al inglés
const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState('');
  const { customer } = useUser();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError('');

        if (!customer) {
          setError('User not authenticated');
          setIsLoading(false);
          return;
        }

        const endpoint = (customer.role === 'admin' || customer.role === 'employee') 
          ? 'http://localhost:3000/api/orders'
          : 'http://localhost:3000/api/orders/my';

        const response = await fetch(endpoint, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Could not load orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [customer]);

  const handleRowClick = async (orderId: number) => {
    if (selectedOrder?.order_id === orderId) {
      setSelectedOrder(null);
      return;
    }

    try {
      setIsLoadingDetail(true);

      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data: OrderDetail = await response.json();
      setSelectedOrder(data);
    } catch (err) {
      console.error('Error loading order details:', err);
      setSelectedOrder(null);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // 🔥 Formato de fecha en inglés ('en-US')
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `€${numPrice.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="order-history">
        <div className="order-history-container">
          <h2>My Order History</h2>
          <div className="loading-message">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history">
        <div className="order-history-container">
          <h2>My Order History</h2>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-history">
        <div className="order-history-container">
          <h2>My Order History</h2>
          <div className="empty-message">No orders yet.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history">
      <div className="order-history-container">
        <h2>My Order History</h2>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.order_id}
                  className={`order-row ${selectedOrder?.order_id === order.order_id ? 'selected' : ''}`}
                  onClick={() => handleRowClick(order.order_id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="order-id">#{order.order_id}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ 
                        backgroundColor: STATUS_COLORS[order.order_status] || '#6b7280',
                        color: 'white'
                      }}
                      title={order.order_status}
                    >
                      {STATUS_LABELS[order.order_status] || order.order_status}
                    </span>
                  </td>
                  <td className="order-total">{formatPrice(order.total)}</td>
                  <td className="order-date">{formatDate(order.order_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && !isLoadingDetail && (
          <div className="order-detail">
            <h3>Order Details #{selectedOrder.order_id}</h3>

            <div className="detail-header">
              <p>
                <strong>Shipping Address:</strong> {selectedOrder.address || 'Not specified'}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedOrder.order_date)}
              </p>
            </div>

            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <div className="detail-items">
                <h4>Products</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="item-info">
                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="item-thumbnail"
                              />
                            )}
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="center">{item.quantity}</td>
                        <td className="center">{formatPrice(item.unit_price)}</td>
                        <td className="center">{formatPrice(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="detail-total">
                  <strong>Order Total:</strong>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {isLoadingDetail && (
          <div className="order-detail">
            <p className="loading-message">Loading details...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;