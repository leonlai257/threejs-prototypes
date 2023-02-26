import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import DirectionalAudio from 'components/directionalAudio';
import Hotspot from 'components/hotspot';
import { Minimap } from 'components/minimap';
// import { Sneaker } from 'components/object3d';
import World from 'components/world';
import Config, { Lobby } from 'config/app';
import BlurTransition from 'effects/blurTransition';
import { createRef, useEffect, useState } from 'react';
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
        transition,
        setTransition,
        popup,
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

    useFrame(() => {
        if (transition) {
            setFov(fov - 1);
        }

        if (fov <= 30) {
            if (transition === 'world') {
                setFov(75);
                camera.position.set(
                    lobby?.defaultCameraPosition.x as number,
                    lobby?.defaultCameraPosition.y as number,
                    lobby?.defaultCameraPosition.z as number,
                );
            }

            // setRoom(transition);
            push(`/${transition}`);
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
                    videoUrl={lobby?.sphereVideoUrl}
                    videoUrlLowRes={lobby?.sphereVideoUrlLowRes}
                />

                {/* <Sneaker
                    model={{
                        path: '/sneaker.gltf',
                        node: 'Sneaker',
                        material: 'Hologram',
                    }}
                    groupProps={{
                        scale: [0.08, 0.08, 0.08],
                        position: [0.8118169009, 0.1388263049, -0.3628781841],
                    }}
                    meshProps={{
                        rotation: [1.57 + Math.PI * 0.18, 0, -0.32],
                    }}
                /> */}
                {/* <MaskScene radius={radius} /> */}
                {popup ||
                    lobby?.hotspots?.map((hotspot) => (
                        <Hotspot
                            key={hotspot.slug}
                            {...hotspot}
                            lobby={{ ...lobby, radius }}
                            setPopup={setPopup}
                            setTransition={setTransition}
                        />
                    ))}
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
            >
                <Minimap />
            </PerspectiveCamera>

            <OrbitControls
                enableZoom={false}
                enableRotate={currentRoom === 'world'}
            />
        </>
    );
};

export default Coreality;
