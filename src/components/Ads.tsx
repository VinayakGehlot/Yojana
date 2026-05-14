import React, { useEffect, useRef } from 'react';

export const Banner728x90 = () => {
  return (
    <div className="flex justify-center w-full my-4 overflow-hidden">
      <iframe 
        srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;overflow:hidden;}</style></head><body><script>atOptions={'key':'f3ed367a0fa21b58d2688829bf3f79f1','format':'iframe','height':90,'width':728,'params':{}};</script><script src="https://www.highperformanceformat.com/f3ed367a0fa21b58d2688829bf3f79f1/invoke.js"></script></body></html>`}
        width="728" 
        height="90" 
        frameBorder="0" 
        scrolling="no" 
        title="ad"
      />
    </div>
  );
};

export const Banner468x60 = () => {
  return (
    <div className="flex justify-center w-full my-4 overflow-hidden">
      <iframe 
        srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;overflow:hidden;}</style></head><body><script>atOptions={'key':'05d8bfe521159b73adba399da484f464','format':'iframe','height':60,'width':468,'params':{}};</script><script src="https://www.highperformanceformat.com/05d8bfe521159b73adba399da484f464/invoke.js"></script></body></html>`}
        width="468" 
        height="60" 
        frameBorder="0" 
        scrolling="no" 
        title="ad"
      />
    </div>
  );
};

export const NativeBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptInjected = useRef(false);

  useEffect(() => {
    if (!containerRef.current || scriptInjected.current) return;
    
    scriptInjected.current = true;
    const script = document.createElement('script');
    script.src = 'https://pl29427787.profitablecpmratenetwork.com/2b888173e788ed50baa9aff7f287bbb9/invoke.js';
    script.async = true;
    script.dataset.cfasync = 'false';
    
    // Append to document head to avoid React DOM conflicts
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed, though often safer to leave it
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-6">
      <div id="container-2b888173e788ed50baa9aff7f287bbb9" ref={containerRef}></div>
    </div>
  );
};
