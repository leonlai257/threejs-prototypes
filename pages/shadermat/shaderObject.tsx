import { shaderMaterial, useTexture } from '@react-three/drei';
import { extend, useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { AdditiveBlending } from 'three';
import { Blending } from 'three';
import { waveFragment, waveVertex } from './waveShader';

const TestShaderMaterial = shaderMaterial(
    {
        blending: THREE.AdditiveBlending,
        // blending: THREE.CustomBlending,
        // blendSrcAlpha: 0.5,
        uTime: 0,
        uColor: new THREE.Color(0.0, 0.0, 0.0),
        uTexture: new THREE.Texture(),
        uTextureTiling: 3.2,
    },
    waveVertex,
    waveFragment
);

extend({ TestShaderMaterial });

const ShaderObject = () => {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        ref.current.uTime = clock.getElapsedTime();
    });

    const noiseTiling = 3.2;
    const noiseSpeed = 1;

    const [noiseMap] = useLoader(THREE.TextureLoader, ['/noiseTexture.png']);

    noiseMap.wrapT = THREE.RepeatWrapping;
    noiseMap.wrapS = THREE.RepeatWrapping;
    // noiseMap.repeat = new THREE.Vector2(noiseTiling, noiseTiling * 0.2);
    // useFrame(() => {
    //     noiseMap.offset.x += (noiseSpeed * 0.3) / 60;
    //     noiseMap.offset.y -= noiseSpeed / 60;
    // });
    return (
        <>
            <mesh position={[1, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <coneBufferGeometry args={[0.18, 1, 32]} />
                <testShaderMaterial
                    ref={ref}
                    alphaTest={0.5}
                    uColor={'hotpink'}
                    uTexture={noiseMap}
                />
                {/* <meshStandardMaterial
                    color={'hotpink'}
                    alphaMap={noise}
                    alphaTest={0.28}
                /> */}
            </mesh>
        </>
    );
};

export default ShaderObject;
