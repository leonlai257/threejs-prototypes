import type { NextPage } from 'next';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import * as THREE from 'three';
import {
    OrbitControls,
    PerspectiveCamera,
    ScrollControls,
    Scroll,
    useScroll,
} from '@react-three/drei';
import CylinderGroup from './cylinder';
import { useFrame } from '@react-three/fiber';

const LusionClone: NextPage = () => {
    return (
        <>
            <ScrollControls
                pages={2} // Each page takes 100% of the height of the canvas
                distance={1} // A factor that increases scroll bar travel (default: 1)
                damping={4} // Friction, higher is faster (default: 4)
                horizontal={false} // Can also scroll horizontally (default: false)
                infinite={false} // Can also scroll infinitely (default: false)
            >
                <PerspectiveCamera
                    makeDefault
                    fov={60}
                    near={0.1}
                    far={1000}
                    position={[-80, 0, 0]}
                    rotation={[0, Math.PI + Math.PI / 2, 0]}
                />
                <CylinderGroup />
            </ScrollControls>
        </>
    );
};

export default LusionClone;
