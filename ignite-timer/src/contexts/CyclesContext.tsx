import { createContext, useReducer, useState } from 'react';
import { ActionTypes, Cycle, cylesReducer } from '../reducers/cycles';

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
        dispatch({
            type: ActionTypes.FINISH_CYCLE,
            payload: {
                activeCycleId
            }
        });
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

        dispatch({
            type: ActionTypes.ADD_CYCLE,
            payload: {
                newCycle
            }
        });

        setAmountSeconds(0);
    }

    function interruptCurrentCycle() {
        dispatch({
            type: ActionTypes.INTERRUPT_CYCLE,
            payload: {
                activeCycleId
            }
        });

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
