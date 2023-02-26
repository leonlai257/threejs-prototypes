import { Room } from '@src/components/atoms/Room';
import { RoomItem, RoomType } from 'config/app';
import Image from 'next/image';

const RoomComponent = (props: RoomItem) => {
    return (
        <Room>
            {props.type === RoomType.Video ? (
                <video src={props.url} controls={true} />
            ) : (
                <Image
                    src={props?.url as string}
                    alt="wof-trailer-thumbnail"
                    fill
                />
            )}
        </Room>
    );
};

export default RoomComponent;
