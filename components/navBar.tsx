import Logo from '@src/assets/Logo.png';
import { FlexBox, Nav } from '@src/components/atoms';
import { IconBox } from '@src/components/molecules';
import { styled } from '@src/stitches.config';
import type * as Stitches from '@stitches/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GoInfo, GoMute, GoUnmute } from 'react-icons/go';
import { HiTranslate } from 'react-icons/hi';

interface NavProps {
    soundSetter: Dispatch<SetStateAction<number>>;
    infoSetter: Dispatch<SetStateAction<boolean>>;
}

const NavBarComponent = ({ soundSetter, infoSetter }: NavProps) => {
    const [focused, setFocused] = useState(false);
    const [muted, setMuted] = useState(true);
    useEffect(() => {
        soundSetter(() => {
            return muted ? 1.0 : 0.0;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muted]);

    const expandedBar = [
        {
            icon: <GoInfo />,
            clickEvent: () => infoSetter((prev) => !prev),
        },
        {
            icon: muted ? <GoUnmute /> : <GoMute />,
            clickEvent: () => {
                setMuted((prev) => {
                    return !prev;
                });
            },
        },
        {
            icon: <HiTranslate />,
            clickEvent: () => {
                console.log('TBC');
            },
        },
    ];

    const NavBox = styled(Nav, {
        justifyContent: 'center',
        alignItems: 'center',
        height: '4rem',
        border: '2px solid white',
        transition: 'all .5s ease-in-out',
    });

    const focusedCss: Stitches.CSS = focused
        ? {
              height: (expandedBar.length + 1) * 4 + 'rem',
          }
        : { height: '4rem' };

    const MenuBox = styled(FlexBox, {
        height: '4rem',
        '&:hover': {
            cursor: 'pointer',
        },
    });

    const LogoBox = styled(FlexBox, {
        height: '100%',
        overflow: 'hidden',
        width: '4rem',
        transition: 'height .5s ease-in-out',
        '&:hover': {
            cursor: 'pointer',
        },
    });

    const hideBoxesCss: Stitches.CSS = focused
        ? { maxHeight: '4rem' }
        : { maxHeight: '0rem' };

    return (
        <NavBox css={{ ...focusedCss }}>
            {expandedBar.map((item, index) => (
                <LogoBox
                    key={index}
                    css={{ ...hideBoxesCss }}
                    onClick={item.clickEvent}
                >
                    {item.icon}
                </LogoBox>
            ))}
            <MenuBox
                onClick={() => {
                    setFocused((prev) => {
                        return !prev;
                    });
                }}
            >
                <IconBox image={Logo} alt="Icon" />
            </MenuBox>
        </NavBox>
    );
};

export default NavBarComponent;
