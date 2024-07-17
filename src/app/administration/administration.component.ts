import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const jwt = localStorage.getItem('jwt');     
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
  
    this.http.get<any[]>('http://localhost:8090/user/users', { headers })
      .subscribe(users => {
        this.users = users;
      });
  }

  editUser(email: string): void {
    this.router.navigate(['/edituser'], { queryParams: { email: email } });
  }

  deleteUser(email: string): void{
    const jwt = localStorage.getItem('jwt'); 

    if (jwt) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      });

      this.http.delete(`http://localhost:8090/user/delete?email=${email}`, { headers })
        .subscribe({
          next: () => {
            console.log('User deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting user', error);
          }
        });
    } else {
      console.error('No token found in localStorage');
    }
  }
}
