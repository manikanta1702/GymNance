import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Cube() {
  return (
    <mesh rotation={[0.4, 0.4, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#a3ff12" />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-[500px] bg-black rounded-2xl">
      <Canvas camera={{ position: [0, 0, 6] }}>

        <ambientLight intensity={1} />

        <directionalLight
          position={[3, 3, 3]}
          intensity={2}
        />

        <Cube />

        <OrbitControls />

      </Canvas>
    </div>
  );
}