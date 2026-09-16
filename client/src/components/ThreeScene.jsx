import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import { useRef } from "react";

/* =========================================================
   DUMBBELL
   ========================================================= */

function Dumbbell() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    /*
      Automatic rotation
    */
    groupRef.current.rotation.y += delta * 0.28;

    /*
      Subtle floating tilt
    */
    groupRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.06;

    /*
      Mouse movement

      state.pointer.x and state.pointer.y give us
      the mouse/touch position inside the canvas.
    */
    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.18;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.02;

    groupRef.current.rotation.y +=
      targetY * 0.01;
  });

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.12}
      floatIntensity={0.5}
    >
      <group
        ref={groupRef}
        rotation={[0.15, 0, -0.15]}
        scale={1.35}
      >

        {/* =================================================
            MAIN HANDLE
           ================================================= */}

        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry
            args={[0.16, 0.16, 2.8, 32]}
          />

          <meshStandardMaterial
            color="#15131A"
            metalness={0.95}
            roughness={0.16}
          />
        </mesh>


        {/* =================================================
            LEFT GOLD PLATE
           ================================================= */}

        <mesh
          position={[-1.15, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.65, 0.65, 0.32, 48]}
          />

          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.16}
          />
        </mesh>


        {/* =================================================
            LEFT BLACK PLATE
           ================================================= */}

        <mesh
          position={[-1.48, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.52, 0.52, 0.25, 48]}
          />

          <meshStandardMaterial
            color="#15131A"
            metalness={0.95}
            roughness={0.16}
          />
        </mesh>


        {/* =================================================
            RIGHT GOLD PLATE
           ================================================= */}

        <mesh
          position={[1.15, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.65, 0.65, 0.32, 48]}
          />

          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.16}
          />
        </mesh>


        {/* =================================================
            RIGHT BLACK PLATE
           ================================================= */}

        <mesh
          position={[1.48, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.52, 0.52, 0.25, 48]}
          />

          <meshStandardMaterial
            color="#15131A"
            metalness={0.95}
            roughness={0.16}
          />
        </mesh>


        {/* =================================================
            LEFT PURPLE COLLAR
           ================================================= */}

        <mesh
          position={[-0.78, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.23, 0.23, 0.18, 32]}
          />

          <meshStandardMaterial
            color="#6D28D9"
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>


        {/* =================================================
            RIGHT PURPLE COLLAR
           ================================================= */}

        <mesh
          position={[0.78, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.23, 0.23, 0.18, 32]}
          />

          <meshStandardMaterial
            color="#6D28D9"
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>


        {/* =================================================
            LEFT GOLD END CAP
           ================================================= */}

        <mesh
          position={[-1.62, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.18, 0.18, 0.12, 32]}
          />

          <meshStandardMaterial
            color="#F3D58A"
            metalness={0.95}
            roughness={0.12}
          />
        </mesh>


        {/* =================================================
            RIGHT GOLD END CAP
           ================================================= */}

        <mesh
          position={[1.62, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.18, 0.18, 0.12, 32]}
          />

          <meshStandardMaterial
            color="#F3D58A"
            metalness={0.95}
            roughness={0.12}
          />
        </mesh>

      </group>
    </Float>
  );
}


/* =========================================================
   ORBITAL RING
   ========================================================= */

function OrbitRing({ rotation, color, scale = 1 }) {
  return (
    <mesh
      rotation={rotation}
      scale={scale}
    >
      <torusGeometry
        args={[2.7, 0.012, 16, 128]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.32}
      />
    </mesh>
  );
}


/* =========================================================
   MAIN THREE.JS SCENE
   ========================================================= */

export default function ThreeScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45,
      }}

      dpr={[1, 1.5]}

      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
    >

      {/* =================================================
          AMBIENT LIGHT
         ================================================= */}

      <ambientLight intensity={0.4} />


      {/* =================================================
          GOLD KEY LIGHT
         ================================================= */}

      <directionalLight
        position={[4, 5, 4]}
        intensity={2.4}
        color="#FFF4D0"
      />


      {/* =================================================
          ROYAL PURPLE LIGHT
         ================================================= */}

      <pointLight
        position={[-4, -2, -3]}
        intensity={1.5}
        color="#6D28D9"
      />


      {/* =================================================
          GOLD FILL LIGHT
         ================================================= */}

      <pointLight
        position={[4, 1, 2]}
        intensity={1.3}
        color="#D4AF37"
      />


      {/* =================================================
          DUMBBELL
         ================================================= */}

      <Dumbbell />


      {/* =================================================
          ORBITAL RINGS

          One gold
          One purple
         ================================================= */}

      <OrbitRing
        rotation={[Math.PI / 2.7, 0.2, 0.2]}
        color="#D4AF37"
        scale={0.9}
      />

      <OrbitRing
        rotation={[Math.PI / 2.2, -0.5, 0.4]}
        color="#6D28D9"
        scale={0.82}
      />


      {/* =================================================
          GOLD PARTICLES
         ================================================= */}

      <Sparkles
        count={70}
        scale={[6, 5, 4]}
        size={1.5}
        speed={0.25}
        color="#D4AF37"
      />


      {/* =================================================
          PURPLE PARTICLES
         ================================================= */}

      <Sparkles
        count={35}
        scale={[5, 4, 3]}
        size={1}
        speed={0.18}
        color="#8B5CF6"
      />


      {/* =================================================
          ENVIRONMENT REFLECTIONS
         ================================================= */}

      <Environment preset="city" />


      {/* =================================================
          MOUSE + TOUCH INTERACTION

          Zoom OFF
          Pan OFF
          Rotation ON
         ================================================= */}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.45}
      />

    </Canvas>
  );
}