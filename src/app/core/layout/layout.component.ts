import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [RouterOutlet],
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
