'use client';
import Image from 'next/image';
import styles from './InputModal.module.css';

const InputModal = ({
    onClose,
    onSubmit,
    companyName,
    setCompanyName,
    handleLogoChange,
    preview,
    serviceType,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    backgroundColor,
    setBackgroundColor,
}) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <button onClick={onClose} className={styles.closeButton}>
                    &times;
                </button>
                <h2 className={styles.title}>Customize Your Product</h2>
                <form onSubmit={onSubmit} className={styles.form}>
                    {/* Company Name Input */}
                    <div>
                        <label className={styles.label}>Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className={styles.inputField}
                            placeholder="Enter your company name"
                            required
                        />
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className={styles.label}>Company Logo (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className={styles.inputField}
                        />
                        {preview && (
                            <div className={styles.logoPreview}>
                                <Image 
                                    src={preview} 
                                    alt="Logo Preview" 
                                    width={80} 
                                    height={80} 
                                    className={styles.logoPreview}
                                    unoptimized 
                                />
                            </div>
                        )}
                    </div>

                    {/* Color Palette Section */}
                    {serviceType === 'website' && (
                        <div>
                            <div className={styles.colorPickerContainer}>
                                <label className={styles.label}>Primary Color</label>
                                <div
                                    className={styles.colorBox}
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    <input 
                                        type="color"
                                        value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                        
                                    />  
                                </div>
                            </div>
                            <div className={styles.colorPickerContainer}>
                                <label className={styles.label}>Secondary Color</label>
                                <div
                                    className={styles.colorBox}
                                    style={{ backgroundColor: secondaryColor }}
                                >
                                    <input
                                        type="color"
                                        value={secondaryColor}
                                        onChange={(e) => setSecondaryColor(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.colorPickerContainer}>
                                <label className={styles.label}>Background Color</label>
                                <div
                                    className={styles.colorBox}
                                    style={{ backgroundColor: backgroundColor }}
                                >
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className={styles.submitButton}>
                        Preview Website
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InputModal;
