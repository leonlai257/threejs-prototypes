import {
    Effects,
    Html,
    Stars,
    Trail,
    useKeyboardControls,
    useScroll,
    useTexture,
    useAspect,
    useVideoTexture,
} from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { styled } from '@stitches/react';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { DoubleSide } from 'three';

function VideoMaterial({ url }: { url: string }) {
    const texture = useVideoTexture(url, {});
    return (
        <meshBasicMaterial
            map={texture}
            toneMapped={false}
            side={DoubleSide}
            color="white"
            transparent={true}
        />
    );
}

function FallbackMaterial({ url }: { url: string }) {
    const texture = useTexture(url);
    return (
        <meshBasicMaterial map={texture} toneMapped={false} side={DoubleSide} />
    );
}

const RoomOne = (props: {
    meshProps: ThreeElements['mesh'];
    transition: () => void;
}) => {
    const scene = useRef<THREE.Mesh>(null!);

    const Button = styled('button', {
        backgroundColor: 'black',
        borderRadius: '4rem',
        'min-width': '64px',
        'min-height': '64px',
        border: '0',
        rounded: 'full',
        fontSize: '48px',
        '&:hover': {
            backgroundColor: 'yellow',
        },
    });

    return (
        // <Html as="div">
        //     <Button onClick={props.transition}>Go to Room 2</Button>
        // </Html>
        <mesh {...props.meshProps} ref={scene}>
            <planeBufferGeometry args={[8, 4, 16]} />
            <Suspense fallback={<FallbackMaterial url="/sheko.jpg" />}>
                <VideoMaterial url="/waterfall.mp4" />
            </Suspense>
            <Html>
                <Button onClick={() => props.transition()}>Back</Button>
            </Html>
        </mesh>
    );
};

export default RoomOne;
