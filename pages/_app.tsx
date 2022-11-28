import { Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

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
