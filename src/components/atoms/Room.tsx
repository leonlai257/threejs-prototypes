import { styled } from '@src/stitches.config';

export const Room = styled('div', {
    position: 'absolute',
    display: 'flex',
    top: '0px',
    left: '0px',

    width: '100%',
    height: '100%',

    zIndex: '99',

    backgroundColor: '$bgPrimary',
});
