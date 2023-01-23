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
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([
        new FormControl('Dancing'),
        new FormControl('Cooking'),
      ]),
    });
    this.signUpForm.statusChanges.subscribe({
      next: (v) => console.log(v),
      error: (err) => console.log(err),
    });
    this.signUpForm.patchValue({
      userData: {
        username: 'Anna McCarthy',
        email: 'anna.Mc@email.com',
      },
      gender: 'male',
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    // console.log(
    //   (this.signUpForm.get('userData') as FormGroup).get('username')?.value
    // );
    this.signUpForm.reset({
      userData: {
        username: 'Username',
        email: 'mail@email.com',
      },
      hobbies: ['Dancing', 'Cooking'],
      gender: 'male',
    });
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  onAddHobby(event: MatChipInputEvent) {
    const control = new FormControl(event.value, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);

    event.chipInput!.clear();
  }

  onRemoveHobby(hobby: string) {
    const index = this.signUpForm.get('hobbies')?.value.indexOf(hobby);
    if (index && index > -1) {
      (<FormArray>this.signUpForm.get('hobbies')).removeAt(index);
    }
  }

  // custom validator function
  forbiddenNames(control: FormControl): { [k: string]: boolean } | null {
    // if (['Christine', 'Bob'].indexOf(control.value) !== -1) {
    //   return { nameIsForbidden: true };
    // }
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  // async custom validator
  forbiddenEmail(
    control: FormControl
  ): Promise<{ [k: string]: boolean } | null> {
    const promise = new Promise<{ [k: string]: boolean } | null>(
      (resolve, _reject) => {
        setTimeout(() => {
          if (control.value === 'test@email.com') {
            resolve({ isForbiddenEmail: true });
          } else {
            resolve(null);
          }
        }, 2000);
      }
    );
    return promise;
  }
}
