import { useContext, useEffect } from 'react';
import { CountdownContainer, Separator } from './styles';
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../../contexts/CyclesContext';

export function Countdown() {
    const {
        activeCycle,
        currentCycleId,
        markCurrentCycleAsFinished,
        amountSeconds,
        setSecondsPassed
    } = useContext(CyclesContext);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        if (activeCycle) {
            const interval = setInterval(() => {
                const current = new Date();
                const diff = differenceInSeconds(current, new Date(activeCycle.startDate));

                if (diff >= totalSeconds) {
                    markCurrentCycleAsFinished();
                    setSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setSecondsPassed(diff);
                }
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [activeCycle, totalSeconds, currentCycleId, markCurrentCycleAsFinished]);

    const currentSeconds = activeCycle ? totalSeconds - amountSeconds : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        document.title = `${minutes}:${seconds} | Pomodoro`;
    }, [minutes, seconds]);

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    );
}
