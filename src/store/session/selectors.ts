import { SessionState } from './types';

export function sessionStarted (state: SessionState): boolean {
    const { user, passwordVerified, tokenVerified } = state;
    return user !== undefined && passwordVerified && tokenVerified;
}