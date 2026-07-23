import { Component, signal, inject } from '@angular/core';

import { Icon, Menu } from '../../../shared/components';
import { ViewportObserver } from '../../services/viewport-observer';
import { IMenuItemData } from '../../../shared/components/menu/types';
import { UserPanel } from '../user-panel/user-panel';
import { OverlayManager } from '../../../features/dynamic-overlay/overlay-manager';
import { PAGES_MENU } from '../../../app-menu.config';
import { IOverlayShowOptions } from '../../../features/dynamic-overlay/types';
import { SearchPanel } from '../search-panel/search-panel';

@Component({
  selector: 'app-header',
  imports: [Menu, Icon, SearchPanel, UserPanel],
  templateUrl: './header.html',
})
export class Header {
  protected readonly isSearchExpanded = signal(false);
  protected readonly isMobileSearch = signal(false);

  protected readonly searchQuery = signal('');

  protected viewportObserver = inject(ViewportObserver);
  protected overlayManager = inject(OverlayManager);
  protected readonly pagesMenu: IMenuItemData[] = inject(PAGES_MENU);

  protected onSearchClick(): void {
    if (this.viewportObserver.isMobile()) {
      this.isMobileSearch.set(true);
    } else {
      this.isSearchExpanded.set(true);
    }
  }

  protected onSearchSubmit(): void {
    const query = this.searchQuery();
    if (query.trim()) {
      console.log('Search submitted:', query);
    }
  }

  protected onMobileSearchSubmit(): void {
    this.onSearchSubmit();
    this.closeMobileSearch();
  }

  protected closeMobileSearch(): void {
    this.isMobileSearch.set(false);
    this.searchQuery.set('');
  }

  protected closeDesktopSearch(): void {
    this.isSearchExpanded.set(false);
    this.searchQuery.set('');
  }

  protected openMobileMenu(): void {
    const options: IOverlayShowOptions = {
      component: Menu,
      title: 'Menu',
    };

    this.overlayManager.open(options, { items: this.pagesMenu, direction: 'vertical' });
  }

}
