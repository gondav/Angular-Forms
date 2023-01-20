import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm!: FormGroup;
  hobbiesIndex!: number;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([
        new FormControl('dancing'),
        new FormControl('reading'),
      ]),
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  onAddHobby(event: MatChipInputEvent) {
    const control = new FormControl(event.value, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);

    event.chipInput!.clear();
  }

  removeHobby(hobby: string) {
    const index = this.signUpForm.get('hobbies')?.value.indexOf(hobby);
    if (index && index > -1) {
      (<FormArray>this.signUpForm.get('hobbies')).removeAt(index);
    }
  }

  // customValidator()
}

('Q: How to add custom validator to a FormControl?');
