import { IUsersResponse } from "../declarations/users-response";

export class Users {
    fullName!: string;
    birthDate!: Date;
    email!: string;
    extension!: string;
    phone!: number;
    signature!: string;

    constructor(attrs: IUsersResponse) {
        this.fullName = attrs.users.fullName;
        this.birthDate = attrs.users.birthdate
        this.email = attrs.users.email
        this.extension = attrs.users.extension
        this.phone = attrs.users.phone
        this.signature = attrs.users.signature
    }
}
