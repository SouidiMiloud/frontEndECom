import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  formData: any = {}; 

  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'http://localhost:8090/authentication/register'; 

    this.http.post(apiUrl, this.formData)
      .subscribe({
        next: (response: any) => {
          console.log('User registered successfully', response);
          this.formData = {};
        },
        error: (error: any) => {
          console.error('Registration error', error);
        }
      });
  }
}
