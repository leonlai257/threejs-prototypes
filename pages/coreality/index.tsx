import {
    DeviceOrientationControls,
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
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import Blur from './blur';
import HotSpots, { actionType, ItemsProps } from './hotspots';
import HotSpots3d, { HotSpotProps } from './hotspots3d';
import RoomOne from './room';
import UI from './ui';
import WorldScene from './worldScene';

export const transition = () => {};

const CoReality = () => {
    const radius = 1;

    const { camera } = useThree();
    const [fov, setFov] = useState(75);
    const [transition, setTransition] = useState<string>('');

    const [room, setRoom] = useState<string>('world');

    const [hotSpots, setHotSpots] = useState<ItemsProps[]>([
        {
            title: 'Lusion',
            meshProps: {
                position: [0, 0, radius],
                rotation: [0, 0, 0],
            },
            event: { action: actionType.route, param: '/lusion' },
        },
        {
            title: 'Shoes',
            meshProps: {
                position: [0, 0, radius],
                rotation: [0, Math.PI / 2, 0],
            },
            event: {
                action: actionType.dialog,
                param: 'Check out this holo-shoes',
            },
        },
        {
            title: 'Room1',
            meshProps: {
                position: [0, 0, radius],
                rotation: [0, Math.PI, 0],
            },
            event: { action: actionType.room, param: 'room1' },
        },
        {
            title: 'Mahjong',
            meshProps: {
                position: [0, 0, radius],
                rotation: [0, -Math.PI / 2, 0],
            },
            event: { action: actionType.route, param: '/' },
        },
    ]);

    useFrame(() => {
        if (transition) {
            setFov(fov - 1);
        }

        if (fov <= 30) {
            setFov(75);
            setRoom(transition);
            setTransition('');
        }

        if (room !== 'world') {
            camera.rotation.set(0, 0, 0);
        }
    });

    return (
        <>
            <pointLight color={0xffffff} intensity={4} />
            <OrbitControls
                enableZoom={true}
                enableRotate={room === 'world'}
                // maxPolarAngle={(Math.PI * 2.5) / 4}
                // minPolarAngle={Math.PI / 4}
            />
            {/* <DeviceOrientationControls /> */}
            <PerspectiveCamera
                makeDefault
                fov={fov}
                near={0.1}
                far={1000}
                position={[-0.01, 0, 0]}
            />

            <UI />
            {!transition || <Blur />}
            {room === 'world' ? (
                <group>
                    <WorldScene radius={radius}></WorldScene>
                    {/* <HotSpots3d items={hotSpots} /> */}
                    <HotSpots
                        items={hotSpots}
                        transition={() => {
                            setTransition('room1');
                        }}
                    />
                </group>
            ) : (
                <RoomOne
                    meshProps={{
                        position: [0, 0, -2],
                        rotation: [0, 0, 0],
                    }}
                    transition={() => {
                        setTransition('world');
                    }}
                />
            )}
        </>
    );
};

export default CoReality;
