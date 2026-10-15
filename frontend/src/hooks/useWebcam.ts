import { useRef, useState, useCallback, useEffect } from "react";

export function useWebcam() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsActive(true);
    } catch (err) {
      setError("Could not access webcam. Check browser permissions.");
      setIsActive(false);
    }
  }, []);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsActive(false);
  }, []);

  function captureFrame(): Promise<{ file: File; previewUrl: string } | null> {
    return new Promise((resolve) => {
      const video = videoRef.current;
      if (!video || !video.videoWidth) {
        resolve(null);
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(video, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
        const previewUrl = URL.createObjectURL(blob);
        resolve({ file, previewUrl });
      }, "image/jpeg", 0.9);
    });
  }

  
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return { videoRef, isActive, error, start, stop, captureFrame };
}
