import ImageMaterial from 'materials/imageMaterial';
import MaskMaterial from 'materials/maskMaterial';

const MaskScene = (props: { radius: number }) => {
    const { radius } = props;

    return (
        <mesh scale={[1, 1, -1]}>
            <sphereGeometry args={[radius, 32, 32]} />
            <ImageMaterial url="/labScene.png" />
            <mesh scale={[1, 1, 1]}>
                <sphereGeometry args={[radius * 0.99999, 32, 32]} />
                <MaskMaterial url="/labVideo.mp4" alpha="/labMask.png" />
            </mesh>
        </mesh>
    );
};

export default MaskScene;
