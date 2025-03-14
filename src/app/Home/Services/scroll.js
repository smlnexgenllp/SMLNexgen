'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './scroll.module.css';

export default function Scroll() {
  useEffect(() => {
    // Set defaults: light theme, animate, snap, scrollbar, no debug
    const root = document.documentElement;
    root.classList.add(styles.localThemeLight, styles.localSyncScrollbar, styles.localAnimate, styles.localSnap);
    root.style.setProperty('--start', '0');
    root.style.setProperty('--hue', '0');
    root.style.setProperty('--end', '360');
    root.style.setProperty('--base-chroma', '0.3'); // Add this if you need it globally
    root.dataset.debug = 'false';

    // Fallback animations for browsers without CSS scroll-linked animations
    if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
      gsap.registerPlugin(ScrollTrigger);
      const items = gsap.utils.toArray(`.${styles.localListItem}`);
      gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

      const dimmer = gsap.timeline()
        .to(items.slice(1), { opacity: 1, stagger: 0.5 })
        .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: dimmer,
        scrub: 0.2,
      });

      const scroller = gsap.timeline().fromTo(
        root,
        { '--hue': '0' },
        { '--hue': '360', ease: 'none' }
      );

      ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: scroller,
        scrub: 0.2,
      });

      gsap.fromTo(
        root,
        { '--chroma': 0 },
        {
          '--chroma': 0.3,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[0],
            start: 'center center+=40',
            end: 'center center',
          },
        }
      );

      gsap.fromTo(
        root,
        { '--chroma': 0.3 },
        {
          '--chroma': 0,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[items.length - 2],
            start: 'center center',
            end: 'center center-=40',
          },
        }
      );
    }
  }, []);
  return (
    <div>
      <header className={styles.localHeader}>
        <div className={styles.box}>
          <p className={styles.text}>Our services...</p>
        </div>
      </header>
      <main className={styles.localMain}>
        <section className={`${styles.localSectionFirst} ${styles.localFluid}`}>
          <h2 className={styles.localH2} style={{ fontSize: '100px' }}>
            <span aria-hidden="true">we can </span>
            <span className={styles.localSrOnly}>you can ship things.</span>
          </h2>
          <ul className={`${styles.localList} ${styles.localAnimate}`} aria-hidden="true" style={{ '--count': 22 }}>
            {Array.from({ length: 22 }, (_, i) => (
              <li key={i} className={styles.localListItem} style={{ '--i': i, fontSize: '100px' }}>
                {['design', 'prototype', 'solve', 'build', 'develop', 'debug', 'learn', 'cook', 'ship', 'prompt', 'collaborate', 'create', 'inspire', 'follow', 'innovate', 'test', 'optimize', 'teach', 'visualize', 'transform', 'scale', 'do it'][i]}.
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}