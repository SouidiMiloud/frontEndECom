/*import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent {
  isLogin=false;
  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService){
    this.loginForm=this.formBuilder.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.min(6),Validators.max(16)])
    })
  
  }


  onSubmit(){
    const email=this.loginForm.value.email;
    const password=this.loginForm.value.password;
    if(email=='davidpaul@test.com'&&password=='david12345'){
      this.authService.login();
    } else alert('Invalid input');
    this.loginForm.reset();
  }
}
*/











import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; 
    }

    const apiUrl = 'http://localhost:8090/authentication/login'; 

    this.http.post(apiUrl, this.loginForm.value)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('email', JSON.stringify(response.user.username));
          localStorage.setItem('jwt', response.token);
        },
        error: (error: any) => {
          console.error('Login error', error);
        }
      });

    this.loginForm.reset(); 
  }
}
