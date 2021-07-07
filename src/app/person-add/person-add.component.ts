import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css'],
})
export class PersonAddComponent {
  personAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.personAddForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      image: [null, Validators.required],
      statusDes: ['', Validators.required],
      familyNum: ['', Validators.required],
      followersNum: ['', Validators.required],
      nationalID: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      homeRent: ['', Validators.required],
      finance: ['', Validators.required],
      financeSrc: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.personAddForm.patchValue({
        image: file,
      });
      this.personAddForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    this.apiService
      .creatPerson(this.personAddForm.value)
      .subscribe((res) => this.router.navigate(['/']));
  }
}
