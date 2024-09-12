import {Component} from '@angular/core';

@Component({
  selector: 'my-button',
  template: `
    <div class="bg-red-500">My Button</div>
  `,
  standalone: true,
})
export class MyButton {}
