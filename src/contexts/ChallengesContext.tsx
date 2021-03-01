import {ReactNode, createContext, useState, useEffect} from 'react';
import challenges from '../../challenges.json';
import Cookie from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengescontextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    experinceTonextLevel: number,
    activeChallenge: Challenge,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
}

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number  
}

export const ChallengesContext = createContext({} as ChallengescontextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experinceTonextLevel = Math.pow((level+1) * 4, 2);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookie.set('level', String(level));
        Cookie.set('currentExperience', String(currentExperience));
        Cookie.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp(){
        setLevel(level+1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randonChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randonChallengesIndex];
        setActiveChallenge(challenge);
        new Audio('/notification.mp3').play();

        if(Notification.permission == 'granted') {
            new Notification('Novo Desafio ', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experinceTonextLevel){
            finalExperience = finalExperience - experinceTonextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level, currentExperience, challengesCompleted, activeChallenge,
                experinceTonextLevel,
                levelUp, startNewChallenge, resetChallenge, completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}