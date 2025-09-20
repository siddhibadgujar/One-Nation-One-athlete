import { motion } from 'framer-motion';

export const Card: React.FC<{ children: any; className?: string }> = ({ children, className }) => (
  <motion.div whileHover={{ y: -2 }} className={`glass rounded-xl p-4 ${className || ''}`}>{children}</motion.div>
);
