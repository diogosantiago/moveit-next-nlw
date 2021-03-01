import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const {level} = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src="http://github.com/diogosantiago.png" alt="Diogo Santiago"/>
            <div>
                <strong>
                    Diogo Santiago
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}