import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}>
            <Canvas>
                <ambientLight />
                <directionalLight position={[150, 150, 150]} intensity={0.55} />
                <Component {...pageProps} />
            </Canvas>
        </div>
    );
}

export default MyApp;
