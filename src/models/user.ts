type User = {
    _id: string;
    firstName: string,
    lastName: string;
    userName: string;
    password?: string; 
    tmpSecret?: any;
    secret?: any;
    twoFactorAuhtEnabled?: boolean;
}

export default User;
