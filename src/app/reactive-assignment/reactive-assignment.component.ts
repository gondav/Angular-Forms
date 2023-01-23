import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-assignment',
  templateUrl: './reactive-assignment.component.html',
  styleUrls: ['./reactive-assignment.component.css'],
})
export class ReactiveAssignmentComponent implements OnInit {
  projectStatuses: string[] = ['Stable', 'Critical', 'Finished'];
  projectForm!: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required],
        this.checkProjectName
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null),
    });
  }

  onSubmit(): void {
    console.log(this.projectForm);
  }

  // checkProjectName(control: FormControl): { [k: string]: boolean } | null {
  //   if (control.value === 'Test') {
  //     return { isProjectNameForbidden: true };
  //   }
  //   return null;
  // }

  checkProjectName(
    control: FormControl
  ): Promise<{ [k: string]: boolean } | null> {
    const promise = new Promise<{ [k: string]: boolean } | null>(
      (resolve, _reject) => {
        setTimeout(() => {
          if (control.value === 'Test') {
            resolve({ isProjectNameForbidden: true });
          }
          resolve(null);
        }, 2000);
      }
    );
    return promise;
  }
}
