'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';

export default function CameraTest() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user'); // Default to front camera
    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
    const [errorLog, setErrorLog] = useState<string | null>(null);

    // Wrap camera initialization in a reusable function
    const startCamera = useCallback(async (mode: 'user' | 'environment') => {
        try {
            setErrorLog(null);

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: mode },
                audio: false,
            });

            setStream(mediaStream);
            streamRef.current = mediaStream;
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err: any) {
            console.error("Camera access failed:", err);
            setErrorLog(`${err.name}: ${err.message}`);
        }
    }, []);

    // Safely stop all tracks on the active stream
    const stopCurrentStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
            setStream(null);
        }
    }, []);

    // Restart camera whenever the facingMode state changes
    useEffect(() => {
        startCamera(facingMode);

        return () => {
            // Cleanup when component unmounts
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [facingMode]); // Re-runs every time facingMode updates

    // Function to switch camera states
    const toggleCamera = () => {
        stopCurrentStream(); // 1. Kill current stream hardware access
        setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user')); // 2. Trigger re-render with new lens
    };

    const captureLocalPhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (!blob) return;
            if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);

            const localUrl = URL.createObjectURL(blob);
            setLocalPreviewUrl(localUrl);
        }, 'image/png');
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold">Camera Lens Toggle Test</h2>

            {errorLog && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm w-full">
                    <strong>Hardware Error:</strong> {errorLog}
                </div>
            )}

            <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex justify-between items-center w-full">
                    <span className="text-xs text-gray-500 font-mono">
                        CURRENT: {facingMode.toUpperCase()} CAMERA
                    </span>
                    {/* Lens Switcher Button */}
                    <button
                        onClick={toggleCamera}
                        className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-medium transition-colors"
                    >
                        🔄 Switch Lens
                    </button>
                </div>

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    /* Only apply mirror effect CSS class when utilizing the front selfie camera */
                    className={`w-full rounded-lg bg-black border border-gray-300 ${facingMode === 'user' ? 'transform -scale-x-100' : ''
                        }`}
                />
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <button
                onClick={captureLocalPhoto}
                disabled={!!errorLog}
                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors disabled:bg-gray-300"
            >
                Trigger Snapshot
            </button>

            {localPreviewUrl && (
                <div className="flex flex-col items-center gap-2 w-full border-t pt-4 mt-2">
                    <span className="text-xs text-emerald-600 font-bold font-mono">CAPTURED IMAGE</span>
                    <Image
                        src={localPreviewUrl}
                        alt="Local Test Snapshot File"
                        width={800} // required
                        height={600} // required
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