import React from 'react';

const DashboardHero = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name || 'Customer'}!
          </h1>
          <p className="text-xl text-gray-600">
            Manage your orders, track deliveries, and update your preferences
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Orders"
            value="5"
            description="Active orders"
            icon="📦"
          />
          <DashboardCard
            title="Wishlist"
            value="12"
            description="Saved items"
            icon="❤️"
          />
          <DashboardCard
            title="Reviews"
            value="8"
            description="Product reviews"
            icon="⭐"
          />
          <DashboardCard
            title="Points"
            value="250"
            description="Reward points"
            icon="🎯"
          />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, description, icon }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-3xl">{icon}</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                <div className="ml-2 text-sm text-gray-600">
                  {description}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
