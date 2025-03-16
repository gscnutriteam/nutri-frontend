"use client";
import React, { useEffect, useRef, useState } from "react";
import { Camera, type CameraType } from "react-camera-pro";
import {
	ArrowLeft,
	Upload,
	Camera as CameraIcon,
	RefreshCw,
	Zap,
	Loader,
} from "lucide-react";
import { ScanPhase, useScanStore } from "../store/scan_store";
import { ScanLoading } from "./scan_loading";
import imageUtils from "../util/image";
import { useAppRouter } from "@/hooks/useAppRouter";

export const CameraScan = () => {
	const cameraRef = useRef<CameraType | null>(null);
	const [isTorchOn, setIsTorchOn] = useState(false);
	const { isLoading } = useScanStore();
	const router = useAppRouter();

	// If loading, show only the loading component
	if (isLoading) {
		return <ScanLoading />;
	}

	return (
		<>
			<div className="absolute top-0 left-0 w-full z-10 flex justify-between items-center p-4">
				<button
					type="button"
					className="rounded-full bg-white/70 p-2"
					onClick={() => window.history.back()}
				>
					<ArrowLeft size={20} />
				</button>
			</div>

			{/* Camera Component */}
			<div className="flex-1 w-full h-full relative">
				<Camera
					ref={cameraRef}
					facingMode="environment"
					aspectRatio="cover"
					errorMessages={{
						noCameraAccessible:
							"No camera available. Please connect a camera or try a different browser.",
						permissionDenied:
							"Camera permission denied. Please refresh and allow camera access.",
						switchCamera: "Unable to switch camera. Only one camera available.",
						canvas: "Canvas not supported.",
					}}
				/>
			</div>

			{/* Bottom Camera Controls */}
			<div className="absolute bottom-20 left-0 w-full flex justify-center items-center gap-10 p-4">
				<button
					type="button"
					className="rounded-full bg-white p-4"
					onClick={() => imageUtils.handleFileUpload(router)}
				>
					<Upload size={24} />
				</button>

				<button
					type="button"
					className="rounded-full bg-white p-5"
					onClick={() => imageUtils.capturePhoto(cameraRef, router)}
				>
					<CameraIcon size={32} />
				</button>

				<button
					type="button"
					className="rounded-full bg-white p-4"
					onClick={() => imageUtils.switchCamera(cameraRef)}
				>
					<RefreshCw size={24} />
				</button>
			</div>
		</>
	);
};
