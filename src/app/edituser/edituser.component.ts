import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  formData = {
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    nationality: '',
    bankInfo: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      this.formData.username = email; 
    });
  }

  onSubmit(): void {
    const apiUrl = 'http://localhost:8090/user/edit';

    const jwt = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    });

    const postData = { ...this.formData };

    this.http.post(apiUrl, postData, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('User updated successfully', response);
          
        },
        error: (error: any) => {
          console.error('Update error', error);
        }
      });
  }
}
