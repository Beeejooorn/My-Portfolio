import { motion } from "framer-motion";

export default function GlassCard({ as = "div", className = "", children, ...props }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component className={`glass-card ${className}`} {...props}>
      {children}
    </Component>
  );
}
