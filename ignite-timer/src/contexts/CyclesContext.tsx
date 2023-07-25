import { createContext, useReducer, useState } from 'react';
import { Cycle, cylesReducer } from '../reducers/cycles/reducer';
import {
    AddCycleAction,
    FinishCycleAction,
    InterruptCycleAction
} from '../reducers/cycles/actions';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    currentCycleId: string | null;
    amountSeconds: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
    children: React.ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cylesReducer, {
        cycles: [],
        activeCycleId: null
    });

    const { cycles, activeCycleId } = cyclesState;

    const [amountSeconds, setAmountSeconds] = useState(0);

    function markCurrentCycleAsFinished() {
        dispatch(FinishCycleAction(activeCycleId));
    }

    function setSecondsPassed(seconds: number) {
        setAmountSeconds(seconds);
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };

        dispatch(AddCycleAction(newCycle));

        setAmountSeconds(0);
    }

    function interruptCurrentCycle() {
        dispatch(InterruptCycleAction(activeCycleId));

        setAmountSeconds(0);
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle: cycles.find((cycle) => cycle.id === activeCycleId),
                currentCycleId: activeCycleId,
                markCurrentCycleAsFinished,
                amountSeconds,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    );
}
