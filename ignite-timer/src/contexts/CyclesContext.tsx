import { createContext, useEffect, useReducer, useState } from 'react';
import { Cycle, cylesReducer } from '../reducers/cycles/reducer';
import {
    AddCycleAction,
    FinishCycleAction,
    InterruptCycleAction
} from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

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
    const [cyclesState, dispatch] = useReducer(
        cylesReducer,
        {
            cycles: [],
            activeCycleId: null
        },
        (initialState) => {
            const stateJson = localStorage.getItem('@ignite-timer:cyclesState-1.0.0');

            if (stateJson) {
                return JSON.parse(stateJson);
            }

            return initialState;
        }
    );

    useEffect(() => {
        const stateJson = JSON.stringify(cyclesState);

        localStorage.setItem('@ignite-timer:cyclesState-1.0.0', stateJson);
    }, [cyclesState]);

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const [amountSeconds, setAmountSeconds] = useState(() => {
        if (activeCycleId && activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        }

        return 0;
    });

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
