export enum UserRole {

    CONSULT_ROLE = 1,
    BORROW_ROLE = 2,
    CONTRIBUTOR_ROLE = 3,
    ADMINISTRATOR_ROLE = 4

}

export class UserUtil {

    static isValidRole(userRole: UserRole) {
        return userRole >= 1 && userRole <= 4;
    }
}