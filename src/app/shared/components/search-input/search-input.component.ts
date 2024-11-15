import {Component, input, model, output} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {NgOptimizedImage} from '@angular/common';
import {AutoCompleteModule} from 'primeng/autocomplete';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    FormsModule,
    Button,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    NgOptimizedImage,
    AutoCompleteModule
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  readonly value = model('');
  readonly autocomplete = input<string[]>([]);
  readonly hasSearchBtn = input(false);

  readonly searchBtnClick = output<string>();
}
