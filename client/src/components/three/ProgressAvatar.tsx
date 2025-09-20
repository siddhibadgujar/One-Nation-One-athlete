import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Avatar = () => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <mesh>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#47b6ff" />
    </mesh>
  </Float>
);

export const ProgressAvatar = () => (
  <div className="h-40 w-full rounded-lg overflow-hidden">
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Avatar />
    </Canvas>
  </div>
);
