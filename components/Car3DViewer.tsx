import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

const CarModel = () => {
    const { scene } = useGLTF('/models/clio.glb');
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            <Center>
                <primitive object={scene} />
            </Center>
        </group>
    );
};

const Car3DViewer = () => {
    return (
        <div className="w-full h-full">
            <Canvas shadows camera={{ position: [5, 3, 5], fov: 45 }}>
                <Stage environment="city" intensity={0.6}>
                    <CarModel />
                </Stage>
                <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
            </Canvas>
        </div>
    );
};

export default Car3DViewer;
