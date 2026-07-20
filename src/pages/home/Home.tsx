import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, Shield, Zap, Globe } from 'lucide-react';
import styles from './Home.module.css';
import { CategoryOrbitMenu, CategoryWheelMenu } from './TimePicker';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  return (
    <motion.div 
      className={styles.homeContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.backgroundGlow} />
      
      <div className={styles.topSection}>
        {/* Left Side: Orbit Category Menu */}
        <motion.div 
          className={styles.leftColumn}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CategoryOrbitMenu onNavigate={setActiveTab} />
        </motion.div>

        {/* Right Side: Hero Text */}
        <motion.div 
          className={styles.heroRight}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
        <h1 className={styles.title}>
          The Ultimate <span className={styles.titleHighlight}>Client-Side</span> Utility Suite
        </h1>
        <p className={styles.subtitle}>
          A premium collection of over 360+ developer tools, calculators, generators, and software recommendations. Completely free, no sign-ups, and blazing fast.
        </p>
        
        <div className={styles.ctaContainer}>
          <button 
            className={styles.primaryButton}
            onClick={() => setActiveTab('Tools')}
          >
            Explore Tools <ArrowRight size={20} />
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={() => setActiveTab('Development')}
          >
            Development Hub
          </button>
        </div>
        </motion.div>
      </div>

      <div className={styles.bottomSection}>
        {/* Left Side: Features Grid */}
        <motion.div 
          className={styles.featuresGrid}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Wrench size={28} />
            </div>
            <h3 className={styles.featureTitle}>360+ Utilities</h3>
            <p className={styles.featureDesc}>From base64 encoders and formatters to QR code generators and extensive software hubs.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Shield size={28} />
            </div>
            <h3 className={styles.featureTitle}>Privacy First</h3>
            <p className={styles.featureDesc}>100% client-side processing. Your data never leaves your browser, ensuring total privacy.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Zap size={28} />
            </div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureDesc}>Built with modern web technologies to deliver instantaneous results with no loading screens.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Globe size={28} />
            </div>
            <h3 className={styles.featureTitle}>No Sign-ups</h3>
            <p className={styles.featureDesc}>Free forever with no paywalls, subscriptions, or accounts required to access any tool.</p>
          </div>
        </motion.div>

        {/* Right Side: Wheel Category Menu */}
        <motion.div 
          className={styles.rightColumn}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CategoryWheelMenu onNavigate={setActiveTab} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
