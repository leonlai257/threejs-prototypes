import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export default function Table(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!);
    return (
        <mesh {...props} ref={ref}>
            <boxGeometry args={[2.4, 2, 2]} />
            <meshStandardMaterial color={'green'} />
        </mesh>
    );
}
