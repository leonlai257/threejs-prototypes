import { styled } from '@src/stitches.config';

export const Popup = styled('div', {
    // Reset
    display: 'flex',
    justifyContent: 'flex',
    zIndex: '1000',
    width: 'fit-content',
    height: 'fit-content',
    color: 'white',
    position: 'absolute',
    top: '32px',
    'margin-left': 'auto',
    'margin-right': 'auto',
    backgroundColor: '$bgPrimary',
    borderRadius: 'full',
});
