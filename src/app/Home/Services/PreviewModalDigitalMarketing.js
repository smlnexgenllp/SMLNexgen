'use client'; // Required for interactivity

const PreviewModalDigitalMarketing = ({ onClose, companyName, logo }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 p-10 shadow-lg rounded-lg w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 transition-colors text-2xl font-bold"
        >
          &times;
        </button>

        <div className="p-6 space-y-8">
          {/* Hero Section */}
          <div className="relative bg-indigo-100 rounded-lg overflow-hidden shadow-xl mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200 opacity-70"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 py-10">
              <h2 className="text-3xl font-semibold text-indigo-900 leading-tight mb-4">
                Digital Marketing Solutions to Accelerate Your Growth
              </h2>
              <p className="text-lg text-indigo-800 opacity-90 mb-6">
                Explore personalized strategies designed to boost your brand&apos;s online presence and performance.
              </p>

              <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors">
                Get Started Now
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 transition-colors">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">SEO Optimization</h3>
              <p className="text-gray-700">
                Enhance your website&apos;s search engine rankings with targeted optimization strategies to increase organic traffic and visibility.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 transition-colors">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">PPC Advertising</h3>
              <p className="text-gray-700">
                Maximize your ROI with expertly managed pay-per-click campaigns that deliver instant results and visibility on search engines.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 transition-colors">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">Social Media Marketing</h3>
              <p className="text-gray-700">
                Build brand awareness and engagement through tailored campaigns on platforms like Facebook, Instagram, LinkedIn, and more.
              </p>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-indigo-100 text-center py-10 px-6 rounded-lg mt-12">
            <h3 className="text-2xl font-semibold text-indigo-900 mb-6">
              Ready to Take Your Brand to the Next Level?
            </h3>
            <button className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors">
              Let &apos;s Talk Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModalDigitalMarketing;