/* eslint-disable @next/next/no-img-element */
import { FlexBox } from '@src/components/atoms';
import { Room } from '@src/components/atoms/Room';
import { styled } from '@src/stitches.config';
import { RoomItem, RoomType } from 'config/app';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CTA, Popup } from './callToAction';

const RoomComponent = (props: RoomItem) => {
    const CTABox = styled(FlexBox, {
        flexDirection: 'column',
        position: 'absolute',
        bottom: '60%',
        left: 0,
        right: 0,
        margin: 'auto',
    });

    const [showPop, setShowPop] = useState(false);
    const { onBack, popupInfo } = props;

    return (
        <Room>
            {props.type === RoomType.Video ? (
                <video src={props.url} controls={true} />
            ) : (
                <>
                    <Image src={props?.url as string} alt={props.slug} fill />
                    <CTABox>
                        <CTA
                            onClick={() => {
                                setShowPop(true);
                            }}
                        >
                            Description
                        </CTA>
                        <Link
                            href="https://preview.thisisgusto.com"
                            target="_blank"
                        >
                            <CTA>Checkout</CTA>
                        </Link>

                        <CTA onClick={() => onBack?.()}>Back</CTA>
                    </CTABox>
                    {showPop && (
                        <Popup closeCallback={setShowPop} info={popupInfo} />
                    )}
                    <img
                        src={props?.url as string}
                        alt="wof-trailer-thumbnail"
                        style={{ objectFit: 'cover', width: '100vw' }}
                    />
                </>
            )}
        </Room>
    );
};

export default RoomComponent;
