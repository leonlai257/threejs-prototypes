import {
    OrthographicCamera,
    PerspectiveCamera,
    Text,
    useFBO,
} from '@react-three/drei';
import {
    createPortal,
    ThreeElements,
    useFrame,
    useThree,
} from '@react-three/fiber';
import ImageMaterial from 'materials/imageMaterial';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { DoubleSide, Matrix4 } from 'three';

export interface MinimapProps {
    meshProps: ThreeElements['mesh'];
    groupProps: ThreeElements['group'];
}

const defaultProps: MinimapProps = {
    meshProps: {
        position: [1.36, 0.52, -1],
        scale: [0.4, 0.4, 0.4],
    },
    groupProps: {
        scale: [0.04, 0.04, 0.04],
    },
};

const Viewer = ({
    children,
    meshProps,
}: {
    children: JSX.Element;
    meshProps: ThreeElements['mesh'];
}) => {
    const cam = useRef<THREE.PerspectiveCamera>(null!);
    const fbo = useFBO();

    const [scene] = useState<THREE.Scene>(() => new THREE.Scene());

    useFrame((state) => {
        cam.current.matrixWorldInverse.copy(state.camera.matrixWorldInverse);
        state.gl.setRenderTarget(fbo);
        state.gl.render(scene, cam.current);
        state.gl.setRenderTarget(null);
    });

    return (
        <>
            <mesh {...meshProps} rotation={[0, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    map={fbo.texture}
                    transparent={true}
                    alphaTest={0.5}
                />
            </mesh>
            <PerspectiveCamera
                manual
                ref={cam}
                fov={50}
                aspect={1 / 1}
                onUpdate={(c) => c.updateProjectionMatrix()}
            />
            {createPortal(children, scene)}
        </>
    );
};

const Marker = ({
    text,
    meshProps,
}: {
    text: string;
    meshProps: ThreeElements['mesh'];
}) => {
    const [hovered, setHover] = useState(false);
    const [showText, setShowText] = useState(false);

    const pointerOver = () => {
        setHover(true);
    };
    const pointerOut = () => {
        setHover(false);
    };

    const onClick = () => {
        setShowText(!showText);
        console.log('click');
    };

    return (
        <mesh
            onPointerOver={pointerOver}
            onPointerOut={pointerOut}
            onClick={() => onClick()}
            scale={[60, 30, 30]}
            {...meshProps}
        >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                color={hovered ? 'yellow' : 'black'}
                side={DoubleSide}
            />
            <Text scale={[4, 8, 8]} position={[0, 0, 0.01]} color={'white'}>
                {text}
            </Text>
            <Text scale={[-4, 8, 8]} position={[0, 0, -0.01]} color={'white'}>
                {text}
            </Text>
        </mesh>
    );
};

const ViewSphere = (props: MinimapProps) => {
    props = { ...defaultProps, ...props };
    const { meshProps, groupProps } = props;

    return (
        <Viewer meshProps={meshProps}>
            <group {...groupProps}>
                <Marker
                    meshProps={{
                        position: [1, 1, 1],
                    }}
                    text={'test'}
                />
                <mesh>
                    <sphereGeometry />
                    <ImageMaterial url="/labScene.png" />
                </mesh>
            </group>
        </Viewer>
    );
};

const Minimap = () => {
    const { gl, scene, camera, size } = useThree();
    const virtualScene = useMemo(() => new THREE.Scene(), []);
    const virtualCam = useRef<THREE.Camera>(null!);
    const ref = useRef<THREE.Mesh>(null!);
    let matrix = new Matrix4();

    useFrame(() => {
        matrix = camera.matrix.invert();
        gl.autoClear = true;
        gl.render(scene, camera);
        gl.autoClear = false;
        gl.clearDepth();
        gl.render(virtualScene, virtualCam.current);
        ref.current.setRotationFromMatrix(matrix.invert());
    }, 1);

    return createPortal(
        <>
            <OrthographicCamera
                ref={virtualCam}
                makeDefault={false}
                position={[0, 0, 100]}
            />
            <mesh
                ref={ref}
                position={[size.width / 2 - 160, size.height / 2 - 160, 0]}
            >
                <sphereGeometry args={[100, 64]} />
                <ImageMaterial url="/labScene.png" />
                <Marker
                    text={'SKY'}
                    meshProps={{
                        position: [0, 120, 0],
                    }}
                />
            </mesh>

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
        </>,
        virtualScene,
    );
};

export { Minimap, ViewSphere };
