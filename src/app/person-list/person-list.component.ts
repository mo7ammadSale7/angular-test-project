import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../core/person';
import { environment as env } from './../../environments/environment';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  @Output() person: EventEmitter<Person> = new EventEmitter<Person>();
  @Input() persones: Person[];
  @Input() valueChanges: Person[];

  apiRoot: string = env.apiRoot;

  clicked: boolean[] = [];
  constructor() {}

  ngOnInit(): void {}

  personDetails(person: Person, index: number) {
    this.person.emit(person);
    if (!this.clicked[index]) {
      this.clicked.fill(false);
      this.clicked[index] = true;
      return;
    }
  }
}
