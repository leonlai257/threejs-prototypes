import { styled } from '@src/stitches.config';

export const Nav = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  zIndex: '100',
  width: '4rem',
  height: '4rem',
  // height: '100%',
  color: 'white',
  position: 'absolute',
  right: '4px',
  bottom: '4px',
  backgroundColor: '$bgPrimary',
  borderRadius: '999px',
  overflow: 'hidden',
});
