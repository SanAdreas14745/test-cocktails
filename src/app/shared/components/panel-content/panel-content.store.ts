import {Injectable, signal} from '@angular/core';
import {PanelViewMode} from './panel-view-mode.enum';

@Injectable()
export class PanelContentStore {
  readonly viewMode = signal(PanelViewMode.PANEL);

  setViewMode(value: PanelViewMode): void {
    this.viewMode.set(value)
  }
}
