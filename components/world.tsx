import { useDetectGPU } from '@react-three/drei';
import { TierResult } from 'detect-gpu';
import VideoMaterial from 'materials/videoMaterial';
import ImageMaterial from 'materials/imageMaterial';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

export interface WorldProps {
    radius: number;
    imageUrl: string;
    videoUrl: string;
    videoUrlLowRes: string;
}

const defaultProps = {
    radius: 1,
    imageUrl: '',
    videoUrl: '',
    videoUrlLowRes: '',
};

const World = (props: Partial<WorldProps>) => {
    const GPUTier: TierResult = useDetectGPU();

    const scene = useRef<THREE.Mesh>(null);
    props = { ...defaultProps, ...props };
    let videoUrl = props.videoUrl || '';
    const isLowerTier = GPUTier.tier === 0 || GPUTier.isMobile;
    if (props.videoUrlLowRes && isLowerTier) {
        videoUrl = props.videoUrlLowRes || '';
    }

    return (
        <mesh ref={scene} scale={[-1, 1, 1]}>
            <sphereGeometry args={[props.radius, 128, 32]} />
            <Suspense fallback={<ImageMaterial url={props.imageUrl || ''} />}>
                <VideoMaterial url={videoUrl} />
            </Suspense>
        </mesh>
    );
};

export default World;
