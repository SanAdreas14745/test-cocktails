import {Component, inject, input, output} from '@angular/core';
import {Button} from "primeng/button";
import {Router} from '@angular/router';

@Component({
  selector: 'app-cocktail-page-header',
  standalone: true,
  imports: [Button],
  templateUrl: './cocktail-page-header.component.html',
  styleUrl: './cocktail-page-header.component.scss'
})
export class CocktailPageHeaderComponent {
  readonly title = input('');
  readonly previousBtnClick = output();
  readonly nextBtnClick = output();
  private readonly router = inject(Router);

  onBackBtnClick(): void {
    this.router.navigate(['/'])
  }

  onPreviousBtnClick(): void {
    this.previousBtnClick.emit();
  }

  onNextBtnClick(): void {
    this.nextBtnClick.emit();
  }
}
