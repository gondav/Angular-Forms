import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
})
export class TemplateDrivenFormComponent implements OnInit {
  @ViewChild('f') signUpForm!: NgForm;
  username: string = 'Username';
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  getUsername() {
    this.username = this.userService.generateUsername();
    this.signUpForm.form.patchValue({ userData: { username: this.username } });
  }

  onSubmit() {
    console.log(this.signUpForm.form);
  }
}
