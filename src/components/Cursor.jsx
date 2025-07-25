import { useCustomCursor } from '../hooks/cursorMouse.js';


// Composant Cursor qui affiche le curseur custom et active le hook
export function Cursor() {
  useCustomCursor(); // Active le comportement du curseur custom
  return (
    <div className="custom-cursor">
      <div className="inner-circle"></div>
    </div>
  );
}