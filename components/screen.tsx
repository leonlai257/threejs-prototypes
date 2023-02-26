import { Box, Plane } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import VideoMaterial from 'materials/videoMaterial';
import { Euler } from 'three';
import { anglesToXYZ } from './hotspot';

export interface ScreenProps {
    path: string;
    groupProps: ThreeElements['group'];
    hDegree: number;
    vDegree: number;
    radius: number;
}

const defaultProps: ScreenProps = {
    hDegree: 0,
    vDegree: 0,
    radius: 0,
    path: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/sampleRoom.mp4',
    groupProps: {},
};

const Screen = (props: ScreenProps) => {
    props = { ...defaultProps, ...props };
    const { path, hDegree, vDegree, radius } = props;

    const defaultSetting: ThreeElements['group'] = {
        position: anglesToXYZ(hDegree, vDegree, radius),
        rotation: new Euler(0, Math.PI / 6, 0),
        scale: 0.9,
    };

    return (
        <group {...defaultSetting}>
            <Plane
                scale={[1, -1, 1]}
                args={[7.75, 4.3, 1]}
                position={[0, 0, 0.2]}
                rotation={[Math.PI, 0, 0]}
            >
                <VideoMaterial url={path!} />
                {/* <Suspense
                    fallback={
                        <ImageMaterial
                            url={
                                'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/sampleFallBack.png'
                            }
                        />
                    }
                >
                    <VideoMaterial url={path!} />
                </Suspense> */}
            </Plane>

            <Box args={[8, 4.5, 0.2]}>
                <meshBasicMaterial color="black" />
            </Box>
            <Box position={[3, 4, 0]} args={[0.1, 5, 0.1]}>
                <meshBasicMaterial color="black" />
            </Box>
            <Box position={[-3, 4, 0]} args={[0.1, 5, 0.1]}>
                <meshBasicMaterial color="black" />
            </Box>
        </group>
    );
};

export default Screen;
