import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Compass } from 'lucide-react';
import styles from './TimePicker.module.css';

export interface CategoryMenuProps {
  onNavigate: (tab: string) => void;
  className?: string;
}

/* ---------------------------------------------------------------------- */
/* SVG geometry                                                           */
/* ---------------------------------------------------------------------- */

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  };
};

const describeArc = (x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
  const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
  const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, endAngle);
  const endInner = polarToCartesian(x, y, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", startOuter.x, startOuter.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    "Z",
  ].join(" ");
};

type WedgeSide = 'pos' | 'neg';

interface CategoryNode {
  label: string;
  tab: string;
  start: number;
  end: number;
  angle: number;
  side: WedgeSide;
}

const MENU_NODES: CategoryNode[] = [
  { label: 'Tools', tab: 'Tools', start: 0, end: 45, angle: 25, side: 'pos' },
  { label: 'Software', tab: 'Software', start: 45, end: 90, angle: 68, side: 'pos' },
  { label: 'Development', tab: 'Development', start: 90, end: 135, angle: 112, side: 'pos' },
  { label: 'No Sign-ups', tab: 'No Sign-ups', start: 135, end: 180, angle: 155, side: 'pos' },
  { label: 'AI Tools', tab: 'AI Tools', start: 180, end: 225, angle: 205, side: 'neg' },
  { label: 'History', tab: 'History', start: 225, end: 270, angle: 248, side: 'neg' },
  { label: 'Contribute', tab: 'Contribute', start: 270, end: 315, angle: 292, side: 'neg' },
  { label: 'About', tab: 'About', start: 315, end: 360, angle: 335, side: 'neg' },
];

const SVG_SIZE = 360;
const CENTER = SVG_SIZE / 2;
const INNER_RADIUS = 75;
const OUTER_RADIUS = 165;
const ORBIT_RADIUS = 135;

/* ---------------------------------------------------------------------- */
/* Variant A: Weapon Wheel Menu                                           */
/* ---------------------------------------------------------------------- */

export const CategoryWheelMenu: React.FC<CategoryMenuProps> = ({ onNavigate, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const showMenu = isHovered;

  return (
    <div
      className={`${styles.container} ${showMenu ? styles.z50 : styles.z10} ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. SVG Background Layer */}
      <div className={styles.svgLayer}>
        <AnimatePresence>
          {showMenu && (
            <motion.svg
              initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              width={SVG_SIZE}
              height={SVG_SIZE}
              className={styles.svgItem}
            >
              {MENU_NODES.map((wedge, index) => {
                const pathData = describeArc(CENTER, CENTER, INNER_RADIUS, OUTER_RADIUS, wedge.start, wedge.end);
                const centerAngle = wedge.start + (wedge.end - wedge.start) / 2;
                const textPos = polarToCartesian(CENTER, CENTER, (INNER_RADIUS + OUTER_RADIUS) / 2, centerAngle);

                const hoverOffset = polarToCartesian(0, 0, 4, centerAngle);
                const tapOffset = polarToCartesian(0, 0, 1, centerAngle);
                const isPos = wedge.side === 'pos';

                return (
                  <motion.g
                    key={index}
                    className={styles.gElement}
                    style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                    whileHover={{ x: hoverOffset.x, y: hoverOffset.y }}
                    whileTap={{ x: tapOffset.x, y: tapOffset.y, transition: { duration: 0.05 } }}
                  >
                    <motion.path
                      d={pathData}
                      style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                      whileTap={{ scale: 0.98, transition: { duration: 0.05 } }}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => onNavigate(wedge.tab)}
                      className={`${styles.wedgePath} ${isPos ? styles.wedgePathPos : styles.wedgePathNeg}`}
                    />
                    <text
                      x={textPos.x}
                      y={textPos.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={`${styles.wedgeText} ${isPos ? styles.wedgeTextPos : styles.wedgeTextNeg}`}
                    >
                      {wedge.label}
                    </text>
                  </motion.g>
                );
              })}
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Main Button */}
      <button className={styles.centerButton} aria-label="Menu">
        <LayoutGrid size={28} />
        <span>Menu</span>
      </button>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Variant B: Orbit Circles Menu                                          */
/* ---------------------------------------------------------------------- */

export const CategoryOrbitMenu: React.FC<CategoryMenuProps> = ({ onNavigate, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const showMenu = isHovered;

  const nodeVariants = {
    hidden: { opacity: 0, x: 0, y: 0, scale: 0.2 },
    visible: (custom: CategoryNode) => {
      const pos = polarToCartesian(0, 0, ORBIT_RADIUS, custom.angle);
      return {
        opacity: 1,
        x: pos.x,
        y: pos.y,
        scale: 1,
        transition: { type: 'spring' as const, stiffness: 350, damping: 22 },
      };
    },
    exit: { opacity: 0, x: 0, y: 0, scale: 0.2, transition: { duration: 0.15 } },
  };

  return (
    <div
      className={`${styles.container} ${showMenu ? styles.z50 : styles.z10} ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Floating Circles Layer */}
      <div className={styles.svgLayer}>
        <AnimatePresence>
          {showMenu && MENU_NODES.map((node, i) => {
            const isPos = node.side === 'pos';
            return (
              <motion.button
                key={i}
                custom={node}
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.08, boxShadow: "0px 8px 12px -3px rgba(0,0,0,0.12)" }}
                whileTap={{ scale: 0.95, boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)", transition: { duration: 0.05 } }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onNavigate(node.tab)}
                className={`${styles.circleNode} ${isPos ? styles.circleNodePos : styles.circleNodeNeg}`}
              >
                {node.label}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 2. Main Button */}
      <button className={styles.centerButton} aria-label="Explore">
        <Compass size={28} />
        <span>Explore</span>
      </button>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Demo Component                                                         */
/* ---------------------------------------------------------------------- */

export const CategoryMenuDemo: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <h2 className={styles.demoTitle}>Quick Launch Portals</h2>
        <p className={styles.demoDesc}>
          Hover over the portals below to quickly jump into different sections of Utilify.
        </p>
      </div>

      <div className={styles.demoGrid}>
        <div className={styles.demoItem}>
          <div className={styles.demoHeaderRow}>
            <span className={styles.demoLabel}>Radial Wheel</span>
          </div>
          <CategoryWheelMenu onNavigate={onNavigate} />
        </div>

        <div className={styles.demoItem}>
          <div className={styles.demoHeaderRow}>
            <span className={styles.demoLabel}>Orbit Hub</span>
          </div>
          <CategoryOrbitMenu onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};
