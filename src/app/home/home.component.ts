import { Component, OnInit } from '@angular/core';
import { Person } from '../core/person';
import { ApiService } from './../core/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  persones: Person[] = [];
  person: Person;
  clicked: boolean[] = [];

  private _listFilter: string;

  constructor(private apiService: ApiService) {}
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;

    if (this._listFilter) {
      const result = this.persones.filter(
        (person) =>
          person.name
            .toLocaleLowerCase()
            .indexOf(this._listFilter.toLocaleLowerCase()) !== -1
      );
      this.persones = result;
    } else {
      this.apiService.getAllPerson().subscribe((res: any) => {
        this.persones = res;
      });
    }
  }

  ngOnInit(): void {
    this.apiService.getAllPerson().subscribe((res: any) => {
      this.persones = res;
    });
    this.clicked = new Array(this.persones.length);
    this.apiService.update.subscribe((update) =>
      update
        ? this.apiService.getAllPerson().subscribe((res: any) => {
            this.persones = res;
          })
        : ''
    );
  }

  getData(data: Person) {
    this.person = data;
  }
}
