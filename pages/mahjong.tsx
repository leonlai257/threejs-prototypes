import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface MahjongProps {
    isPile?: boolean;
    meshProps: ThreeElements['mesh'];
}

export default function Mahjong(props: MahjongProps) {
    const ref = useRef<THREE.Mesh>(null!);

    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    const isPile = props.isPile || false;

    console.log(isPile);
    useFrame((state, delta) => {
        if (isPile !== true) {
            const currentPosition = ref.current.position;
            const newPosition =
                currentPosition.y +
                ((hovered ? 0.012 : 0) - currentPosition.y + 1.024);
            ref.current.position.set(
                currentPosition.x,
                newPosition,
                currentPosition.z
            );
        }
    });

    return (
        <mesh
            {...props.meshProps}
            ref={ref}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[0.032, 0.048, 0.012]} />
            <meshStandardMaterial color={hovered ? 'yellow' : 'white'} />
        </mesh>
    );
}
