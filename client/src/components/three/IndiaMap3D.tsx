import { Canvas } from '@react-three/fiber';

export const IndiaMap3D = () => (
  <div className="h-80 w-full rounded-xl overflow-hidden">
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.6} />
      <mesh rotation={[-0.5, 0.5, 0]}>
        <boxGeometry args={[3.5, 2.2, 0.3]} />
        <meshStandardMaterial color="#084f96" />
      </mesh>
    </Canvas>
  </div>
);
