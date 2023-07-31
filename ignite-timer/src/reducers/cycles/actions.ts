import { Cycle } from './reducer';

export enum ActionTypes {
    ADD_CYCLE = 'ADD_CYCLE',
    INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
    FINISH_CYCLE = 'FINISH_CYCLE'
}

export function AddCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.ADD_CYCLE,
        payload: {
            newCycle
        }
    };
}

export function InterruptCycleAction(currentCycleId: string | null) {
    return {
        type: ActionTypes.INTERRUPT_CYCLE,
        payload: {
            currentCycleId
        }
    };
}

export function FinishCycleAction(currentCycleId: string | null) {
    return {
        type: ActionTypes.FINISH_CYCLE,
        payload: {
            currentCycleId
        }
    };
}
