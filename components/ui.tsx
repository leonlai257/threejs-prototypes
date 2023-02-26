import { AnimationTypes } from '@pages/[roomId]';
import { Html } from '@react-three/drei';
import { FlexBox, LinkButton, TopTitle } from '@src/components/atoms';
import { Animation } from '@src/components/atoms/Animation';
import { Button } from '@src/components/atoms/Button';
import { Container } from '@src/components/atoms/Container';
import { Text } from '@src/components/atoms/Text';
import { Video } from '@src/components/atoms/Video';
import { Navbar } from 'config/app';
import Image from 'next/image';
import { useLocation } from 'wouter';
import NavBarComponent from './navBar';

const UI = (props: {
    navBar: Navbar;
    popupUrl: string;
    setPopup: (popup: string) => void;
    room: string;
    setCurrentRoom: (room: string) => void;
    animation: AnimationTypes;
    setAnimation: (animation: AnimationTypes) => void;
    transition: string;
    setTransition: (transition: string) => void;
}) => {
    const {
        navBar,
        popupUrl,
        setPopup,
        animation,
        setAnimation,
        room,
        setCurrentRoom,
        transition,
        setTransition,
    } = props;

    const [location, push] = useLocation();

    return (
        <group>
            <Html fullscreen zIndexRange={[100, 0]}>
                <TopTitle>Coreality Demo</TopTitle>
                <Animation
                    css={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        'background-color': 'black',
                        'z-index': '0',
                        opacity: '0',
                    }}
                    onAnimationEnd={() => {
                        setAnimation(AnimationTypes.FADEOUT);
                        if (transition && location !== transition) {
                            push(transition);
                            setCurrentRoom(
                                transition === '/' ? 'world' : transition
                            );
                            setTransition('');
                        }
                    }}
                    type={animation || AnimationTypes.FADEOUT}
                />

                {room === 'world' || (
                    <LinkButton
                        size="xl2"
                        css={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                        }}
                        onClick={() => {
                            setAnimation(AnimationTypes.FADEIN);
                            setTransition('/');
                        }}
                    >
                        Back
                    </LinkButton>
                )}

                <Container
                    css={{
                        'z-index': '1000',
                        display: 'flex',
                        'align-items': 'center',
                    }}
                >
                    {!popupUrl || (
                        <Video
                            css={{
                                top: '72px',
                                'flex-direction': 'column',
                                padding: '0 24px 24px 24px',
                                margin: 'auto',
                            }}
                        >
                            <FlexBox>
                                <a
                                    href="https://www.youtube.com/watch?v=yVHo6OmSpFs&ab_channel=NetflixAsia"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {'Watch Trailer'}
                                </a>
                                <Button onClick={() => setPopup('')}>
                                    <Text>Back to the world</Text>
                                </Button>
                            </FlexBox>
                            <Image
                                src="https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/wof-trailer-thumbnail.jpeg"
                                alt="wof-trailer-thumbnail"
                                width={((screen.height - 400) / 9) * 16}
                                height={screen.height - 400}
                            />
                        </Video>
                    )}
                </Container>

                <NavBarComponent
                    projectName={navBar.projectName}
                    items={navBar.items}
                    onClick={(transition: string) => {
                        setAnimation(AnimationTypes.FADEIN);
                        setTransition(transition);
                    }}
                />
            </Html>
        </group>
    );
};

export default UI;
