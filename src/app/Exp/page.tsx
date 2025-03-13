'use client';
import { useState, useRef, useEffect } from 'react';
import { useOnborda } from "onborda";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

// Define interfaces for color-related data
interface Color {
    r: number;
    g: number;
    b: number;
}

interface ColorSet {
    colors: [string, string, string, string, string];
}

export default function Home() {
    const { startOnborda } = useOnborda();
    const handleStartOnborda = (tourName: string) => {
        startOnborda(tourName);
    };
    // State and refs with type annotations
    const [logoSrc, setLogoSrc] = useState<string>('/demo_logo.png');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const homeRef = useRef<HTMLDivElement>(null);

    // Event handler for image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setLogoSrc(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Event handler to trigger file input click
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    // Function to highlight the toolbar briefly
    const highlightToolbar = () => {
        const toolbar = document.getElementById('toolbar') as HTMLElement | null;
        if (toolbar) {
            toolbar.classList.add(styles.highlighted);
            setTimeout(() => toolbar.classList.remove(styles.highlighted), 1000);
        }
    };

    useEffect(() => {
        // Contrast checker functions with types
        const getBrightness = (color: string): number => {
            let hex = color;
            if (color.substring(0, 3) === 'rgb') {
                const [r, g, b] = color.match(/\d+/g) || [];
                hex = '#' + ((1 << 24) + (+r! << 16) + (+g! << 8) + +b!).toString(16).slice(1);
            }
            if (hex === '#000000') return 0;
            if (hex === '#FFFFFF') return 100;
            const r = parseInt(hex.substring(1, 3), 16);
            const g = parseInt(hex.substring(3, 5), 16);
            const b = parseInt(hex.substring(5, 7), 16);
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const l = (max + min) / 2;
            return (l * 100) / 255;
        };

        const getContrastRatio = (background: string, foreground: string): number => {
            const bg = parseColor(background);
            const fg = parseColor(foreground);
            const l1 = getLuminance(bg);
            const l2 = getLuminance(fg);
            return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
        };

        const parseColor = (color: string): Color => {
            const regexRgb = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
            const matchRgb = regexRgb.exec(color);
            if (matchRgb) {
                return {
                    r: parseInt(matchRgb[1]),
                    g: parseInt(matchRgb[2]),
                    b: parseInt(matchRgb[3]),
                };
            }
            const regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            const matchHex = regexHex.exec(color);
            if (matchHex) {
                const hex = matchHex[1];
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return { r, g, b };
            }
            throw new Error('Invalid color value: ' + color);
        };

        const getLuminance = (color: Color): number => {
            const r = color.r / 255;
            const g = color.g / 255;
            const b = color.b / 255;
            return 0.2126 * Math.pow(r, 2.2) + 0.7152 * Math.pow(g, 2.2) + 0.0722 * Math.pow(b, 2.2);
        };

        // DOM element references with type assertions
        const primaryColor = document.getElementById('prim') as HTMLInputElement | null;
        const secondaryColor = document.getElementById('sec') as HTMLInputElement | null;
        const primbuttnColor = document.getElementById('primbuttn') as HTMLInputElement | null;
        const secbuttnColor = document.getElementById('secbuttn') as HTMLInputElement | null;
        const accentColor = document.getElementById('accent') as HTMLInputElement | null;
        const randomizeButton = document.getElementById('randomize') as HTMLElement | null;
        const exportButton = document.getElementById('export') as HTMLElement | null;
        const expandButton = document.querySelector(`.${styles.rolloutbutton}`) as HTMLElement | null;
        const homeElement = homeRef.current;

        // Log for debugging (optional)
        console.log('Toolbar elements:', {
            primaryColor,
            secondaryColor,
            primbuttnColor,
            secbuttnColor,
            accentColor,
            randomizeButton,
            exportButton,
            expandButton,
            homeElement,
        });

        // Color sets typed as ColorSet[]
        const colorSets: ColorSet[] = [
            {
                colors: ['#e9c46a', '#264653', '#e76f51', '#2a9d8f', '#e9c46a'],
            },

            {
                colors: ['#223d49', '#ffe08a', '#ac5039', '#fff0c7', '#2a9d8f'],
            },

            {
                colors: ['#f6f7f9', '#212428', '#00ff00', '#313130', '#00bb00'],
            },

            {
                colors: ['#0e101a', '#ffffff', '#0d8065', '#f0f2fc', '#aff2ea'],
            },

            {
                colors: ['#1d3557', '#f1faee', '#e63946', '#a8dadc', '#457b9d'],
            },

            {
                colors: ['#f1faee', '#1d3557', '#a8dadc', '#06446a', '#ffc7cc'],
            },

            {
                colors: ['#fffbe5', '#000814', '#ffc300', '#001d3d', '#003566'],
            },

            {
                colors: ['#344e41', '#dad7cd', '#3a5a40', '#b5c49c', '#588157'],
            },

            {
                colors: ['#2b2d42', '#edf2f4', '#d90429', '#8d99ae', '#201f33'],
            },

            {
                colors: ['#212529', '#f8f9fa', '#343a40', '#e9ecef', '#adb5bd'],
            },

            {
                colors: ['#231942', '#ffebf5', '#5e548e', '#efd9f2', '#8d73b0'],
            },

            {
                colors: ['#ffffff', '#191919', '#405bff', '#212121', '#ebff38'],
            },

            {
                colors: ['#eeeeee', '#000000', '#44d62c', '#222222', '#ff9c07'],
            },

            {
                colors: ['#eeeeee', '#000000', '#44d62c', '#222222', '#44d62c'],
            },

            {
                colors: ['#ff8bff', '#193718', '#ff8bff', '#5eaa67', '#e9ffe8'],
            },

            {
                colors: ['#000000', '#ffffff', '#000000', '#f2f2f2', '#000000'],
            },

            {
                colors: ['#000000', '#ffffff', '#0049db', '#f2f2f2', '#ff6bc1'],
            },

            {
                colors: ['#0f1419', '#ffffff', '#1d9bf0', '#f7f7f7', '#8ecdf7'],
            },

            {
                colors: ['#0f1419', '#ffffff', '#ffd400', '#f2f2f2', '#ffe97f'],
            },

            {
                colors: ['#fbf5d4', '#0099ab', '#5a39d0', '#006374', '#2156c0'],
            },

            {
                colors: ['#000000', '#e7e7d7', '#006338', '#deded0', '#006338'],
            },

            {
                colors: ['#0f1419', '#ffffff', '#f91880', '#f2f2f2', '#fc8bbf'],
            },

            {
                colors: ['#0f1419', '#ffffff', '#8756FF', '#f2f2f2', '#bbaaff'],
            },

            {
                colors: ['#0f1419', '#ffffff', '#ff7a00', '#f2f2f2', '#ffbc7f'],
            },

            {
                colors: ['#0f1419', '#ffffff', '#00ba7c', '#f2f2f2', '#7fdcbd'],
            },

            {
                colors: ['#006374', '#fbf5d4', '#5a39d0', '#cbddca', '#5a39d0'],
            },

            {
                colors: ['#0e101a', '#ffffff', '#ff686b', '#fff6f5', '#84dcc6'],
            },

            {
                colors: ['#584b53', '#fef5ef', '#9d5c63', '#ffffff', '#e4bb97'],
            },

            {
                colors: ['#424b54', '#ffffff', '#9b6a6c', '#e6eaeb', '#e2b4bd'],
            },

            {
                colors: ['#ffffff', '#1f2041', '#ffc857', '#4b3f72', '#ffc857'],
            },

            {
                colors: ['#050505', '#ffffff', '#121212', '#f6f5f4', '#ffb600'],
            },

            {
                colors: ['#ffffff', '#000000', '#9d34da', '#1a1a1a', '#bd73e8'],
            },

            {
                colors: ['#2b1c50', '#ffffff', '#565add', '#d1d1f7', '#9f92ec'],
            },

            {
                colors: ['#00031f', '#ffffff', '#0b5cff', '#ffffff', '#00ede7'],
            },

            {
                colors: ['#000000', '#ffffff', '#611f69', '#f4ede4', '#ecb22e'],
            },

            {
                colors: ['#171a22', '#ffffff', '#ff622d', '#f7f7f7', '#421983'],
            },

            {
                colors: ['#000000', '#9de2d4', '#e27d5f', '#95d6d2', '#d3bbc2'],
            },

            {
                colors: ['#fffbff', '#252cbb', '#ca3f66', '#2e35c2', '#ffccda'],
            },

            {
                colors: ['#ffffff', '#4887b0', '#fbeec1', '#3f7897', '#fbeec1'],
            },

            {
                colors: ['#05396b', '#5cdb94', '#edf5e0', '#8de4af', '#05396b'],
            },

            {
                colors: ['#fcfcfc', '#151515', '#f54c28', '#1b1918', '#689775'],
            },

            {
                colors: ['#5d5c61', '#b4c6da', '#557a95', '#d0dce7', '#7a747b'],
            },

            {
                colors: ['#2e1115', '#ffffff', '#4f1b1d', '#eaeff2', '#83687b'],
            },

            {
                colors: ['#fcfcfc', '#000000', '#4201ff', '#171717', '#230090'],
            },

            {
                colors: ['#e5fffd', '#0b0c12', '#66fcf1', '#202833', '#c5c6c8'],
            },

            {
                colors: ['#2c221e', '#e3e2de', '#e10243', '#e5d1d6', '#9b1750'],
            },

            {
                colors: ['#6c6b66', '#f1f0eb', '#f13c1f', '#fff8e5', '#4056a1'],
            },

            {
                colors: ['#d6d6d6', '#272727', '#10f49c', '#424242', '#ffe401'],
            },

            {
                colors: ['#fdfffe', '#2f4455', '#da7b93', '#376f70', '#2e151b'],
            },

            {
                colors: ['#646561', '#eae8dc', '#e85a50', '#e6e2cc', '#977d59'],
            },

            {
                colors: ['#ededed', '#222546', '#29658a', '#474866', '#d1d2d6'],
            },
        ];

        let lastSelectedColorSet: ColorSet | null = null;

        // Function to check and adjust contrast
        const checkContrast = () => {
            const primaryButtons = document.querySelectorAll(`.${styles['primary-button']}`) as NodeListOf<HTMLElement>;
            const secondaryButtons = document.querySelectorAll(`.${styles['secondary-button']}`) as NodeListOf<HTMLElement>;
            const partTwo = document.querySelectorAll(`.${styles.part2}`) as NodeListOf<HTMLElement>;
            const primbuttnColorClass = document.querySelector(`.${styles.primbuttn}`) as HTMLElement | null;
            const secbuttnColorClass = document.querySelector(`.${styles.secbuttn}`) as HTMLElement | null;
            const accentColorClass = document.querySelector(`.${styles.accent}`) as HTMLElement | null;

            const primbuttnColorValue = primbuttnColor?.value || '#4685FF';
            primaryButtons.forEach((primaryButton) => {
                const primaryColorValue = primaryColor?.value || '#000000';
                const secondaryColorValue = secondaryColor?.value || '#ffffff';
                const primaryBrightness = getBrightness(primaryColorValue);
                const secondaryBrightness = getBrightness(secondaryColorValue);
                const contrastRatio = getContrastRatio(primbuttnColorValue, primaryColorValue);

                primaryButton.style.color =
                    contrastRatio < 4.5
                        ? 'var(--secondary)'
                        : 'var(--primary)';
                if (primbuttnColorClass) {
                    primbuttnColorClass.style.color =
                        contrastRatio < 4.5
                            ? 'var(--secondary)'
                            : 'var(--primary)';
                }
            });

            const secbuttnColorValue = secbuttnColor?.value || '#F2F2F2';
            secondaryButtons.forEach((secondaryButton) => {
                const primaryColorValue = primaryColor?.value || '#000000';
                const secondaryColorValue = secondaryColor?.value || '#ffffff';
                const primaryBrightness = getBrightness(primaryColorValue);
                const secondaryBrightness = getBrightness(secondaryColorValue);
                const contrastRatio = getContrastRatio(secbuttnColorValue, primaryColorValue);

                secondaryButton.style.color =
                    contrastRatio < 4.5
                        ? 'var(--secondary)'
                        : 'var(--primary)';
                if (secbuttnColorClass) {
                    secbuttnColorClass.style.color =
                        contrastRatio < 4.5
                            ? 'var(--secondary)'
                            : 'var(--primary)';
                }
            });

            const accentColorValue = accentColor?.value || '#FFB084';
            partTwo.forEach((part) => {
                const primaryColorValue = primaryColor?.value || '#000000';
                const secondaryColorValue = secondaryColor?.value || '#ffffff';
                const primaryBrightness = getBrightness(primaryColorValue);
                const secondaryBrightness = getBrightness(secondaryColorValue);
                const contrastRatio = getContrastRatio(accentColorValue, primaryColorValue);

                part.style.color =
                    contrastRatio < 4.5
                        ? 'var(--secondary)'
                        : 'var(--primary)';
                if (accentColorClass) {
                    accentColorClass.style.color =
                        contrastRatio < 4.5
                            ? 'var(--secondary)'
                            : 'var(--primary)';
                }
            });
        };

        // Function to update CSS variables with selected colors
        const updateColors = () => {
            const colors = {
                '--primary': primaryColor?.value || '#000000',
                '--secondary': secondaryColor?.value || '#ffffff',
                '--primbuttn': primbuttnColor?.value || '#4685FF',
                '--secbuttn': secbuttnColor?.value || '#F2F2F2',
                '--accent': accentColor?.value || '#FFB084',
            };

            if (homeElement) {
                Object.entries(colors).forEach(([prop, value]) => {
                    homeElement.style.setProperty(prop, value);
                    console.log(`Set ${prop} to ${value} on #home`);
                });
            }

            const slug = `${colors['--primary'].replace('#', '')}-${colors['--secondary'].replace('#', '')}-${colors['--primbuttn'].replace('#', '')}-${colors['--secbuttn'].replace('#', '')}-${colors['--accent'].replace('#', '')}`;
            window.history.replaceState({}, document.title, `?colors=${slug}`);

            checkContrast();
        };

        // Function to randomize colors
        const randomizeColors = () => {
            let randomColorSet: ColorSet;
            do {
                randomColorSet = colorSets[Math.floor(Math.random() * colorSets.length)];
            } while (randomColorSet === lastSelectedColorSet);
            lastSelectedColorSet = randomColorSet;

            if (primaryColor) primaryColor.value = randomColorSet.colors[0];
            if (secondaryColor) secondaryColor.value = randomColorSet.colors[1];
            if (primbuttnColor) primbuttnColor.value = randomColorSet.colors[2];
            if (secbuttnColor) secbuttnColor.value = randomColorSet.colors[3];
            if (accentColor) accentColor.value = randomColorSet.colors[4];

            updateColors();
        };

        // Add event listeners for color inputs
        [primaryColor, secondaryColor, primbuttnColor, secbuttnColor, accentColor].forEach((input) => {
            if (input) {
                input.addEventListener('input', () => {
                    console.log(`${input.id} changed to ${input.value}`);
                    updateColors();
                });
            }
        });

        // Randomize button event listener
        if (randomizeButton) {
            randomizeButton.addEventListener('click', () => {
                console.log('Randomize clicked');
                randomizeColors();
            });
        }

        // Export button event listener
        if (exportButton) {
            exportButton.addEventListener('click', async () => {
                console.log('Export clicked');
                const zip = new JSZip();
                const colorValues = [
                    primaryColor?.value || '#000000',
                    secondaryColor?.value || '#ffffff',
                    primbuttnColor?.value || '#4685FF',
                    secbuttnColor?.value || '#F2F2F2',
                    accentColor?.value || '#FFB084',
                ];

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;
                if (ctx) {
                    canvas.width = colorValues.length * 50;
                    canvas.height = 50;
                    colorValues.forEach((color, i) => {
                        ctx.fillStyle = color;
                        ctx.fillRect(i * 50, 0, 50, 50);
                    });
                    const paletteImage = canvas.toDataURL('image/png');
                    const paletteBlob = await (await fetch(paletteImage)).blob();
                    zip.file('palette.png', paletteBlob);
                }

                const colorText = `Your selected colors:
Primary: ${colorValues[0]}
Secondary: ${colorValues[1]}
Primary Button: ${colorValues[2]}
Secondary Button: ${colorValues[3]}
Accent: ${colorValues[4]}
Thanks for trying out SMLNEXGEN's Demo!`;
                zip.file('colors.txt', colorText);

                const specificDiv = document.getElementById('home') as HTMLElement | null;
                if (specificDiv) {
                    const screenshotCanvas = await html2canvas(specificDiv, {
                        useCORS: true,
                        backgroundColor: null,
                        onclone: (clonedDoc) => {
                            const toolbar = clonedDoc.querySelector(`.${styles.toolbar}`) as HTMLElement | null;
                            if (toolbar) {
                                toolbar.style.display = 'none';
                            }
                            const colorEffectElements = clonedDoc.querySelectorAll(`.${styles['color-effect']}`) as NodeListOf<HTMLElement>;
                            colorEffectElements.forEach((element) => {
                                element.style.background = 'none';
                                element.style.webkitBackgroundClip = 'initial';
                                element.style.webkitTextFillColor = 'var(--primary)';
                            });
                        },
                    });
                    const screenshotImage = screenshotCanvas.toDataURL('image/png');
                    const screenshotBlob = await (await fetch(screenshotImage)).blob();
                    zip.file('screenshot.png', screenshotBlob);
                }

                zip.generateAsync({ type: 'blob' }).then((content) => {
                    saveAs(content, 'export.zip');
                });
            });
        }

        // Expand button event listener
        if (expandButton) {
            expandButton.addEventListener('click', () => {
                console.log('Expand clicked');
                const options = document.getElementsByClassName(styles.option) as HTMLCollectionOf<HTMLElement>;
                for (let i = 0; i < options.length; i++) {
                    if (options[i] !== expandButton) {
                        options[i].classList.toggle(styles.rollout);
                    }
                }
                expandButton.classList.toggle(styles.rotate);
            });
        }

        // Apply colors from URL slug
        const applyColorsFromSlug = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const slug = searchParams.get('colors');
            if (slug && primaryColor && secondaryColor && primbuttnColor && secbuttnColor && accentColor) {
                const [p, s, pb, sb, a] = slug.split('-');
                primaryColor.value = `#${p}`;
                secondaryColor.value = `#${s}`;
                primbuttnColor.value = `#${pb}`;
                secbuttnColor.value = `#${sb}`;
                accentColor.value = `#${a}`;
                updateColors();
            } else {
                updateColors();
            }
        };

        applyColorsFromSlug();

        // Cleanup event listeners on unmount
        return () => {
            [primaryColor, secondaryColor, primbuttnColor, secbuttnColor, accentColor].forEach((input) => {
                if (input) input.removeEventListener('input', updateColors);
            });
            if (randomizeButton) randomizeButton.removeEventListener('click', randomizeColors);
            if (exportButton) exportButton.removeEventListener('click', () => { });
            if (expandButton) expandButton.removeEventListener('click', () => { });
        };
    }, []);

    // JSX rendering
    return (
        <>
            <div onClick={() => handleStartOnborda("tour1")} className={styles.tour_button}>
                <span>Take the Tour 🚀</span>
            </div>
            <div id="home" className={styles.home} ref={homeRef}>
                <div className={styles.container}>
                    <div id="step0">
                        <nav className={styles.nav}>
                            <div className={styles.logo}>
                                <Image
                                    src={logoSrc}
                                    alt="logo"
                                    title="try inserting your own logo"
                                    className={styles.logoface}
                                    onClick={handleImageClick}
                                    width={150}
                                    height={150}
                                    style={{ cursor: 'pointer', objectFit: 'contain' }}
                                    id="step1"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}

                                />
                                <Link href="#">
                                    <h2 id="step2" contentEditable spellCheck={false} className={styles.sitename}>
                                        Your website
                                    </h2>
                                </Link>
                            </div>
                            <div className={styles.menu}>
                                <Link href="#why" className={styles['menu-item']}>
                                    About
                                </Link>
                                <Link href="#how" className={styles['menu-item']}>
                                    Blog
                                </Link>
                                <Link href="#end" className={styles['menu-item']}>
                                    Contact
                                </Link>
                                <Link href="#sub" className={styles['primary-button']}>
                                    Subscribe
                                </Link>
                            </div>
                        </nav>
                        <div id="last" style={{ margin: "0 auto" }}></div>
                        <div className={styles.hero}>


                            <div className={styles['hero-text']}>


                                <div id="step3">
                                    <h1 contentEditable spellCheck={false}>
                                        Lorem ipsum <span className={styles['color-effect']}>dolor</span>
                                    </h1>
                                    <p contentEditable spellCheck={false} className={styles.subtitle}>
                                        Lorem ipsum dolor sit amet,
                                        <br />
                                        consectetur adipiscing elit.
                                    </p>
                                </div>
                                <div className={styles['hero-cta']}>
                                    <Link href="#toolbar" className={styles['primary-button']} onClick={highlightToolbar}>
                                        Get Started
                                    </Link>
                                    <Link href="#how" className={styles['secondary-button']}>
                                        Know more
                                    </Link>


                                </div>
                            </div>
                            <div className={styles['hero-img']}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="652"
                                    height="644"
                                    viewBox="0 0 652 644"
                                    fill="none"
                                    className={styles.mondrian}
                                >
                                    <rect x="4.69366" y="4" width="643.306" height="636" stroke="var(--secondary)" strokeWidth="8" />
                                </svg>

                            </div>


                        </div>
                    </div>

                    <main className={styles.main}>
                        <div className={styles.part1} id="why">

                            <h2>Why US?</h2>
                            <div className={styles['part1-cards']}>
                                <div className={styles['part1-card']}>
                                    <p className={`${styles.subtitle} ${styles.highlight}`}>Lorem Ipsum</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                    <div className={styles['part1-card-bg']}></div>
                                </div>
                                <div className={styles['part1-card']}>
                                    <p className={`${styles.subtitle} ${styles.highlight}`}>Lorem Ipsum</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                    <div className={styles['part1-card-bg']}></div>
                                </div>
                                <div className={styles['part1-card']}>
                                    <p className={`${styles.subtitle} ${styles.highlight}`}>Lorem Ipsum</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                    <div className={styles['part1-card-bg']}></div>
                                </div>
                            </div>
                        </div>

                        <br />

                        <div className={styles.part2} id="how">
                            <div className={styles['part2-left']}>
                                <h2>Lorem Ipsum</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <div className={styles['part2-right']}>
                                <p className={`${styles.one} ${styles.step}`}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <p className={`${styles.two} ${styles.step}`}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <p className={`${styles.three} ${styles.step}`}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    <br /> <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                                <p className={`${styles.four} ${styles.step}`}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        </div>

                        <br />

                        <div className={styles.part5} id="end">
                            <h1>
                                Your <span className={styles['color-effect']}>Journey</span> Shouldn’t End Here.
                            </h1>
                            <p className={styles.subtitle}>Follow us and stay tuned on more...</p>
                            <Link href="#" className={styles['primary-button']}>
                                Stay Tuned
                            </Link>
                        </div>

                        <div className={styles.footer} id="footer">
                            <div className={styles['footer-cols']}>
                                <div className={styles['footer-col']}>
                                    <p style={{ margin: 0 }}>Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className={styles['footer-col']}>
                                    <Link href="#home" className={`${styles['menu-item']} ${styles.reversed}`}>
                                        Home
                                    </Link>
                                    <Link href="#why" className={`${styles['menu-item']} ${styles.reversed}`}>
                                        About
                                    </Link>
                                    <Link href="#how" className={`${styles['menu-item']} ${styles.reversed}`}>
                                        Blog
                                    </Link>
                                    <Link href="#end" className={`${styles['menu-item']} ${styles.reversed}`}>
                                        Contact
                                    </Link>
                                </div>
                                <div className={styles['footer-col']}>
                                    <Link href="#x" className={`${styles['menu-item']} ${styles.reversed}`}>
                                        X
                                    </Link>
                                    <Link href="#facebook" className={`${styles['menu-item']} ${styles.reversed}`}>
                                        Facebook
                                    </Link>
                                    <Link href="#youtube" className={`${styles['menu-item']} ${styles.reversed}`}>
                                        YouTube
                                    </Link>
                                    <Link href="#insta" className={`${styles['menu-item']} ${styles.reversed}`}>
                                        Instagram
                                    </Link>
                                </div>
                            </div>
                            <Link href="/Home/Services">
                                <p className={styles.sub}>Powered by SMLNEXGEN</p>
                            </Link>
                        </div>

                        <div className={styles.toolbar} id="toolbar">
                            <div className={`${styles.option} ${styles.prim} ${styles.rollout}`}>
                                <input
                                    type="color"
                                    id="prim"
                                    name="prim"
                                    className={styles.colorpicker}
                                    defaultValue="#000000"
                                />
                                <label htmlFor="prim">Text</label>
                            </div>
                            <div className={`${styles.option} ${styles.sec} ${styles.rollout}`}>
                                <input
                                    type="color"
                                    id="sec"
                                    name="sec"
                                    className={styles.colorpicker}
                                    defaultValue="#ffffff"
                                />
                                <label htmlFor="sec">Background</label>
                            </div>
                            <div className={`${styles.option} ${styles.primbuttn} ${styles.rollout}`}>
                                <input
                                    type="color"
                                    id="primbuttn"
                                    name="primbuttn"
                                    className={styles.colorpicker}
                                    defaultValue="#4685FF"
                                />
                                <label htmlFor="primbuttn">Primary Button</label>
                            </div>
                            <div className={`${styles.option} ${styles.secbuttn} ${styles.rollout}`}>
                                <input
                                    type="color"
                                    id="secbuttn"
                                    name="secbuttn"
                                    className={styles.colorpicker}
                                    defaultValue="#F2F2F2"
                                />
                                <label htmlFor="secbuttn">Secondary Button</label>
                            </div>
                            <div className={`${styles.option} ${styles.accent} ${styles.rollout}`}>
                                <input
                                    type="color"
                                    id="accent"
                                    name="accent"
                                    className={styles.colorpicker}
                                    defaultValue="#FFB084"
                                />
                                <label htmlFor="accent">Accent</label>
                            </div>
                            <div className={`${styles.option} ${styles.export} ${styles.rollout}`} id="export">
                                <div id="step4">Export</div>
                            </div>
                            <div className={`${styles.option} ${styles.randomize} ${styles.rollout}`} id="randomize">
                                <div>Randomize</div>
                            </div>
                            <div className={`${styles.option} ${styles.rolloutbutton}`} id="rolloutbutton">
                                <div className={styles.rolloutbutton}>Expand</div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}