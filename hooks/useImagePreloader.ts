import { useEffect, useState } from 'react';

export function useImagePreloader(totalFrames: number) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Path based on moved assets: /sequence-1/ezgif-frame-001.jpg
      img.src = `/sequence-1/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) setIsReady(true);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
        loadedCount++;
        setProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) setIsReady(true);
      }
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [totalFrames]);

  return { images, isReady, progress };
}
