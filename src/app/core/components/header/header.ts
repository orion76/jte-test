import { Component, effect, ElementRef, inject, output, signal, viewChild } from '@angular/core';
import { PAGES_MENU } from '../../../app-menu.config';
import { OverlayManager } from '../../../features/dynamic-overlay/overlay-manager';
import { IOvelayOutletMobileOptions } from '../../../features/dynamic-overlay/types';
import { Icon, Menu } from '../../../shared/components';
import { IMenuItemData } from '../../../shared/components/menu/types';
import { ViewportObserver } from '../../services/viewport-observer/viewport-observer';
import { SearchForm } from '../search-form/search-form';

import { UserPanel } from '../user-panel/user-panel';
import { OverlayOutlet } from '../../../features/dynamic-overlay/overlay-outlet/overlay-outlet';

@Component({
  selector: 'app-header',
  imports: [Icon, Menu, UserPanel, OverlayOutlet],
  templateUrl: './header.html',
})
export class Header {
  protected readonly menuTrigger = viewChild<ElementRef<HTMLElement>>('menuTrigger');
  protected viewportObserver = inject(ViewportObserver);
  protected overlayManager = inject(OverlayManager);
  protected readonly pagesMenu: IMenuItemData[] = inject(PAGES_MENU);

  protected readonly isSearchOpened = signal(false);

  constructor() {
    effect(() => {
      console.log('[search form] isSearchOpened:', this.isSearchOpened());
    });
  }

  protected onSearchOpen(): void {
    const viewport = this.viewportObserver.viewport();

    switch (viewport) {
      case 'desktop':
        this.overlayManager.open({
          component: SearchForm,
          outletId: 'search-form--desktop',
        });
        break;
      case 'mobile':
        this.overlayManager.open({
          outletId: 'mobile',
          component: SearchForm,
          title: 'Search',
        });
        break;
    }
  }

  protected openMobileMenu(): void {
    const options: IOvelayOutletMobileOptions = {
      outletId: 'mobile',
      component: Menu,
      title: 'Menu',
    };
    this.overlayManager.open(options, { items: this.pagesMenu, direction: 'vertical' });
  }
}
