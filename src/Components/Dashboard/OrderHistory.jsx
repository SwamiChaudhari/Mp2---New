import React from 'react';

const OrderHistory = ({ orders }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Order History</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Order #{order.id}</p>
                <p className="text-lg font-medium text-gray-900">
                  ₹{order.totalAmount}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                getStatusColor(order.status)
              }`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-gray-600">
                      Quantity: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button className="text-green-600 hover:text-green-700 font-medium">
                Track Order
              </button>
              <button className="text-gray-600 hover:text-gray-700 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  const colors = {
    'processing': 'bg-yellow-100 text-yellow-800',
    'shipped': 'bg-blue-100 text-blue-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

export default OrderHistory;
