import { useCallback, useEffect, useRef, useState } from "react";

export interface Frame {
  blob: Blob;
  width: number;
  height: number;
}

export function useWebcam() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async (): Promise<boolean> => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsActive(true);
      return true;
    } catch {
      setError("Could not access the webcam. Check the browser permission and close other apps that use the camera.");
      setIsActive(false);
      return false;
    }
  }, []);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsActive(false);
  }, []);

  // One JPEG frame as a Blob (no object URL, so it can be called many times without leaking memory)
  const grabFrame = useCallback(
    () =>
      new Promise<Frame | null>((resolve) => {
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
        canvas.toBlob((blob) => resolve(blob ? { blob, width: canvas.width, height: canvas.height } : null), "image/jpeg", 0.85);
      }),
    [],
  );

  const captureFrame = useCallback(async () => {
    const frame = await grabFrame();
    if (!frame) return null;
    return {
      file: new File([frame.blob], "webcam-capture.jpg", { type: "image/jpeg" }),
      previewUrl: URL.createObjectURL(frame.blob),
    };
  }, [grabFrame]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return { videoRef, isActive, error, start, stop, grabFrame, captureFrame };
}
