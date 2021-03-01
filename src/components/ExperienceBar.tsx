import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const {currentExperience, experinceTonextLevel} = useContext(ChallengesContext);
    const percentToNextLevel = (currentExperience/experinceTonextLevel*100);

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: percentToNextLevel+'%'}}></div>
                <span className={styles.currentExperience} style={{left: percentToNextLevel+'%'}}>{currentExperience} xp</span>
            </div>
            <span>{experinceTonextLevel} xp</span>
        </header>
    );
}