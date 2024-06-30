import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AuthService} from '../../services/auth.services';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatError, ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _authService: AuthService,
        private readonly _router: Router
    ) {
    }

    public ngOnInit(): void {
        this.onCreateForm();
    }

    public onSubmit(): void {
        const {email, password} = this.loginForm.value;
        if (this._authService.login(email, password)) {
            console.log('Logged in successfully!');
            this._router.navigate(['/liste-ingredients']);
        } else {
            console.log('Login failed!');
        }
        this.loginForm.reset();
    }

    private onCreateForm(): void {
        this.loginForm = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}
