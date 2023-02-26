import Logo from '@src/assets/Logo.png';
import { FlexBox, Label, Nav } from '@src/components/atoms';
import { LinkButton } from '@src/components/atoms/LinkButton';
import { IconBox } from '@src/components/molecules';
import { NavItem } from 'config/app';

export interface NavBarProps {
    projectName: string;
    items: NavItem[];
    onClick: (transition: string) => void;
}

const defaultProps = {
    projectName: 'Coreality',
    items: [
        {
            slug: 'room1',
            transitionTarget: 'room1',
        },
        {
            slug: 'room2',
            transitionTarget: 'room2',
        },
        {
            slug: 'room3',
            transitionTarget: 'room3',
        },
    ],
};

const NavBarComponent = (props: NavBarProps) => {
    props = { ...defaultProps, ...props };
    const { projectName, items, onClick: onLinkButtonClick } = props;

    return (
        <Nav>
            <FlexBox css={{ marginRight: 'auto', paddingLeft: '1.5rem' }}>
                <IconBox image={Logo} alt="Icon" />
                <Label position="projectName">{projectName}</Label>
            </FlexBox>
            <FlexBox>
                {items.map((item: NavItem) => (
                    <FlexBox key={item.slug}>
                        <LinkButton
                            size="md"
                            onClick={() =>
                                onLinkButtonClick(item.transitionTarget)
                            }
                        >
                            {item.slug}
                        </LinkButton>
                    </FlexBox>
                ))}
            </FlexBox>
        </Nav>
    );
};

export default NavBarComponent;
