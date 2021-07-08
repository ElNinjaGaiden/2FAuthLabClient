import { SessionState } from './types';

export function sessionStarted (state: SessionState): boolean {
    const { user, authenticationFactor2 } = state;
    return user !== undefined && authenticationFactor2;
}