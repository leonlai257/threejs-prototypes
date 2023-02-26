import { Html } from '@react-three/drei';
import { DisplayBoxController } from 'components/displayBox';
import RoomComponent from 'components/roomComponent';
import { RoomItem, Rooms, RoomType } from 'config/app';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import { useRoute } from 'wouter';

const defaultProps = {
    rooms: [
        {
            slug: 'room1',
            type: RoomType.Image,
            url: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/room1test.png',
        },
        {
            slug: 'room2',
            type: RoomType.Video,
            url: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/sampleRoom.mp4',
        },
        {
            slug: 'room3',
            type: RoomType.Video,
            url: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/360test2k.mp4',
        },
    ],
    currentRoom: 'hat',
};

export enum AnimationTypes {
    FADEIN = 'fadeIn',
    FADEOUT = 'fadeOut',
    TRANSITION = 'transition',
}

export interface RoomSceneProps extends Rooms {
    currentRoom: string;
    animation: AnimationTypes;
    setCurrentRoom: (room: string) => void;
    setAnimation: (animation: AnimationTypes) => void;
    setTransition: (transition: string) => void;
}

const RoomScene = (props: RoomSceneProps) => {
    props = { ...defaultProps, ...props };
    const { rooms, currentRoom, setCurrentRoom, setAnimation, setTransition } =
        props;

    const [, params] = useRoute('/:roomId');
    const pathname = params?.roomId;

    setCurrentRoom(pathname!);
    const room = rooms.find((room: RoomItem) => room.slug === pathname);

    useEffect(() => {
        if (room?.slug !== currentRoom) setAnimation(AnimationTypes.FADEOUT);
    }, [room]);

    return (
        <group>
            <Html
                occlude="blending"
                castShadow
                receiveShadow
                fullscreen
                zIndexRange={[100, 0]}
            >
                <RoomComponent
                    slug={currentRoom!}
                    popupInfo={room?.popupInfo}
                    url={room?.url}
                    type={room?.type}
                    onBack={() => {
                        setAnimation(AnimationTypes.FADEIN);
                        setTransition('/');
                    }}
                />
            </Html>

            <group
                position={[0.4, -2.8, 1]}
                rotation={[0, (Math.PI * 2) / 6, 0]}
            >
                <DisplayBoxController
                    slug={currentRoom}
                    hDegree={0}
                    vDegree={0}
                    radius={0}
                    scale={new Vector3(0.7, 0.7, 0.7)}
                />
                <pointLight position={[0, 0, 5]} intensity={2} />
            </group>
        </group>
    );
};

export default RoomScene;
