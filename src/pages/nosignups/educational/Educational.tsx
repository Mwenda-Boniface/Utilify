import React from 'react';
import { BookOpen, ArrowUpRight, GraduationCap } from 'lucide-react';
import styles from './Educational.module.css';

interface EducationalItem {
  name: string;
  url: string;
  desc: string;
}

interface EducationalSection {
  title: string;
  items: EducationalItem[];
}

const SECTIONS: EducationalSection[] = [
  {
    title: 'Courses & Streaming',
    items: [
      { name: 'Limnology', url: 'https://limnology.co/', desc: 'Search index for educational and academic YouTube channels' },
      { name: 'edX', url: 'https://www.edx.org/', desc: 'Access online university courses from leading global institutions' },
      { name: 'MitOpenCourseWare', url: 'https://ocw.mit.edu/', desc: 'Free online publication of materials from virtually all MIT courses' },
      { name: 'Khan Academy', url: 'https://www.khanacademy.org/', desc: 'Free personalized learning resources for school topics' },
      { name: 'Class Central', url: 'https://www.classcentral.com/', desc: 'Search engine reviews aggregator for free online courses' },
      { name: 'Educational Hub', url: 'https://educationalhub.in/', desc: 'Directory providing links to free tutorials and training resources' },
      { name: 'OpenLearn', url: 'https://www.open.edu/openlearn/', desc: 'Free learning materials library published by The Open University' },
      { name: 'Alison', url: 'https://alison.com/', desc: 'Free online certificate courses and training programs' },
      { name: 'Saylor Academy', url: 'https://learn.saylor.org/', desc: 'Free college-level courses offering digital certificates' },
      { name: 'OpenCulture', url: 'https://www.openculture.com/freeonlinecourses', desc: 'Curated list of thousands of free lectures and university courses' },
      { name: 'FreeCourseSites', url: 'https://freecoursesites.com/', desc: 'Direct link directory sharing technical tutorials and courses' },
      { name: 'DigitalGarage', url: 'https://grow.google/intl/uk/courses-and-tools/', desc: 'Google-certified training courses covering digital skills' },
      { name: 'OpenHPI', url: 'https://open.hpi.de/', desc: 'Interactive online courses covering IT and computer science topics' },
      { name: 'LearnOutLoud', url: 'https://www.learnoutloud.com/', desc: 'Directory of educational audiobooks, podcasts, and documentaries' },
      { name: 'Video Lectures', url: 'https://videolectures.net/', desc: 'Academic video lectures recorded at major conferences and workshops' },
      { name: 'Yale Courses', url: 'https://oyc.yale.edu/courses', desc: 'Free introductory campus courses recorded at Yale University' },
      { name: 'Crash Course', url: 'https://thecrashcourse.com/', desc: 'Short topic-focused animated educational video series' }
    ]
  },
  {
    title: 'Downloading',
    items: [
      { name: 'Free-Courses-For-Everyone', url: 'https://github.com/MasterBrian99/Free-Courses-For-Everyone', desc: 'GitHub index linking free programming and technical training paths' },
      { name: 'Course Busters', url: 'https://www.cbusters.com/home', desc: 'Platform providing access to otherwise paid training courses' },
      { name: 'FreeCourseSite', url: 'https://freecoursesite.com/', desc: 'Torrenting links for technical tutorials and software packages' },
      { name: 'AfraTafreeh', url: 'https://afratafreeh.com/', desc: 'Direct download catalog hosting programming courses and guides' }
    ]
  }
];

interface EducationalProps { searchValue?: string; }
const Educational: React.FC<EducationalProps> = ({ searchValue = '' }) => {
  const filteredSections = SECTIONS.map(sec => ({
    ...sec,
    items: sec.items.filter(item => 
      item.name.toLowerCase().includes(searchValue.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchValue.toLowerCase())
    )
  })).filter(sec => sec.items.length > 0);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <GraduationCap size={26} className={styles.icon} />
          <h2>Educational</h2>
        </div>
        <p className={styles.subtitle}>
          Browse MIT courseware libraries, search online university course indexes, and download coding tutorials.
        </p>
      </header>

      <div className={styles.sectionsGrid}>
        {filteredSections.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No tools found matching "{searchValue}"
          </div>
        ) : filteredSections.map((sec) => (
          <section key={sec.title} className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <BookOpen size={18} className={styles.sectionIcon} />
              <h3>{sec.title}</h3>
            </div>
            
            <div className={styles.cardsGrid}>
              {sec.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.card} glass`}
                >
                  <div className={styles.cardInfo}>
                    <h4 className={styles.cardName}>
                      {item.name}
                      <ArrowUpRight size={14} className={styles.arrow} />
                    </h4>
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.hostname}>{new URL(item.url).hostname}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Educational;
