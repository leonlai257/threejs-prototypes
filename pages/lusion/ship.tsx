import React, { useRef } from 'react';
import { ThreeElements, useLoader } from '@react-three/fiber';
import { useGLTF, useTexture, Trail } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import Rig from './rig';

const SpaceShip = (props: ThreeElements['mesh']) => {
    const { nodes, materials } = useGLTF('/Striker.gltf');
    // const materials = useTexture({ map: '/Striker_Blue.png' });

    const spaceship = useRef<THREE.Group>(null!);

    return (
        <Rig>
            <Trail
                local={false}
                length={20}
                decay={1}
                attenuation={(t) => t * t}>
                <group ref={spaceship} {...props} dispose={null}>
                    <mesh
                        receiveShadow
                        geometry={nodes.Striker.geometry}
                        material={materials.Texture}>
                        {/* <meshStandardMaterial {...materials} /> */}
                    </mesh>
                </group>
            </Trail>
        </Rig>
    );
};

useGLTF.preload('/Striker.gltf');

export default SpaceShip;
