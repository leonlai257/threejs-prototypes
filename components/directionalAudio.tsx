import { PositionalAudio } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { audio } from 'config/app';
import React from 'react';
import * as THREE from 'three';

interface DirectionalAudioProps {
    audios?: audio[];
    groupProps: ThreeElements['group'];
    volume: number;
}

const defaultProps: DirectionalAudioProps = {
    audios: [
        {
            name: 'music',
            url: '/music.mp3',
            position: [0, 0, 10],
            rotation: [0, (Math.PI * 7) / 8, 0],
        },
    ],
    groupProps: {},
    volume: 1,
};

const DirectionalAudio = (props: DirectionalAudioProps) => {
    props = { ...defaultProps, ...props };
    const { audios, groupProps, volume } = props;

    const audioRef = React.useRef<THREE.PositionalAudio>(null!);

    return (
        <group {...groupProps}>
            {audios?.map((audio, index) => {
                const { name, url, position, rotation } = audio;
                return (
                    <group key={index} rotation={rotation}>
                        <PositionalAudio
                            key={name}
                            ref={audioRef}
                            position={position}
                            autoplay
                            loop
                            url={url}
                            distance={name === 'music' ? volume : 1}
                        />
                        {/* <mesh position={position}>
                            <Html>
                                <div> {name} </div>
                            </Html>
                            <sphereGeometry args={[0.1, 16, 16]} />
                            <meshBasicMaterial color="red" />
                        </mesh> */}
                    </group>
                );
            })}
        </group>
    );
};
export default DirectionalAudio;
