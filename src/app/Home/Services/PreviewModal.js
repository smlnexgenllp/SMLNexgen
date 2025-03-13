'use client'; // Required for interactivity

import { motion, AnimatePresence } from 'framer-motion'; // Framer Motion for animations

const PreviewModal = ({ onClose, companyName, logo, primaryColor, secondaryColor, backgroundColor }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl relative" // Reduced padding and max width
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors text-xl font-bold hover:scale-110 transform transition-transform"
          >
            &times;
          </button>

          <div className="p-4">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-6"
            >
              <h1 className="text-2xl font-bold text-gray-800">{companyName}</h1> {/* Reduced font size */}
              {logo && (
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  src={logo}
                  alt="Company Logo"
                  className="w-16 h-16 rounded-md shadow-md hover:shadow-lg transition-shadow" // Reduced logo size
                />
              )}
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative h-48 mb-6 rounded-lg overflow-hidden shadow-md" // Reduced height
              style={{ backgroundColor: backgroundColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-xl font-semibold text-white mb-2"> {/* Reduced font size */}
                    Explore Your Future Website
                  </h2>
                  <p className="text-sm text-gray-100"> {/* Reduced font size */}
                    See how your services and products can shine online.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" // Reduced gap
            >
              {[
                {
                  title: 'Product Showcases',
                  description:
                    'Highlight your products with sleek visuals and user-focused design.',
                },
                {
                  title: 'Service Portfolios',
                  description:
                    'Display your services in a professional and approachable manner.',
                },
                {
                  title: 'Interactive Features',
                  description:
                    'Test how interactive elements like buttons and forms will work.',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow hover:scale-105 transform transition-transform" // Reduced padding
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  <h3 className="text-md font-bold text-gray-800 mb-2"> {/* Reduced font size */}
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600">{service.description}</p> {/* Reduced font size */}
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-blue-50 p-6 rounded-lg text-center" // Reduced padding
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4"> {/* Reduced font size */}
                Ready to See Your Vision Come to Life?
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-md font-medium hover:bg-blue-600 transition-colors" // Reduced padding and font size
                style={{ backgroundColor: primaryColor }}
              >
                Test Your Website Now
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewModal;