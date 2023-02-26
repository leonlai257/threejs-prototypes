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
} from '@react-three/drei';
import VideoMaterial from 'materials/videoMaterial';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { DoubleSide } from 'three';

function FallbackMaterial({ url }: { url: string }) {
    const texture = useTexture(url);
    return (
        <meshBasicMaterial map={texture} toneMapped={false} side={DoubleSide} />
    );
}

const WorldScene = () => {
    const [scene, setScene] = useState<THREE.Scene>(null!);

    const materials = useTexture({ map: '/sheko.jpg' });

    return (
        <mesh ref={scene}>
            <sphereBufferGeometry args={[1, 64, 64]} />
            <Suspense fallback={<FallbackMaterial url="/sheko.jpg" />}>
                <VideoMaterial url="desert.mp4" />
            </Suspense>
            {/* <meshStandardMaterial
        attach="material"
        color={0xffffff}
        side={DoubleSide}
        map={materials.map}
      /> */}
        </mesh>
    );
};

export default WorldScene;
