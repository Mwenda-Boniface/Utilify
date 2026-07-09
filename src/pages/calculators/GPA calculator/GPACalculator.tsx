import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import styles from '../Calculators.module.css';

interface Course {
  id: string;
  name: string;
  grade: number;
  credits: number;
}

const GRADES = [
  { label: 'A (4.0)', value: 4.0 },
  { label: 'A- (3.7)', value: 3.7 },
  { label: 'B+ (3.3)', value: 3.3 },
  { label: 'B (3.0)', value: 3.0 },
  { label: 'B- (2.7)', value: 2.7 },
  { label: 'C+ (2.3)', value: 2.3 },
  { label: 'C (2.0)', value: 2.0 },
  { label: 'D (1.0)', value: 1.0 },
  { label: 'F (0.0)', value: 0.0 },
];

const GPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', grade: 4.0, credits: 3 },
    { id: '2', name: 'Course 2', grade: 3.0, credits: 3 },
  ]);
  const [gpa, setGpa] = useState<number>(0);

  useEffect(() => {
    calculateGPA();
  }, [courses]);

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(c => {
      totalPoints += c.grade * c.credits;
      totalCredits += c.credits;
    });

    if (totalCredits === 0) {
      setGpa(0);
    } else {
      setGpa(Math.round((totalPoints / totalCredits) * 100) / 100);
    }
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: `Course ${courses.length + 1}`,
      grade: 4.0,
      credits: 3,
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <GraduationCap size={20} />
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>GPA Calculator</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.card} style={{ gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {courses.map((course) => (
              <div key={course.id} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 80px 40px', gap: '0.5rem', alignItems: 'center', padding: '0.5rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <input 
                  className={styles.input}
                  style={{ padding: '0.5rem' }}
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  placeholder="Course Name"
                />
                <select 
                  className={styles.select}
                  style={{ padding: '0.5rem' }}
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', Number(e.target.value))}
                >
                  {GRADES.map(g => <option key={g.label} value={g.value}>{g.label}</option>)}
                </select>
                <input 
                  type="number"
                  className={styles.input}
                  style={{ padding: '0.5rem' }}
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                  placeholder="Cr"
                />
                <button 
                  onClick={() => removeCourse(course.id)}
                  style={{ color: 'var(--text-muted)', display: 'flex', justifyContent: 'center' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button className={styles.btnSecondary} onClick={addCourse}>
            <Plus size={18} />
            Add Course
          </button>
        </div>

        <div className={styles.results}>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Term GPA</span>
            <span className={styles.resultValue}>{gpa.toFixed(2)}</span>
            <div className={styles.visualization} style={{ width: '100%', marginTop: '1rem' }}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(gpa / 4.0) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className={styles.card} style={{ gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span color="var(--text-muted)">Total Credits</span>
              <span style={{ fontWeight: 700 }}>{courses.reduce((acc, c) => acc + c.credits, 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span color="var(--text-muted)">Grade Points</span>
              <span style={{ fontWeight: 700 }}>{courses.reduce((acc, c) => acc + (c.grade * c.credits), 0).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
