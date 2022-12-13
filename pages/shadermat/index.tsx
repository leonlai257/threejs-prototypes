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
import { useFrame } from '@react-three/fiber';
import ShaderObject from './shaderObject';

const LusionClone: NextPage = () => {
    const camera = useRef();
    const ship = useRef();

    return (
        <>
            <OrbitControls />
            <PerspectiveCamera
                makeDefault
                ref={camera}
                fov={60}
                near={0.1}
                far={1000}
                position={[0, 0, 2]}
                rotation={[0, Math.PI + Math.PI / 2, 0]}
            />
            <ShaderObject />
        </>
    );
};

export default LusionClone;
