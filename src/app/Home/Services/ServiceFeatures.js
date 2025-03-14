import { FaGlobe, FaAnchor, FaHourglassHalf, FaDatabase, FaUpload, FaCamera, FaMobileAlt, FaLaptopCode, FaChartLine } from "react-icons/fa";

const sections = [
  {
    title: "App Development",
    features: [
      { icon: <FaMobileAlt />, title: "iOS & Android Apps" },
      { icon: <FaAnchor />, title: "UI/UX Design" },
      { icon: <FaHourglassHalf />, title: "Performance Optimization" }
    ]
  },
  {
    title: "Web Development",
    features: [
      { icon: <FaGlobe />, title: "Modern Web Design" },
      { icon: <FaLaptopCode />, title: "Full-Stack Development" },
      { icon: <FaDatabase />, title: "Database Management" }
    ]
  },
  {
    title: "Digital Marketing",
    features: [
      { icon: <FaChartLine />, title: "SEO & Analytics" },
      { icon: <FaUpload />, title: "Social Media Marketing" },
      { icon: <FaCamera />, title: "Content Creation" }
    ]
  }
];

export default function ServicesCards() {
  return (
    <section className="pt-10 pb-1 bg-transparent mt-24">
 {/* Adjusted padding to move content up */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-8"> {/* Reduced margin-bottom to move closer */}
          <h4 className="text-3xl font-bold text-[#06038D] relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-[#06038D] after:mt-2 after:mx-auto">Our Expertise & <span className="text-gray-800"> Services</span></h4>
        </div>
        <div className="grid md:grid-cols-3 gap-6"> {/* Reduced gap for a tighter layout */}
          {sections.map((section, index) => (
            <div key={index} className="text-center">
              <h5 className="text-2xl font-semibold text-gray-800 mb-4">{/* Reduced margin-bottom for tighter spacing */}{section.title}</h5>
              <div className="flex flex-col gap-4"> {/* Reduced gap between boxes */}
                {section.features.map((feature, idx) => (
                  <div key={idx} className="bg-white p-3 shadow-md rounded-xl text-center transition-transform duration-300 transform hover:scale-105 hover:bg-[#06038D] hover:text-white">
                    <div className="text-4xl text-[#06038D] mb-3 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 group-hover:bg-white">{feature.icon}</div>
                    <h6 className="text-lg font-semibold mb-2">{feature.title}</h6>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
