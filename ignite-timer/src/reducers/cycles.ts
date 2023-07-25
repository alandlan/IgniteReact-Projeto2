export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptionDate?: Date;
    finishedDate?: Date;
}

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export enum ActionTypes {
    ADD_CYCLE = 'ADD_CYCLE',
    INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
    FINISH_CYCLE = 'FINISH_CYCLE'
}

export function cylesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_CYCLE:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id
            };
        case ActionTypes.INTERRUPT_CYCLE:
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
        case ActionTypes.FINISH_CYCLE:
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === action.payload.activeCycleId) {
                        return {
                            ...cycle,
                            finishedDate: new Date()
                        };
                    } else {
                        return cycle;
                    }
                }),
                activeCycleId: null
            };
        default:
            return state;
    }
}
