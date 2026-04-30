import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/models/apple_logo.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Create a new metallic material
        const metalMaterial = new THREE.MeshPhysicalMaterial({
          color: '#e0e0e0',  // Light grey color
          metalness: 1,      // Fully metallic
          roughness: 0.2,    // Very smooth surface
          envMapIntensity: 1.5,
          clearcoat: 0.5,    // Add clear coat for extra shine
          clearcoatRoughness: 0.1,
          reflectivity: 1
        });

        child.material = metalMaterial;
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={15}  // Doubled the scale from 60 to 120
      position={[0, 0, 0]}  // Centered position
      rotation={[0, Math.PI / 4, 0]} // Rotate 45 degrees for better light reflection
    />
  );
}

// Add preload for better performance
useGLTF.preload('/models/apple_logo.glb');

export default Model;