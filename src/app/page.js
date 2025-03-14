//Preloader.jsx
"use client";

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Preloader.module.css';

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [codeProgress, setCodeProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('typing');
  const [displayedCode, setDisplayedCode] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [logMessages, setLogMessages] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Refs for auto-scrolling
  const codeContainerRef = useRef(null);
  const logsContainerRef = useRef(null);

  // Maximum number of logs to show at once (for performance)
  const MAX_VISIBLE_LOGS = 30;

  // Simplified code snippet that auto-scrolls
  const codeSnippet = [
    '<span class="' + styles.comment + '">// SML NexGen Website Initializer</span>',
    '<span class="' + styles.keyword + '">import</span> { createApp } <span class="' + styles.keyword + '">from</span> <span class="' + styles.string + '">\'@smlnexgen/core\'</span>;',
    '<span class="' + styles.keyword + '">import</span> { components, services } <span class="' + styles.keyword + '">from</span> <span class="' + styles.string + '">\'./modules\'</span>;',
    '',
    '<span class="' + styles.keyword + '">async function</span> <span class="' + styles.function + '">initializeApp</span>() {',
    '  <span class="' + styles.comment + '">// Load essential components</span>',
    '  <span class="' + styles.keyword + '">const</span> app = createApp({',
    '    debug: <span class="' + styles.keyword + '">false</span>,',
    '    mode: <span class="' + styles.string + '">\'production\'</span>',
    '  });',
    '',
    '  <span class="' + styles.comment + '">// Register core services</span>',
    '  app.use(services.router);',
    '  app.use(services.state);',
    '  app.use(services.analytics);',
    '',
    '  <span class="' + styles.comment + '">// Load UI components</span>',
    '  <span class="' + styles.keyword + '">await</span> app.loadComponents(components);',
    '',
    '  <span class="' + styles.keyword + '">return</span> app;',
    '}',
    '',
    '(<span class="' + styles.keyword + '">async</span> () => {',
    '  <span class="' + styles.keyword + '">try</span> {',
    '    <span class="' + styles.keyword + '">const</span> app = <span class="' + styles.keyword + '">await</span> initializeApp();',
    '    <span class="' + styles.keyword + '">await</span> app.mount(<span class="' + styles.string + '">\'#root\'</span>);',
    '    console.log(<span class="' + styles.string + '">\'SML NexGen application launched\'</span>);',
    '  } <span class="' + styles.keyword + '">catch</span> (error) {',
    '    console.error(<span class="' + styles.string + '">\'Failed to start:\'</span>, error);',
    '  }',
    '})();'
  ];

  // Enhanced log message sequence with more detailed outputs
  const systemLogs = [
    { text: 'Analyzing dependencies...', delay: 200, className: styles.command },
    { text: 'Found 24 dependencies, resolving...', delay: 100, className: styles.info },
    { text: 'Loading modules...', delay: 150, className: styles.command },
    { text: 'Core modules loaded successfully', delay: 125, className: styles.success },
    { text: 'Initializing components...', delay: 150, className: styles.command },
    { text: '> UI components initialized', delay: 100, className: styles.info },
    { text: '> Data services initialized', delay: 100, className: styles.info },
    { text: 'Compiling...', delay: 200, className: styles.command },
    { text: 'Transpiling TypeScript...', delay: 125, className: styles.info },
    { text: 'Processing SASS...', delay: 125, className: styles.info },
    { text: 'Minifying assets...', delay: 125, className: styles.info },
    { text: 'Compilation successful', delay: 150, className: styles.success },
    { text: 'Optimizing bundle...', delay: 150, className: styles.command },
    { text: 'Tree shaking unused code...', delay: 125, className: styles.info },
    { text: 'Compressing assets...', delay: 125, className: styles.info },
    { text: 'Build successful', delay: 150, className: styles.success },
    { text: 'Bundle size: 247.3KB (82.4KB gzipped)', delay: 150, className: styles.info },
    { text: 'Launching SML NexGen...', delay: 200, className: styles.highlight }
  ];

  // Improved auto-scroll function with error handling
  const scrollToBottom = (ref) => {
    try {
      if (ref && ref.current) {
        // Using requestAnimationFrame to ensure DOM is updated
        window.requestAnimationFrame(() => {
          ref.current.scrollTop = ref.current.scrollHeight;
        });
      }
    } catch (error) {
      console.error("Error during scroll operation:", error);
    }
  };

  // useLayoutEffect ensures DOM updates complete before scrolling
  useLayoutEffect(() => {
    scrollToBottom(logsContainerRef);
  }, [logMessages]);

  // Effect for scrolling code container when code is updated
  useLayoutEffect(() => {
    scrollToBottom(codeContainerRef);
  }, [displayedCode]);

  // Manage log messages with queue system
  const addLogMessage = (log) => {
    setLogMessages(prevLogs => {
      // Keep only the most recent logs if we exceed our maximum
      const newLogs = [...prevLogs, log];
      if (newLogs.length > MAX_VISIBLE_LOGS) {  
        return newLogs.slice(newLogs.length - MAX_VISIBLE_LOGS);
      }
      return newLogs;
    });
  };

  const router = useRouter();

  // Animation logic
  useEffect(() => {
    if (!visible) return;

    // Type code effect with improved timing
    const typeCode = () => {
      let currentPos = 0;
      let fullCode = '';
      let codeInterval;

      const typeNextChar = () => {
        if (currentPos < codeSnippet.length) {
          fullCode += codeSnippet[currentPos] + '\n';
          setDisplayedCode(fullCode);
          currentPos++;
          
          // Update progress percentage
          setCodeProgress(Math.floor((currentPos / codeSnippet.length) * 100));
          
          // Variable typing speed for more realism
          const typingDelay = Math.random() < 0.2 ? 50 : 20; // Reduced from 100/40 to 50/20
          codeInterval = setTimeout(typeNextChar, typingDelay);
        } else {
          // Move to compilation phase
          setCurrentPhase('compiling');
          showLogMessages();
        }
      };
      
      codeInterval = setTimeout(typeNextChar, 100);
      
      return () => clearTimeout(codeInterval);
    };
    
    // Show log messages sequence with improved timing management
    const showLogMessages = () => {
      let totalDelay = 0;
      
      // Add initial prompt message
      setTimeout(() => {
        addLogMessage({ text: 'npm run build', className: styles.prompt });
      }, 100);
      
      // Schedule all log messages with proper delays
      systemLogs.forEach((log, index) => {
        totalDelay += log.delay;
        
        setTimeout(() => {
          addLogMessage(log);
          setLoadingProgress(Math.floor(((index + 1) / systemLogs.length) * 100));
          
          // If it's the last message, prepare to fade out
          if (index === systemLogs.length - 1) {
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(() => {
                setVisible(false);
                router.push('/Home');
              }, 400); // Reduced to 400ms
            }, 300); // Reduced to 300ms
          }
        }, totalDelay);
      });
    };
    
    // Start the animation sequence
    typeCode();
    
    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.ideContainer}>
        <div className={styles.ideHeader}>
          <div className={styles.windowControls}>
            <span className={`${styles.control} ${styles.close}`}></span>
            <span className={`${styles.control} ${styles.minimize}`}></span>
            <span className={`${styles.control} ${styles.maximize}`}></span>
          </div>
          <div className={styles.ideTitle}>SML NexGen Builder</div>
          <div className={styles.ideStatus}>
            <div className={`${styles.statusIndicator} ${currentPhase === 'compiling' ? styles.active : ''}`}></div>
            <span className={styles.statusText}>{currentPhase === 'typing' ? 'Analyzing' : 'Building'}</span>
          </div>
        </div>
        
        <div className={styles.ideBody}>
          <div className={styles.editorPane}>
            <div className={styles.fileTabs}>
              <div className={`${styles.fileTab} ${styles.active}`}>main.js</div>
              <div className={styles.fileTab}>config.json</div>
              <div className={styles.fileTab}>styles.scss</div>
            </div>
            <div className={styles.codeBody} ref={codeContainerRef}>
              <pre>
                <code dangerouslySetInnerHTML={{ __html: displayedCode }} />
                {currentPhase === 'typing' && <span className={styles.cursor}>|</span>}
              </pre>
            </div>
          </div>
          
          <div className={styles.terminalPane}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalTitle}>Console</span>
              <div className={styles.terminalControls}>
                <span className={styles.terminalControl}>Clear</span>
                <span className={styles.terminalControl}>Filter</span>
              </div>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalLogsContainer}>
                <div className={styles.terminalLogs} ref={logsContainerRef}>
                  {logMessages.map((log, index) => (
                    <div key={index} className={`${styles.logLine} ${log.className || ''}`} data-index={index}>
                      {log.text}
                    </div>
                  ))}
                  {currentPhase === 'compiling' && 
                    <div className={`${styles.logLine} ${styles.promptActive}`}>
                      <span className={styles.promptCaret}>$</span>
                      <span className={styles.promptBlink}>_</span>
                    </div>
                  }
                </div>
              </div>
              
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>
                  {currentPhase === 'typing' ? 'Code Analysis' : 'Build Progress'}
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ 
                      width: `${currentPhase === 'typing' ? codeProgress : loadingProgress}%` 
                    }}
                  ></div>
                </div>
                <div className={styles.progressPercentage}>
                  {currentPhase === 'typing' ? codeProgress : loadingProgress}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;