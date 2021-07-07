import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Person } from './../core/person';
import { ApiService } from './../core/api.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css'],
})
export class PersonEditComponent implements OnInit {
  person: Person;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.apiService.getPerson(id).subscribe((res: any) => (this.person = res));
  }

  onSubmit(form: NgForm) {
    const id = this.activatedRoute.snapshot.params.id;
    this.apiService
      .updatePerson(id, form.value)
      .subscribe((res: any) => this.apiService.update.next(true));
    this.router.navigate(['/']);
  }
}
