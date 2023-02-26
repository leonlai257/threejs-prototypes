import { Html } from '@react-three/drei';
import RoomComponent from 'components/roomComponent';
import { RoomItem, Rooms, RoomType } from 'config/app';
import { useEffect } from 'react';
import { useRoute } from 'wouter';

const defaultProps = {
    rooms: [
        {
            slug: 'room1',
            type: RoomType.Image,
            url: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/wof-trailer-thumbnail.jpeg',
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
    currentRoom: '',
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
}

const RoomScene = (props: RoomSceneProps) => {
    props = { ...defaultProps, ...props };
    const { rooms, currentRoom, setCurrentRoom, setAnimation } = props;

    const [, params] = useRoute('/:roomId');
    const pathname = params?.roomId;

    setCurrentRoom(pathname!);
    const room = rooms.find((room: RoomItem) => room.slug === pathname);

    useEffect(() => {
        if (room?.slug !== currentRoom) setAnimation(AnimationTypes.FADEOUT);
    }, [room]);

    return (
        <Html fullscreen zIndexRange={[99, 0]}>
            <RoomComponent
                slug={currentRoom!}
                url={room?.url}
                type={room?.type}
            />
        </Html>
    );
};

export default RoomScene;
