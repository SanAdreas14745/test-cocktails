import {Component, inject, input} from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {NgTemplateOutlet} from '@angular/common';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Button} from 'primeng/button';
import {PanelContentStore} from './panel-content.store';
import {PanelViewMode} from './panel-view-mode.enum';

@Component({
  selector: 'app-panel-content',
  standalone: true,
  imports: [
    PanelModule,
    NgTemplateOutlet,
    OverlayPanelModule,
    Button
  ],
  templateUrl: './panel-content.component.html',
  styleUrl: './panel-content.component.scss'
})
export class PanelContentComponent {
  readonly panelTitle = input.required<string>();
  readonly panelViewMode = PanelViewMode;

  private readonly panelStore = inject(PanelContentStore);

  readonly viewMode = this.panelStore.viewMode;

  onPinIconClick(nextView: PanelViewMode): void {
    this.panelStore.setViewMode(nextView);
  }
}
