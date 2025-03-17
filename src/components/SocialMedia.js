import React from "react";
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const SocialMedia = () => {
  return (
    <div className="relative left-2 md:left-12  top-1/2 transform -translate-y-1/2 flex flex-col gap-12 z-50">
      <a href="https://www.facebook.com/profile.php?id=61559262780126&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-gray-600 text-2xl hover:text-blue-500 transition duration-300" />
      </a>
      <a href="https://x.com/SMLnexgen" target="_blank" rel="noopener noreferrer">
        <FaXTwitter className="text-gray-600 text-2xl hover:text-gray-400 transition duration-300" />
      </a>
      <a href="https://www.instagram.com/smlnexgen_llp?igsh=NXVtb2xhZDh4ZTl2" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-gray-600 text-2xl hover:text-pink-500 transition duration-300" />
      </a>
      <a href="https://www.linkedin.com/company/smlnexgen-llp/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="text-gray-600 text-2xl hover:text-blue-700 transition duration-300" />
      </a>
      <a href="https://wa.me/919487084117" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="text-gray-600 text-2xl hover:text-green-500 transition duration-300" />
      </a>
      <a href="mailto:smlnexgenllp@gmail.com" target="_blank" rel="noopener noreferrer">
        <SiGmail className="text-gray-600 text-2xl hover:text-red-500 transition duration-300" />
      </a>
    </div>
  );
};

export default SocialMedia;
