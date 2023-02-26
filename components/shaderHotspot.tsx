import { extend, ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import HotspotMaterial from 'materials/hotspotMaterial';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

extend({ HotspotMaterial });

const ShaderHotspot = (props: ThreeElements['mesh']) => {
    const ref = useRef<THREE.ShaderMaterial>(null!);
    const [hovered, setHovered] = useState(false);

    const [noiseMap] = useLoader(THREE.TextureLoader, ['/noiseTexture.jpg']);

    noiseMap.wrapT = THREE.RepeatWrapping;
    noiseMap.wrapS = THREE.RepeatWrapping;

    useEffect(() => {
        ref.current.uniforms.uTexture.value = noiseMap;
        ref.current.uniforms.uColor.value = new THREE.Color(4, 4, 3);
    });

    useFrame(({ clock }) => {
        ref.current.uniforms.uTime.value =
            clock.getElapsedTime() * (hovered ? 0.4 : 0.2);
        ref.current.uniforms.uThrust.value = hovered ? 0.35 : 0.3;
    });

    return (
        <group dispose={null}>
            <mesh
                {...props}
                rotation={[Math.PI / 2, 0, 0]}
                onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
                onPointerOut={() => setHovered(false)}
            >
                <cylinderBufferGeometry args={[1, 1, 5, 32, 1, true]} />
                <hotspotMaterial
                    ref={ref}
                    attach="material"
                    key={HotspotMaterial.key}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

export default ShaderHotspot;
