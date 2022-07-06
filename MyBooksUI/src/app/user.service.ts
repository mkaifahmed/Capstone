/** Global variable for user id */

import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() {
    }

    public userId: string;
    public token: string;
}
