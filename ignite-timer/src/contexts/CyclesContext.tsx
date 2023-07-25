import { createContext, useReducer, useState } from 'react';

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

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        (state: CyclesState, action: any) => {
            console.log(action);
            if (action.type == 'ADD_CYCLE') {
                return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id
                };
            }

            if (action.type == 'INTERRUPT_CYCLE') {
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === action.payload.currentCycleId) {
                            return {
                                ...cycle,
                                interruptionDate: new Date()
                            };
                        } else {
                            return cycle;
                        }
                    }),
                    activeCycleId: null
                };
            }

            return state;
        },
        {
            cycles: [],
            activeCycleId: null
        }
    );

    const { cycles, activeCycleId } = cyclesState;

    const [amountSeconds, setAmountSeconds] = useState(0);

    function markCurrentCycleAsFinished() {
        dispatch({
            type: 'FINISH_CYCLE',
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
            type: 'ADD_CYCLE',
            payload: {
                newCycle
            }
        });

        setAmountSeconds(0);
    }

    function interruptCurrentCycle() {
        dispatch({
            type: 'INTERRUPT_CYCLE',
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
