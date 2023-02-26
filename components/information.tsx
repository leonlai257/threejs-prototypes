import { FlexBox } from '@src/components/atoms';
import { styled } from '@src/stitches.config';

interface InformationProps {
    show: boolean;
}

const Information = ({ show }: InformationProps) => {
    const InfoBox = styled(FlexBox, {
        transition: 'all .5s ease',
        flexDirection: 'column',
        zIndex: '100',
        height: '0%',
        width: '0%',
        color: 'white',
        position: 'absolute',
        backgroundColor: '$bgPrimary',
        overflow: 'hidden',
        borderRadius: '40px',

        top: '0',
        right: '0',
        left: '0',
        bottom: '0',
        margin: 'auto',
    });

    const hideCSS = show
        ? {
              height: '80%',
              width: '80%',
              minHeight: '500px',
              minWidth: '300px',
              border: '3px solid white',
          }
        : {};

    const Title = styled('p', {
        width: '80%',
        padding: '20px 20px 0 20px',
        fontSize: '$xl',
        textAlign: 'initial',
        fontFamily: 'Chakra Petch',
    });
    const Text = styled('p', {
        width: '80%',
        padding: '0 20px 20px 20px',
        fontSize: '$md',
        fontFamily: 'Chakra Petch',
    });

    return (
        <InfoBox css={hideCSS}>
            <Title>Information</Title>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At quae
                sit odit sapiente numquam ea velit laudantium sequi, ipsam
                molestias, corporis eaque nam perferendis animi consequatur,
                fugiat sunt error cumque.
            </Text>
        </InfoBox>
    );
};

export default Information;
