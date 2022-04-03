export class User{
    deleted: boolean;
    email: string;
    name: string;
    _id: string;
    tracking: boolean;
    constructor(deleted: boolean, email: string, name: string, _id: string, tracking: boolean) {
        this._id = _id;
        this.name = name;
        this.deleted = deleted;
        this.email = email;
        this.tracking = tracking;
    }
}
