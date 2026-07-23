import { Component, inject, model, output } from '@angular/core';
import { OverlayManager } from '../../../features/dynamic-overlay/overlay-manager';
import { IOverlayShowOptions } from '../../../features/dynamic-overlay/types';
import { Icon } from '../../../shared/components';
import { SearchForm } from '../search-form/search-form';

@Component({
  selector: 'app-search-panel',
  imports: [Icon],
  templateUrl: './search-panel.html',
  styleUrl:'./search-panel.scss'
})
export class SearchPanel {
  readonly isVisible = output();
    protected overlayManager = inject(OverlayManager);
  isSearchOpen = false;
  readonly query = model('');
  readonly submit = output<void>();
  readonly close = output<void>();
  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }
  onSubmit() {}


  protected openSearchForm(): void {
    const options: IOverlayShowOptions = {
      component: SearchForm,
      title: 'Seaarch',
    };
    this.overlayManager.open(options);
  }
}
