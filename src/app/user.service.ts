import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usernames = [
    'novacatsupweb',
    'hardrollsseal',
    'rearwindowham',
    'wildernessred',
    'wall·ehydra',
    'wafflesrelish',
    'grapefruitbee',
    'redenchanting',
    'ammilpelican',
  ];

  constructor() {}

  generateUsername(): string {
    const index = Math.floor(Math.random() * this.usernames.length);
    return this.usernames[index];
  }
}
