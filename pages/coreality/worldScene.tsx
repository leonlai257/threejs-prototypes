import {
    Effects,
    Html,
    Stars,
    Trail,
    useKeyboardControls,
    useScroll,
    useTexture,
    useAspect,
    useVideoTexture,
    Preload,
} from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { DoubleSide } from 'three';

function VideoMaterial({ url }: { url: string }) {
    const texture = useVideoTexture(url, {
        unsuspend: 'canplay',
        playsInline: true,
        crossOrigin: 'Anonymous',
    });
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    return (
        <meshBasicMaterial
            map={texture}
            toneMapped={false}
            side={DoubleSide}
            color="white"
        />
    );
}

function FallbackMaterial({ url }: { url: string }) {
    const texture = useTexture(url);
    return (
        <meshBasicMaterial map={texture} toneMapped={false} side={DoubleSide} />
    );
}

const WorldScene = (props: { radius: number }) => {
    const { radius } = props;
    const scene = useRef<THREE.Mesh>(null!);

    return (
        <mesh ref={scene}>
            <sphereBufferGeometry args={[radius, 32, 32]} />

            <Suspense fallback={<FallbackMaterial url="/sheko.jpg" />}>
                <Preload all />
                <VideoMaterial url="/360test8k.mp4" />
            </Suspense>
        </mesh>
    );
};

export default WorldScene;
