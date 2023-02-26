import { FlexBox } from '@src/components/atoms';
import { keyframes, styled } from '@stitches/react';
import { Dispatch, SetStateAction } from 'react';

interface EntranceProps {
  enter: Dispatch<SetStateAction<boolean>>;
}

const Entrance = ({ enter }: EntranceProps) => {
  const BlurBox = styled(FlexBox, {
    position: 'absolute',
    top: 0,
    left: 0,

    width: '100%',
    height: '100%',
    backdropFilter: 'blur(10px)',
    zIndex: '999',
  });

  const WelcomeAnimation = keyframes({
    '0%': { width: '0%' },
    '25%': { width: '0%' },
    '60%': { width: '100%' },
    '100%': { width: '0%' },
  });

  const Welcome = styled('p', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '$xl',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  });

  const EnterAnimation = keyframes({
    '0%': { width: '0%' },
    '50%': { width: '0%' },
    '100%': { width: '100%' },
  });

  return (
    <BlurBox onClick={() => enter(false)}>
      <Welcome
        css={{ animation: `${WelcomeAnimation} 5s ease-in-out forwards 1` }}
      >
        Welcome to VR Store by Gusto!
      </Welcome>
      <Welcome
        css={{ animation: `${EnterAnimation} 10s ease-in-out forwards 1` }}
      >
        Enter the store by clicking anywhere
      </Welcome>
    </BlurBox>
  );
};

export default Entrance;
