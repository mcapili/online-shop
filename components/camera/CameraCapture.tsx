'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function CameraTest() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [errorLog, setErrorLog] = useState<string | null>(null);

  // 1. Initialize camera stream on mount
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function startCamera() {
      try {
        setErrorLog(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }, // Use 'environment' for rear mobile camera
          audio: false,
        });

        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err: any) {
        console.error("Camera access failed:", err);
        setErrorLog(`${err.name}: ${err.message}`);
      }
    }

    startCamera();

    // Clean up hardware usage when navigating away
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 2. Capture frame locally without database uploads
  const captureLocalPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Lock canvas dimensions to current video frame size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the static frame matrix onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas matrix to a temporary browser local URL object
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      // Clean up previous local URL memory leaks if they exist
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }

      const localUrl = URL.createObjectURL(blob);
      setLocalPreviewUrl(localUrl);
    }, 'image/png');
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Camera Capability Test</h2>

      {/* Error Alert Display */}
      {errorLog && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm w-full">
          <strong>Hardware Error:</strong> {errorLog}
        </div>
      )}

      {/* Live Video Preview Box */}
      <div className="flex flex-col items-center gap-2 w-full">
        <span className="text-xs text-gray-500 font-mono">LIVE CAMERA FEED</span>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full rounded-lg bg-black transform -scale-x-100 border border-gray-300" 
        />
      </div>

      {/* Hidden Canvas Used Only For Framing Processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hardware Trigger Action */}
      <button
        onClick={captureLocalPhoto}
        disabled={!!errorLog}
        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors disabled:bg-gray-300"
      >
        Trigger Snapshot
      </button>

      {/* Local Capture Testing Preview Output */}
      {localPreviewUrl && (
        <div className="flex flex-col items-center gap-2 w-full border-t pt-4 mt-2">
          <span className="text-xs text-emerald-600 font-bold font-mono">CAPTURED IMAGE BLOB RESULTS</span>
          <Image
            src={localPreviewUrl as string}
            alt="Local Test Snapshot File"
            width={640}
            height={480}
            unoptimized
            className="w-full rounded-lg border border-emerald-400 object-cover"
          />
          <button 
            onClick={() => setLocalPreviewUrl(null)}
            className="text-xs text-gray-500 underline mt-1"
          >
            Clear Preview
          </button>
        </div>
      )}
    </div>
  );
}
