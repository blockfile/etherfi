import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import "./scene.css";

const BasicParticles = () => {
    // This reference gives us direct access to our points
    const points = useRef();

    // You can see that, like our mesh, points also takes a geometry and a material,
    // but a specific material => pointsMaterial
    return (
        <points ref={points}>
            <sphereGeometry args={[1, 48, 48]} />
            <pointsMaterial
                color="#9290C3"
                size={0.015}
                sizeAttenuation
                opacity={0.1}
                transparent={true}
            />
        </points>
    );
};

const Scene = () => {
    return (
        <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [1.5, 1.5, 1.5], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <BasicParticles />
            {/* Adjust autoRotateSpeed here */}
            <OrbitControls autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    );
};

export default Scene;
