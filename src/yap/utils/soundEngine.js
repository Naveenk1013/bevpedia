import { useCallback, useRef, useEffect } from 'react';

// Centralised AudioContext to prevent overloading browser limits
let globalAudioCtx = null;

const getAudioContext = () => {
    if (!globalAudioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            globalAudioCtx = new AudioContext();
        }
    }
    return globalAudioCtx;
};

export const useSound = (type = 'ui/click_1') => {
    
    // In case the browser suspends audio context until interaction
    const ensureResumed = () => {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
            ctx.resume();
        }
        return ctx;
    };

    const playClick = useCallback(() => {
        const ctx = ensureResumed();
        if (!ctx) return;
        try {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            // Subtle fast tap (1500Hz -> 10Hz in 30ms)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1500, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.03);
            
            gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
            
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.03);
        } catch (e) {
            console.warn('Audio play restricted by browser:', e);
        }
    }, []);

    const playReceive = useCallback(() => {
        const ctx = ensureResumed();
        if (!ctx) return;
        try {
            const osc = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            // Soft Glass Ping: Two harmonics fading
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
            
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(1760, ctx.currentTime); // A6
            
            // Attack and long fade
            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            
            osc.start(ctx.currentTime);
            osc2.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.6);
            osc2.stop(ctx.currentTime + 0.6);
        } catch (e) {
            console.warn('Audio play restricted by browser:', e);
        }
    }, []);

    const play = useCallback(() => {
        if (type.includes('glass_ping')) {
            playReceive();
        } else {
            playClick();
        }
    }, [type, playClick, playReceive]);

    return { play };
};
