import {
    ContactShadows,
    Environment,
    PerspectiveCamera,
    PresentationControls,
} from '@react-three/drei';
import { ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import type { NextPage } from 'next';
import { useRef } from 'react';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

function Watch(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Group>(null!);
    const material = useLoader(MTLLoader, '/burger.mtl');
    const obj = useLoader(OBJLoader, '/burger.obj', (loader) => {
        material.preload();
        loader.setMaterials(material);
    });

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
        ref.current.rotation.y = Math.sin(t / 4) / 8;
        ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });

    return (
        <group ref={ref}>
            <primitive object={obj}></primitive>
        </group>
    );
}

const WatchScene: NextPage = () => {
    return (
        <>
            <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
                <Watch rotation={[0, 0, 0]} position={[0, 0, 0]} scale={1} />
            </PresentationControls>
            <PerspectiveCamera
                makeDefault
                fov={60}
                near={0.1}
                far={1000}
                position={[0, 0, 2]}
                rotation={[0, 0, 0]}
            />

            <ContactShadows
                position={[0, -1.4, 0]}
                opacity={0.75}
                scale={10}
                blur={2.5}
                far={4}
            />
        </>
    );
};

export default WatchScene;
