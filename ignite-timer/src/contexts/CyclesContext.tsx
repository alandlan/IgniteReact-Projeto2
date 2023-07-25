import { createContext, useState } from 'react';

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptionDate?: Date;
    finishedDate?: Date;
}

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
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [currentCycleId, setCurrentCycleId] = useState<string | null>(null);
    const [amountSeconds, setAmountSeconds] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === currentCycleId);

    function markCurrentCycleAsFinished() {
        setCycles((state) => {
            const updatedCycles = state.map((cycle) => {
                if (cycle.id === currentCycleId) {
                    return {
                        ...cycle,
                        finishedDate: new Date()
                    };
                }
                return cycle;
            });

            return updatedCycles;
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

        setCycles((state) => [...state, newCycle]);
        setCurrentCycleId(id);
        setAmountSeconds(0);

        //reset();
    }

    function interruptCurrentCycle() {
        setCycles((state) => {
            const updatedCycles = state.map((cycle) => {
                if (cycle.id === currentCycleId) {
                    return {
                        ...cycle,
                        interruptionDate: new Date()
                    };
                }
                return cycle;
            });

            return updatedCycles;
        });

        setCurrentCycleId(null);
        setAmountSeconds(0);
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                currentCycleId,
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
