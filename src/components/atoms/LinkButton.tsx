import { styled } from '@src/stitches.config';

export const LinkButton = styled('a', {
    backgroundColor: 'black',
    borderRadius: '4rem',
    width: 'fit-content',
    height: 'fit-content',
    padding: '0.5rem 1rem',
    border: '0',
    rounded: 'full',
    fontSize: '18px',

    'z-index': '100',
    '&:hover': {
        backgroundColor: 'yellow',
    },

    variants: {
        size: {
            sm: {
                fontSize: '12px',
            },
            md: {
                fontSize: '18px',
            },
            lg: {
                fontSize: '24px',
            },
            xl: {
                fontSize: '30px',
            },
            xl2: {
                fontSize: '36px',
            },
        },
    },
});
