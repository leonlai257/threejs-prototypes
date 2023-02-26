import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import DirectionalAudio from 'components/directionalAudio';
import { DisplayBoxController } from 'components/displayBox';
import GustoLogo from 'components/gusto';
import Screen from 'components/screen';
import UFO from 'components/ufo';
import World from 'components/world';
import Config, { Lobby } from 'config/app';
import BlurTransition from 'effects/blurTransition';
import { createRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useLocation } from 'wouter';
import { AnimationTypes } from './[roomId]';
export interface CoRealityProps {
    currentRoom: string;
    setCurrentRoom: (room: string) => void;
    transition: string;
    setTransition: (room: string) => void;
    popup: string;
    setPopup: (popup: string) => void;
    musicVolume: number;
    setMusicVolume: (volume: number) => void;
    animation: AnimationTypes;
    setAnimation: (animation: AnimationTypes) => void;
}

const Coreality = (props: CoRealityProps) => {
    const {
        currentRoom,
        setCurrentRoom,
        transition,
        setTransition,
        setPopup,
        musicVolume,
        setAnimation,
    } = props;

    const { camera } = useThree();
    const cameraRef = createRef();

    const entryLobby: Lobby | undefined = Config.getEntryPoint();
    const [lobby] = useState<Lobby | undefined>(entryLobby);

    const radius = 10;

    const [fov, setFov] = useState(75);

    const [, push] = useLocation();

    const displayItemProps = {
        vDegree: 125,
        scale: new THREE.Vector3(0.9, 0.9, 0.9),
    };

    useFrame(() => {
        if (transition) {
            setFov(fov - 1);
        }
        if (fov <= 30) {
            if (transition === 'world' || transition === '/') {
                setFov(75);
                camera.position.set(
                    lobby?.defaultCameraPosition.x as number,
                    lobby?.defaultCameraPosition.y as number,
                    lobby?.defaultCameraPosition.z as number,
                );
                setCurrentRoom('world');
            } else {
                push(`/${transition}`);
            }
            setTransition('');
        }

        /*  Commented the following code because calling function passed by props every frame cause performance issue. */
        // if (musicVolume <= 1) {
        //     if (transition && transition !== 'world') {
        //         setMusicVolume(musicVolume + 0.05);
        //     }
        // }

        // if (musicVolume >= 0) {
        //     if (transition && transition === 'world') {
        //         setMusicVolume(Math.max(musicVolume - 0.05, 0));
        //     }
        // }
    });

    useEffect(() => {
        if (transition !== '') setAnimation(AnimationTypes.TRANSITION);
    }, [transition]);

    return (
        <>
            <group>
                <World
                    radius={radius}
                    imageUrl={lobby?.sphereImageUrl}
                    videoUrlLowRes={lobby?.sphereVideoUrlLowRes}
                    setCurrentRoom={setCurrentRoom}
                />

                {/* Curtain side*/}
                <DisplayBoxController
                    slug={'red-shoe'}
                    hDegree={97}
                    vDegree={displayItemProps.vDegree - 2}
                    radius={radius * 0.96}
                    scale={displayItemProps.scale}
                    setPopup={setPopup}
                    setTransition={setTransition}
                />

                <DisplayBoxController
                    slug={'oxford-shoe'}
                    hDegree={140}
                    vDegree={displayItemProps.vDegree + 11.5}
                    radius={radius * 0.73}
                    scale={displayItemProps.scale}
                    setPopup={setPopup}
                    setTransition={setTransition}
                />
                <DisplayBoxController
                    slug={'bag'}
                    hDegree={190}
                    vDegree={displayItemProps.vDegree + 4}
                    radius={radius * 0.83}
                    scale={displayItemProps.scale}
                    setPopup={setPopup}
                    setTransition={setTransition}
                />

                {/* Studio side*/}
                <DisplayBoxController
                    slug={'glasses'}
                    hDegree={5}
                    vDegree={displayItemProps.vDegree}
                    radius={radius * 0.96}
                    scale={displayItemProps.scale}
                    setPopup={setPopup}
                    setTransition={setTransition}
                />
                <DisplayBoxController
                    slug={'hat'}
                    hDegree={-50}
                    vDegree={displayItemProps.vDegree + 4}
                    radius={radius * 0.88}
                    scale={displayItemProps.scale}
                    setPopup={setPopup}
                    setTransition={setTransition}
                />

                {/* 3D cosmetics */}
                <UFO hDegree={60} vDegree={85} radius={radius * 0.75} />
                <GustoLogo hDegree={60} vDegree={85} radius={radius * 0.7} />
                <Screen
                    hDegree={240}
                    vDegree={90}
                    radius={radius * 0.9}
                    groupProps={{}}
                    path={
                        'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/gustoTeaser.mp4'
                    }
                />
            </group>

            <DirectionalAudio
                audios={lobby?.audios}
                groupProps={{}}
                volume={musicVolume}
            />

            {transition && <BlurTransition />}

            <PerspectiveCamera
                makeDefault
                ref={cameraRef}
                fov={fov}
                near={0.1}
                far={1000}
                position={lobby?.defaultCameraPosition}
            ></PerspectiveCamera>

            <OrbitControls
                enableZoom={false}
                enableRotate={currentRoom === 'world'}
            />
        </>
    );
};

export default Coreality;
