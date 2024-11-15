import {Component} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';

@Component({
  standalone: true,
  imports: [IconFieldModule],
  template: `<i class="loader pi pi-spin pi-spinner"></i>`,
  styles: `
    :host {
      display: flex;
      place-content: center;
      padding: 15px;

      --loader-icon-size: 7em;
    }

    .loader {
      font-size: var(--loader-icon-size);
    }
  `
})
export class LoaderComponent {
}
