import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const Stadium = () => (
  <mesh>
    <torusKnotGeometry args={[2.2, 0.6, 120, 16]} />
    <meshStandardMaterial color="#1e99ff" metalness={0.4} roughness={0.2} />
  </mesh>
);

export const LandingStadium = () => (
  <div className="h-64 w-full rounded-xl overflow-hidden">
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <Stadium />
      <Stars />
      <OrbitControls enablePan={false} />
    </Canvas>
  </div>
);
