'use client';
import Image from 'next/image';

const PreviewModalCustomSoftware = ({ onClose, companyName, logo }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-4 shadow-lg rounded-md w-full max-w-3xl relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors text-xl font-bold"
        >
          &times;
        </button>

        <div className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
            {logo && (
              <Image
                src={logo}
                alt="Company Logo"
                width={40} // Set an appropriate width
                height={40} // Set an appropriate height
                className="rounded-md"
              />
            )}
          </div>

          {/* Software Dashboard View */}
          <div className="flex space-x-4 mb-6">
            {/* Sidebar for Navigation */}
            <div className="w-1/4 bg-gray-100 p-2 rounded-md border border-gray-200">
              <h3 className="text-base font-semibold text-gray-700 mb-2">Dashboard</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Overview</li>
                <li>Tasks</li>
                <li>Analytics</li>
                <li>Reports</li>
                <li>Settings</li>
              </ul>
            </div>

            {/* Main Panel with Software Details */}
            <div className="w-3/4 bg-gray-100 p-3 rounded-md border border-gray-200">
              {/* Top Bar */}
              <div className="flex justify-between mb-3 text-sm">
                <div className="font-bold text-gray-800">Project Management Tool</div>
                <div className="text-gray-500">Last Sync: 10:32 AM</div>
              </div>

              {/* Software Features Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Task Automation</h3>
                  <p className="text-sm text-gray-600">Automate and schedule routine tasks.</p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Data Analytics</h3>
                  <p className="text-sm text-gray-600">Leverage data insights for smarter decisions.</p>
                </div>
              </div>

              {/* Software Controls Section */}
              <div className="bg-white p-3 rounded-md mb-4 border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-1">Control Panel</h3>
                <div className="flex space-x-3 text-sm">
                  <div className="w-1/3">
                    <div className="text-gray-500">Server Status</div>
                    <div className="bg-green-100 p-1 text-green-800 rounded-md text-center">Active</div>
                  </div>
                  <div className="w-1/3">
                    <div className="text-gray-500">Security Level</div>
                    <div className="bg-yellow-100 p-1 text-yellow-800 rounded-md text-center">Moderate</div>
                  </div>
                  <div className="w-1/3">
                    <div className="text-gray-500">User Activity</div>
                    <div className="bg-blue-100 p-1 text-blue-800 rounded-md text-center">Active</div>
                  </div>
                </div>
              </div>

              {/* Software Activity Log Section */}
              <div className="bg-white p-3 rounded-md mb-4 border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-1">Activity Log</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>Task 1: Completed - 10:00 AM</div>
                  <div>Task 2: Pending - 09:50 AM</div>
                  <div>Report Generation: Success - 09:30 AM</div>
                  <div>System Update: In Progress - 09:15 AM</div>
                </div>
              </div>

              {/* CTA for Software Solution */}
              <div className="bg-gray-100 p-3 rounded-md text-center border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Build Your Custom Solution</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Start Your Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModalCustomSoftware;
