import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import SathiSphere from './sphere';

export default function SathiBody({ aiState = 'idle' }) {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  // Map state to particle options
  const getParticleOptions = () => {
    const isThinking = aiState === 'thinking';
    const isSpeaking = aiState === 'speaking';
    
    return {
      autoPlay: true,
      background: {
        color: { value: "transparent" },
      },
      fullScreen: { enable: false },
      fpsLimit: 60,
      interactivity: {
        events: {
          resize: true,
        },
      },
      particles: {
        color: { value: "#f0a113" },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: true,
          speed: isThinking ? 6 : (isSpeaking ? 3 : 1),
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: isThinking ? 150 : 80,
        },
        opacity: {
          value: isThinking ? 0.7 : 0.4,
          animation: {
            enable: true,
            speed: isThinking ? 3 : 1,
            minimumValue: 0.1,
          }
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: isThinking ? 10 : 2,
            minimumValue: 1,
          }
        },
        twinkle: {
            particles: {
                enable: true,
                color: "#ffffff",
                frequency: isThinking ? 0.1 : 0.05,
                opacity: 0.8
            }
        },
        life: {
            duration: {
                sync: false,
                value: 3
            },
            count: 0
        }
      },
      detectRetina: true,
    };
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle, rgba(240,161,19,0.05) 0%, rgba(0,0,0,0) 70%)',
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      {/* 2D Particle Aura Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Particles
          id="sathi-aura"
          init={particlesInit}
          options={getParticleOptions()}
        />
      </div>

      {/* 3D Energetic Core Layer */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        <SathiSphere aiState={aiState} />
      </div>
    </div>
  );
}
