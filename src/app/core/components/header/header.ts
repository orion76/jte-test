import { Component, ElementRef, inject, output, signal, viewChild } from '@angular/core';
import { PAGES_MENU } from '../../../app-menu.config';
import { OverlayManager } from '../../../features/dynamic-overlay/overlay-manager';
import { IOverlayShowOptions } from '../../../features/dynamic-overlay/types';
import { Icon, Menu } from '../../../shared/components';
import { IMenuItemData } from '../../../shared/components/menu/types';
import { ViewportObserver } from '../../services/viewport-observer';
import { SearchForm } from '../search-form/search-form';

import { UserPanel } from '../user-panel/user-panel';

@Component({
  selector: 'app-header',
  imports: [Icon, Menu, UserPanel],
  templateUrl: './header.html',
})
export class Header {
  protected readonly menuTrigger = viewChild<ElementRef<HTMLElement>>('menuTrigger');
  protected viewportObserver = inject(ViewportObserver);
  protected overlayManager = inject(OverlayManager);
  protected readonly pagesMenu: IMenuItemData[] = inject(PAGES_MENU);

  protected readonly isSearchOpened = signal(false);

  protected onSearchBackdropClick(): void {
    this.overlayManager.notifyClickOutside('desktopSearch');
  }

  protected onSearchToggle(): void {
    this.isSearchOpened.update((v) => !v);
    if (this.isSearchOpened()) {
      const options: IOverlayShowOptions = {
        component: SearchForm,
        title: 'Search',
      };
      this.overlayManager.open('desktopSearch', options);
    } else {
      this.overlayManager.close('desktopSearch');
    }
  }

  protected openMobileMenu(): void {
    const options: IOverlayShowOptions = {
      component: Menu,
      title: 'Menu',
      origin: this.menuTrigger()?.nativeElement,
    };
    this.overlayManager.open(options, { items: this.pagesMenu, direction: 'vertical' });
  }
}
