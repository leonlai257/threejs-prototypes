import { AnimationTypes } from '@pages/[roomId]';
import { Html } from '@react-three/drei';
import { Animation } from '@src/components/atoms/Animation';
import { Navbar } from 'config/app';
import { useLocation } from 'wouter';

const UI = (props: {
    navBar: Navbar;
    popupUrl: string;
    setPopup: (popup: string) => void;
    currentRoom: string;
    setCurrentRoom: (room: string) => void;
    animation: AnimationTypes;
    setAnimation: (animation: AnimationTypes) => void;
    transition: string;
    setTransition: (transition: string) => void;
}) => {
    const {
        animation,
        setAnimation,
        setCurrentRoom,
        transition,
        setTransition,
    } = props;

    const [location, push] = useLocation();

    return (
        <group>
            <Html
                fullscreen
                zIndexRange={[110, 0]}
                style={{ pointerEvents: 'none' }}
            >
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
                        pointerEvents: 'none',
                    }}
                    onAnimationEnd={() => {
                        setAnimation(AnimationTypes.FADEOUT);
                        if (transition && location !== transition) {
                            push(transition);
                            setCurrentRoom(
                                transition === '/' ? 'world' : transition,
                            );
                            setTransition('');
                        }
                    }}
                    type={animation || AnimationTypes.FADEOUT}
                />
            </Html>
        </group>
    );
};

export default UI;
