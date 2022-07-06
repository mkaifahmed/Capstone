import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {LoginService} from '../login.service';
import {UserService} from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    user: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
    }

    // login service
    login() {
        this.loginService.login(this.user)
            .subscribe(
                data => {
                    console.log(data);
                    this.userService.userId = this.user.username;
                    this.userService.token = data.token;
                    localStorage.setItem('accessToken', data.token);
                    localStorage.setItem('userId', this.user.username);
                    this.router.navigate(['dashboard']);
                },
                error => {
                    // this.alertService.error(error.error.message);
                    alert('Invalid Credentials');
                });
    }

}
