/* eslint-disable @next/next/no-img-element */
import Cross from '@src/assets/Navbar/Cross';
import { Button, Column, FlexBox, IconWrapper } from '@src/components/atoms';
import { styled } from '@src/stitches.config';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

const CTA = styled(Button, {
    // position: 'absolute',
    // width: '180px',
    // height: '35px',
    // marginBottom: '18px',
    zIndex: '100',
    backgroundColor: '$bgPrimary',
    color: 'white',
    border: '2px solid white',
    fontFamily: 'Chakra Petch',
    width: '180px',
    height: '45px',
    marginBottom: '23px',

    // '@bp1': {},

    variants: {
        type: {
            card: {
                position: 'inherit',
            },
        },
    },
});

export interface PopupInfoProps {
    title: string;
    description: string;
    price: string;
    link: string;
    cta: string;
}
interface PopupProps {
    closeCallback: Dispatch<SetStateAction<boolean>>;
    info?: PopupInfoProps;
}

const Popup = ({ closeCallback, info }: PopupProps) => {
    const Card = styled(Column, {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '100',
        position: 'absolute',

        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: 'auto',

        width: '90%',
        height: '90%',

        border: '2px solid white',

        // maxHeight: '500px',
        // maxWidth: '300px',

        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(25px)',
        borderRadius: '50px',
        color: 'white',

        '@bp1': {
            width: '60%',
            height: '80%',
        },
    });

    const CrossWrapper = styled(IconWrapper, {
        position: 'absolute',
        top: '25px',
        right: '25px',
        '&:hover': {
            cursor: 'pointer',
            '& svg': {
                fill: 'white',
            },
        },
    });

    const CardItem = styled(FlexBox, {
        width: '100%',
        flexDirection: 'column',
        padding: '0 20px',

        '@bp2': {
            flexDirection: 'row',
        },
    });

    const Title = styled('p', {
        width: '100%',
        padding: '0 20px',
        fontSize: '$md',
        textAlign: 'center',
        fontFamily: 'Chakra Petch',
        '@bp1': {
            fontSize: '$xl',
        },
    });
    const Text = styled('p', {
        width: '100%',
        padding: '0 20px',
        fontSize: '$sm',
        textAlign: 'center',
        fontFamily: 'Chakra Petch',
        '@bp1': {
            fontSize: '$md',
        },
        '@bp2': {
            textAlign: 'left',
        },
    });

    return (
        <Card>
            <Title>{info?.title}</Title>
            <CardItem>
                <Text>{info?.description}</Text>
                <FlexBox css={{ flexDirection: 'column' }}>
                    <p>{info?.price}</p>
                    <Link
                        href={info?.link || 'https://preview.thisisguto.com'}
                        target="_blank"
                    >
                        <CTA type="card">{info?.cta}</CTA>
                    </Link>
                </FlexBox>
            </CardItem>
            <CrossWrapper
                size="small"
                onClick={() => {
                    closeCallback(false);
                }}
            >
                <Cross />
            </CrossWrapper>
        </Card>
    );
};

export { CTA, Popup };
