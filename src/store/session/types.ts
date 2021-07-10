import User from '../../models/user';

export interface SessionState {
    user?: User,
    passwordVerified: boolean;
    tokenVerified: boolean;
}