import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

// 🛠️ Silence the THREE.Clock deprecation warning globally
// This is necessary because R3F and EffectComposer v8 still use THREE.Clock internally,
// which triggers warnings in Three.js r183+.
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
    return;
  }
  originalWarn(...args);
};

extend({ UnrealBloomPass });

const ParticleSwarm = ({ aiState }) => {
  const meshRef = useRef();
  const count = 1000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xf0a113 }), []);
  const geometry = useMemo(() => new THREE.SphereGeometry(0.3, 8, 8), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Adjust speed based on state
    let speedMult = 0.5;
    if (aiState === 'thinking') speedMult = 2.0;
    if (aiState === 'speaking') speedMult = 1.0;
    
    const time = state.clock.elapsedTime * speedMult;

    // Define color based on state
    let targetColorHex = 0xf0a113; // SATHI brand color (#f0a113)
    if (aiState === 'thinking') targetColorHex = 0xffe0a0; // Lighter orange for thinking
    if (aiState === 'speaking') targetColorHex = 0xf0a113; // Back to brand color
    
    pColor.setHex(targetColorHex);

    for (let i = 0; i < count; i++) {
        // Base uniform sphere arrangement
        let r = 30;
        
        if (aiState === 'thinking') {
             // Pulsating effect
             r = 30 + Math.sin(time * 5 + i) * 3;
        } else if (aiState === 'speaking') {
             // Wavy, active effect
             r = 30 + Math.sin(time * 2 + (i % 100)) * 5;
        } else {
             // Idle breathing
             r = 30 + Math.sin(time + i/1000) * 1;
        }

        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        
        target.set(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi));

        // Let particles transition to their targets
        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export default function SathiSphere({ aiState = 'idle' }) {
  // Use THREE.Timer (available in r163+) to avoid THREE.Clock deprecation warnings
  const timer = useMemo(() => new THREE.Timer(), []);
  
  // Create a shim for the Clock interface that R3F expects
  const silentClock = useMemo(() => ({
    get elapsedTime() { return timer.getElapsed(); },
    getElapsedTime: () => timer.getElapsed(),
    getDelta: () => timer.getDelta(),
    start: () => {},
    stop: () => {},
    update: (t) => timer.update(t)
  }), [timer]);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas 
        clock={silentClock}
        camera={{ position: [0, 0, 80], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f0a113" />
        <ParticleSwarm aiState={aiState} />
        <OrbitControls autoRotate={true} autoRotateSpeed={aiState === 'thinking' ? 6 : (aiState === 'speaking' ? 3 : 1)} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}