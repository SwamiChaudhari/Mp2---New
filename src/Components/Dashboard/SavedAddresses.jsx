import React from 'react';

const SavedAddresses = ({ addresses, onEdit, onDelete, onSetDefault }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-8">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Saved Addresses</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 relative ${
              address.isDefault ? 'border-green-500' : 'border-gray-200'
            }`}
          >
            {address.isDefault && (
              <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                Default
              </span>
            )}
            <div className="mb-2">
              <h3 className="font-medium text-gray-900">{address.name}</h3>
              <p className="text-gray-600">{address.phone}</p>
            </div>
            <div className="text-gray-600">
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.pincode}
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => onEdit(address.id)}
                className="text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
              {!address.isDefault && (
                <>
                  <button
                    onClick={() => onSetDefault(address.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    Set as Default
                  </button>
                  <button
                    onClick={() => onDelete(address.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAddresses;
