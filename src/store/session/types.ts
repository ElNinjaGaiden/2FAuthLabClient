import User from '../../models/user';

export interface SessionState {
    user?: User,
    authenticationFactor1: boolean;
    authenticationFactor2: boolean;
}