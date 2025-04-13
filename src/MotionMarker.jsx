// components/MotionMarker.jsx
import { Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function MotionMarker({ position, icon, children, index }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  return show ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Marker position={position} icon={icon}>
        {children}
      </Marker>
    </motion.div>
  ) : null;
}
