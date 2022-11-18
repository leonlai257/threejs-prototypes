import type { NextPage } from 'next';
import React, {
    useRef,
    useState,
    useLayoutEffect,
    useEffect,
    useMemo,
} from 'react';
import * as THREE from 'three';
import {
    OrbitControls,
    PerspectiveCamera,
    ScrollControls,
    Scroll,
    useScroll,
    CameraShake,
    KeyboardControls,
} from '@react-three/drei';
import Space from './space';
import { useFrame } from '@react-three/fiber';
import SpaceShip from './ship';
import Rig from './rig';
import Title from './title';

const LusionClone: NextPage = () => {
    const camera = useRef();
    const ship = useRef();

    useFrame((state, delta) => {});
    return (
        <>
            <ScrollControls
                pages={2} // Each page takes 100% of the height of the canvas
                distance={1} // A factor that increases scroll bar travel (default: 1)
                damping={4} // Friction, higher is faster (default: 4)
                horizontal={false} // Can also scroll horizontally (default: false)
                infinite={false} // Can also scroll infinitely (default: false)
            >
                <KeyboardControls
                    map={[
                        { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                        { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                        { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                        { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                        { name: 'jump', keys: ['Space'] },
                    ]}>
                    <PerspectiveCamera
                        makeDefault
                        ref={camera}
                        fov={60}
                        near={0.1}
                        far={1000}
                        position={[-80, 0, 0]}
                        rotation={[0, Math.PI + Math.PI / 2, 0]}>
                        <SpaceShip rotation={[0, Math.PI, 0]} />
                    </PerspectiveCamera>
                    <Space />
                </KeyboardControls>
            </ScrollControls>
        </>
    );
};

export default LusionClone;
