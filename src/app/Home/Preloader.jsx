"use client";

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './Preloader.css';

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
    '<span class="comment">// SML NexGen Website Initializer</span>',
    '<span class="keyword">import</span> { createApp } <span class="keyword">from</span> <span class="string">\'@smlnexgen/core\'</span>;',
    '<span class="keyword">import</span> { components, services } <span class="keyword">from</span> <span class="string">\'./modules\'</span>;',
    '',
    '<span class="keyword">async function</span> <span class="function">initializeApp</span>() {',
    '  <span class="comment">// Load essential components</span>',
    '  <span class="keyword">const</span> app = createApp({',
    '    debug: <span class="keyword">false</span>,',
    '    mode: <span class="string">\'production\'</span>',
    '  });',
    '',
    '  <span class="comment">// Register core services</span>',
    '  app.use(services.router);',
    '  app.use(services.state);',
    '  app.use(services.analytics);',
    '',
    '  <span class="comment">// Load UI components</span>',
    '  <span class="keyword">await</span> app.loadComponents(components);',
    '',
    '  <span class="keyword">return</span> app;',
    '}',
    '',
    '(<span class="keyword">async</span> () => {',
    '  <span class="keyword">try</span> {',
    '    <span class="keyword">const</span> app = <span class="keyword">await</span> initializeApp();',
    '    <span class="keyword">await</span> app.mount(<span class="string">\'#root\'</span>);',
    '    console.log(<span class="string">\'SML NexGen application launched\'</span>);',
    '  } <span class="keyword">catch</span> (error) {',
    '    console.error(<span class="string">\'Failed to start:\'</span>, error);',
    '  }',
    '})();'
  ];

  // Enhanced log message sequence with more detailed outputs
  const systemLogs = [
    { text: 'Analyzing dependencies...', delay: 200, className: 'command' },
    { text: 'Found 24 dependencies, resolving...', delay: 100, className: 'info' },
    { text: 'Loading modules...', delay: 150, className: 'command' },
    { text: 'Core modules loaded successfully', delay: 125, className: 'success' },
    { text: 'Initializing components...', delay: 150, className: 'command' },
    { text: '> UI components initialized', delay: 100, className: 'info' },
    { text: '> Data services initialized', delay: 100, className: 'info' },
    { text: 'Compiling...', delay: 200, className: 'command' },
    { text: 'Transpiling TypeScript...', delay: 125, className: 'info' },
    { text: 'Processing SASS...', delay: 125, className: 'info' },
    { text: 'Minifying assets...', delay: 125, className: 'info' },
    { text: 'Compilation successful', delay: 150, className: 'success' },
    { text: 'Optimizing bundle...', delay: 150, className: 'command' },
    { text: 'Tree shaking unused code...', delay: 125, className: 'info' },
    { text: 'Compressing assets...', delay: 125, className: 'info' },
    { text: 'Build successful', delay: 150, className: 'success' },
    { text: 'Bundle size: 247.3KB (82.4KB gzipped)', delay: 150, className: 'info' },
    { text: 'Launching SML NexGen...', delay: 200, className: 'highlight' }
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
        addLogMessage({ text: 'npm run build', className: 'prompt' });
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
              setTimeout(() => setVisible(false), 400); // Reduced to 400ms
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
    <div className={`preloader ${fadeOut ? 'fade-out' : ''}`}>
      <div className="ide-container">
        <div className="ide-header">
          <div className="window-controls">
            <span className="control close"></span>
            <span className="control minimize"></span>
            <span className="control maximize"></span>
          </div>
          <div className="ide-title">SML NexGen Builder</div>
          <div className="ide-status">
            <div className={`status-indicator ${currentPhase === 'compiling' ? 'active' : ''}`}></div>
            <span className="status-text">{currentPhase === 'typing' ? 'Analyzing' : 'Building'}</span>
          </div>
        </div>
        
        <div className="ide-body">
          <div className="editor-pane">
            <div className="file-tabs">
              <div className="file-tab active">main.js</div>
              <div className="file-tab">config.json</div>
              <div className="file-tab">styles.scss</div>
            </div>
            <div className="code-body" ref={codeContainerRef}>
              <pre>
                <code dangerouslySetInnerHTML={{ __html: displayedCode }} />
                {currentPhase === 'typing' && <span className="cursor">|</span>}
              </pre>
            </div>
          </div>
          
          <div className="terminal-pane">
            <div className="terminal-header">
              <span className="terminal-title">Console</span>
              <div className="terminal-controls">
                <span className="terminal-control">Clear</span>
                <span className="terminal-control">Filter</span>
              </div>
            </div>
            <div className="terminal-body">
              <div className="terminal-logs-container">
                <div className="terminal-logs" ref={logsContainerRef}>
                  {logMessages.map((log, index) => (
                    <div key={index} className={`log-line ${log.className || ''}`} data-index={index}>
                      {log.text}
                    </div>
                  ))}
                  {currentPhase === 'compiling' && 
                    <div className="log-line prompt-active">
                      <span className="prompt-caret">$</span>
                      <span className="prompt-blink">_</span>
                    </div>
                  }
                </div>
              </div>
              
              <div className="progress-container">
                <div className="progress-label">
                  {currentPhase === 'typing' ? 'Code Analysis' : 'Build Progress'}
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${currentPhase === 'typing' ? codeProgress : loadingProgress}%` 
                    }}
                  ></div>
                </div>
                <div className="progress-percentage">
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