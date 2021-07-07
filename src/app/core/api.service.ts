import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './person';
import { environment as env } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  update = new BehaviorSubject<boolean>(false);

  auth_token = localStorage.getItem('AuthToken');
  header = {
    headers: new HttpHeaders().set('Authorization', `${this.auth_token}`),
  };

  constructor(private http: HttpClient) {}

  getAllPerson() {
    return this.http.get<Person[]>(`${env.apiRoot}persons`, this.header);
  }

  getPerson(id: any) {
    return this.http.get(`${env.apiRoot}persons/${id}`, this.header);
  }

  creatPerson(person: any) {
    const formData: any = new FormData();
    for (let key in person) {
      formData.append(key, person[key]);
    }
    return this.http.post(`${env.apiRoot}persons`, formData, this.header);
  }

  updatePerson(id: any, person: any) {
    return this.http.put(`${env.apiRoot}persons/${id}`, person, this.header);
  }

  deletePerson(id: any) {
    return this.http.delete(`${env.apiRoot}persons/${id}`, this.header);
  }
}
