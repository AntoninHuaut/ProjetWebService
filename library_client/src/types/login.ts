
export interface LoginStatus {
    isLogging: boolean,
    user: User
}

export interface RegisterUserDto {
    userName: string,
    password: string,
    role: UserRole
}

export interface User {
    userId: number,
    userName: string;
    role: UserRole;
    token: string;
}

export enum UserRole {
    CONSULT_ROLE = 1,
    BORROW_ROLE = 2,
    CONTRIBUTOR_ROLE = 3,
    ADMINISTRATOR_ROLE = 4
}

export interface LoginUserDto {
    userName: string,
    password: string
}