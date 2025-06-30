/**
 * Hook personnalisé pour suivre la position de la souris
 */
import { useState, useEffect } from 'preact/hooks';

export function useMousePosition() {
  // Stocke la position x et y de la souris
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Met à jour la position lors du mouvement de la souris
    const updatePosition = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return position;
}
