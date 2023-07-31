import { ActionTypes } from './actions';
import { produce } from 'immer';

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

export function cylesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_CYCLE:
            return produce(state, (draftState) => {
                draftState.cycles.push(action.payload.newCycle);
                draftState.activeCycleId = action.payload.newCycle.id;
            });
        case ActionTypes.INTERRUPT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId;
            });

            if (currentCycleIndex < 0) {
                return state;
            }

            return produce(state, (draftState) => {
                draftState.cycles[currentCycleIndex].interruptionDate = new Date();
                draftState.activeCycleId = null;
            });
        }
        case ActionTypes.FINISH_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId;
            });

            if (currentCycleIndex < 0) {
                return state;
            }

            return produce(state, (draftState) => {
                draftState.cycles[currentCycleIndex].finishedDate = new Date();
                draftState.activeCycleId = null;
            });
        }
        default:
            return state;
    }
}
