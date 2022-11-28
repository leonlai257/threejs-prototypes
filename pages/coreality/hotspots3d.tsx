import {
    Effects,
    Html,
    OrbitControls,
    PerspectiveCamera,
    Stars,
    Trail,
    useKeyboardControls,
    useScroll,
    useTexture,
} from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import UI from './ui';
import WorldScene from './worldScene';
import Router, { useRouter } from 'next/router';
import { ThreeElements } from '@react-three/fiber';

enum actionType {
    route = 'route',
    dialog = 'dialog',
    room = 'room',
}

export interface HotSpotProps {
    items: {
        title: string;
        meshProps: ThreeElements['group'];
        event: { action: actionType; param: string };
    }[];
}

const HotSpots3d = (props: HotSpotProps) => {
    const hotspotRef = useRef<THREE.Mesh>(null!);
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const router = useRouter();

    return (
        <group>
            {props.items.map((item, index) => {
                return (
                    <group key={index} {...item.meshProps}>
                        <Html position={[0, 0.05, 0]}>
                            {item.title
                                ? item.title
                                : `Unnamed hotspot ${index}`}
                        </Html>
                        <Html position={[-0.3, -0.1, 0]}>
                            {item.event.action === 'dialog' && clicked
                                ? item.event.param
                                : ''}
                        </Html>
                        <mesh
                            {...props}
                            key={index}
                            ref={hotspotRef}
                            scale={0.05}
                            onClick={(event) => {
                                click(!clicked);
                                if (item.event.action === 'route') {
                                    router.push(item.event.param);
                                }
                            }}
                            onPointerOver={(event) => hover(true)}
                            onPointerOut={(event) => hover(false)}>
                            <boxGeometry args={[2, 1, 1]} />
                            <meshStandardMaterial
                                color={hovered ? 'hotpink' : 'orange'}
                            />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
};

export default HotSpots3d;
