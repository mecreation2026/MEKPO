import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 260;

const getFrameUrl = (index: number) => {
  const padded = String(index).padStart(3, '0');
  return `/frame/ezgif-frame-${padded}.jpg`;
};

export const ScrollFrameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(1);
  const [currentFallbackSrc, setCurrentFallbackSrc] = useState<string>('/frame/ezgif-frame-001.jpg');

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // 1. Initialize image pool
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        if (isMounted) {
          loadedFramesRef.current.add(i);
          if (i === 1 && lastDrawnFrameRef.current === 1) {
            draw(1);
          }
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // Progressive loader: Load initial critical frames immediately, then batch the rest
    const preloadFrames = () => {
      // Priority 1: First 35 frames for instantaneous responsiveness on load
      for (let i = 1; i <= Math.min(35, TOTAL_FRAMES); i++) {
        images[i - 1].src = getFrameUrl(i);
      }

      // Priority 2: Key milestone frames across the entire timeline
      for (let i = 36; i <= TOTAL_FRAMES; i += 10) {
        images[i - 1].src = getFrameUrl(i);
      }

      // Priority 3: Fill the remaining frames in background idle batches
      let nextBatchIndex = 36;
      const loadNextBatch = () => {
        if (!isMounted || nextBatchIndex > TOTAL_FRAMES) return;
        const batchEnd = Math.min(nextBatchIndex + 15, TOTAL_FRAMES);
        for (let i = nextBatchIndex; i <= batchEnd; i++) {
          if (!images[i - 1].src) {
            images[i - 1].src = getFrameUrl(i);
          }
        }
        nextBatchIndex = batchEnd + 1;
        if (nextBatchIndex <= TOTAL_FRAMES) {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(loadNextBatch, { timeout: 300 });
          } else {
            setTimeout(loadNextBatch, 80);
          }
        }
      };

      setTimeout(loadNextBatch, 150);
    };

    preloadFrames();

    // Helper to find the nearest loaded frame if current target frame is still pending
    const findNearestLoadedFrame = (target: number): number => {
      if (loadedFramesRef.current.has(target)) return target;
      let minDiff = Infinity;
      let bestFrame = lastDrawnFrameRef.current || 1;
      for (const loaded of loadedFramesRef.current) {
        const diff = Math.abs(loaded - target);
        if (diff < minDiff) {
          minDiff = diff;
          bestFrame = loaded;
        }
      }
      return bestFrame;
    };

    // Draw frame to canvas with aspect-ratio cover math
    const draw = (frameIndex: number) => {
      if (!canvas || !ctx) return;
      const safeIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIndex)));
      const renderIndex = findNearestLoadedFrame(safeIndex);
      const img = imagesRef.current[renderIndex - 1];

      if (img && img.complete && img.naturalWidth > 0) {
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Perfect cover aspect ratio
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
        lastDrawnFrameRef.current = renderIndex;
      }
    };

    // Responsive Canvas resize matching exact window size with pixel ratio
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      draw(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Draw first frame immediately
    draw(1);

    // Scroll listener for calculating target frame
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 60fps RAF loop with smooth lerp interpolation
    let rafId: number;
    const updateLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.12;
        const rounded = Math.round(currentFrameRef.current);
        draw(rounded);
        setCurrentFallbackSrc(getFrameUrl(rounded));
      } else if (currentFrameRef.current !== targetFrameRef.current) {
        currentFrameRef.current = targetFrameRef.current;
        const rounded = Math.round(currentFrameRef.current);
        draw(rounded);
        setCurrentFallbackSrc(getFrameUrl(rounded));
      }
      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none">
      {/* Instant Fallback Background Image (Zero Flash) */}
      <img
        src={currentFallbackSrc}
        alt="MEKPO Technologies Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="eager"
      />

      {/* HTML5 2D Hardware-Accelerated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />

      {/* Cinematic Vignette & Readability Gradient Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/55 via-black/25 to-black/75 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60 pointer-events-none" />

      {/* Targeted Bottom-Right Ambient Vignette & Defusion (Conceals AI frame watermark) */}
      <div className="absolute bottom-0 right-0 w-80 md:w-[450px] h-64 md:h-[350px] bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0.45)_50%,_transparent_80%)] pointer-events-none z-[2]" />
    </div>
  );
};