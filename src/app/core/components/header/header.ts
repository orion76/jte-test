import { Component, ElementRef, inject, viewChild, ViewEncapsulation } from '@angular/core';
import { Icon, Menu } from '@shared/components';
import { IMenuItemData } from '@shared/components/menu/types';
import { PAGES_MENU } from '../../../app-menu.config';
import { OverlayManager } from '../../../features/dynamic-overlay/overlay-manager';
import { IOverlayOpenOptions } from '../../../features/dynamic-overlay/types';
import { ViewportObserver } from '../../services/viewport-observer/viewport-observer';
import { SearchForm } from '../search-form/search-form';

import { OverlayOutlet } from '../../../features/dynamic-overlay/overlay-outlet/overlay-outlet';
import { UserPanel } from '../user-panel/user-panel';

@Component({
  selector: 'app-header',
  imports: [Icon, Menu, UserPanel, OverlayOutlet],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Header {
  protected readonly menuTrigger = viewChild<ElementRef<HTMLElement>>('menuTrigger');
  protected viewportObserver = inject(ViewportObserver);
  protected overlayManager = inject(OverlayManager);
  protected readonly pagesMenu: IMenuItemData[] = inject(PAGES_MENU);

  protected onSearchOpen(): void {
    const viewport = this.viewportObserver.viewport();

    switch (viewport) {
      case 'desktop':
        this.overlayManager.open('search-form--desktop', {
          component: SearchForm,
        });
        break;
      case 'mobile':
        this.overlayManager.open('mobile', {
          component: SearchForm,
        });
        break;
    }
  }

  protected openMobileMenu(): void {
    const options: IOverlayOpenOptions = {
      component: Menu,
      title: 'Menu',
      inputs: { items: this.pagesMenu, direction: 'vertical' },
    };
    this.overlayManager.open('mobile', options);
  }
}
