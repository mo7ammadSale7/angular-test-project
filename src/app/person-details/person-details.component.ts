import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../core/person';
import { environment as env } from './../../environments/environment';
import { ApiService } from './../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
})
export class PersonDetailsComponent {
  @Input() person: Person;

  apiRoot: string = env.apiRoot;
  constructor(private apiservice: ApiService, private router: Router) {}

  deletePerson(id: any) {
    this.apiservice.deletePerson(id).subscribe((res) => console.log(res));
    this.apiservice.update.next(true);
  }

  editPerson(id: any) {
    this.router.navigate(['./edit', id]);
  }
}
