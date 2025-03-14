'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Scroll from './scroll';
import InputModal from './InputModal';
import PreviewModal from './PreviewModal';
import PreviewModalCustomSoftware from './PreviewModalCustomSoftware';
import PreviewModalMobileApp from './PreviewModalMobileApp';
import styles from './services.module.css';
import ServicesCards from "./ServiceFeatures";
export default function Services() {
    const [isInputModalOpen, setIsInputModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isPreviewModalCustomSoftwareOpen, setIsPreviewModalCustomSoftwareOpen] = useState(false);
    const [isPreviewModalMobileAppOpen, setIsPreviewModalMobileAppOpen] = useState(false);

    const [companyName, setCompanyName] = useState('');
    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [serviceType, setServiceType] = useState('');
    const [primaryColor, setPrimaryColor] = useState('');
    const [secondaryColor, setSecondaryColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!companyName) {
            alert('Please enter your company name.');
            return;
        }
        setIsInputModalOpen(false);
        switch (serviceType) {
            case 'website':
                setIsPreviewModalOpen(true);
                break;
            case 'customSoftware':
                setIsPreviewModalCustomSoftwareOpen(true);
                break;
            case 'mobileApp':
                setIsPreviewModalMobileAppOpen(true);
                break;
            default:
                break;
        }
    };

    const services = [
        {
            title: 'Website Design & Development',
            description: 'We create stunning websites.',
            type: 'website',
            icon: '🌐',
        },
        {
            title: 'Custom Software Development',
            description: 'Tailored software solutions.',
            type: 'customSoftware',
            icon: '💻',
        },
        {
            title: 'Mobile App Development',
            description: 'High performance apps.',
            type: 'mobileApp',
            icon: '📱',
        },
    ];

    return (
        <div id="services">
            <Scroll />
            <ServicesCards />
             
            <div className={styles.MarginTop}>


                <motion.div
                    className={styles.servicesContainer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className={styles.servicesGrid}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.3 },
                            },
                        }}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className={styles.serviceCard}
                                onClick={() => {
                                    setServiceType(service.type);
                                    setIsInputModalOpen(true);
                                }}
                                initial={{ opacity: 0, y: 100, rotate: -10 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 2,
                                    boxShadow: '0 0 20px rgba(0, 255, 204, 0.7)',
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                            >
                                <div
                                    className={styles.serviceCardHeader}
                                >
                                    <span className={styles.serviceIcon}>{service.icon}</span>
                                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                                </div>
                                <p className={styles.serviceDescription}>{service.description}</p>
                                <motion.button
                                    className={styles.serviceButton}
                                    whileHover={{
                                        scale: 1.2,
                                        background: 'linear-gradient(45deg, #ff00ff, #00ffcc)',
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    animate={{
                                        y: [0, -5, 0],
                                        boxShadow: [
                                            '0 0 10px #ff00ff',
                                            '0 0 15px #00ffcc',
                                            '0 0 10px #ff00ff',
                                        ],
                                    }}
                                    transition={{ repeat: Infinity, duration: 1.8 }}
                                >
                                    Get Started 🚀
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <br />
                <br />
                <br />
                <Link href="/Exp">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                            y: [0, -10, 0],
                            boxShadow: [
                                '0 0 10px #00ffcc',
                                '0 0 20px #ff00ff',
                                '0 0 10px #00ffcc',
                            ],
                        }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        className={styles.demoButton}
                    >
                        <span className={styles.demoButtonSpan}></span>
                        Try Your Demo
                    </motion.button>
                </Link>

                {/* Input Modal */}
                <AnimatePresence>
                    {isInputModalOpen && (
                        <InputModal
                            onClose={() => setIsInputModalOpen(false)}
                            onSubmit={handleSubmit}
                            companyName={companyName}
                            setCompanyName={setCompanyName}
                            handleLogoChange={handleLogoChange}
                            preview={preview}
                            serviceType={serviceType}
                            primaryColor={primaryColor}
                            setPrimaryColor={setPrimaryColor}
                            secondaryColor={secondaryColor}
                            setSecondaryColor={setSecondaryColor}
                            backgroundColor={backgroundColor}
                            setBackgroundColor={setBackgroundColor}
                        />
                    )}
                </AnimatePresence>

                {/* Preview Modals */}
                <AnimatePresence>
                    {isPreviewModalOpen && (
                        <PreviewModal
                            onClose={() => setIsPreviewModalOpen(false)}
                            companyName={companyName}
                            logo={preview}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            backgroundColor={backgroundColor}
                        />
                    )}
                    {isPreviewModalCustomSoftwareOpen && (
                        <PreviewModalCustomSoftware
                            onClose={() => setIsPreviewModalCustomSoftwareOpen(false)}
                            companyName={companyName}
                            logo={preview}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            backgroundColor={backgroundColor}
                        />
                    )}
                    {isPreviewModalMobileAppOpen && (
                        <PreviewModalMobileApp
                            onClose={() => setIsPreviewModalMobileAppOpen(false)}
                            companyName={companyName}
                            logo={preview}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            backgroundColor={backgroundColor}
                        />
                    )}
                </AnimatePresence>
              
            </div>
        </div>
    );
}