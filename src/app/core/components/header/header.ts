import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { Menu } from '@shared/components';
import { IMenuItemData } from '@shared/components/menu/types';
import { PAGES_MENU } from '../../../app-menu.config';
import { OverlayManager } from '../../../features/dynamic-overlay/overlay-manager';
import { IOverlayOpenOptions } from '../../../features/dynamic-overlay/types';
import { ViewportObserver } from '../../services/viewport-observer/viewport-observer';
import { SearchForm } from '../search-form/search-form';

import { Button } from '@shared/components/button/button';
import { IButton } from '@shared/components/button/types';
import { OverlayOutlet } from '../../../features/dynamic-overlay/overlay-outlet/overlay-outlet';
import { UserPanel } from '../user-panel/user-panel';

@Component({
  selector: 'header',
  imports: [Menu, UserPanel, OverlayOutlet, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'header',
  },
})
export class Header {
  protected viewportObserver = inject(ViewportObserver);
  protected overlayManager = inject(OverlayManager);

  protected readonly pagesMenu: IMenuItemData[] = inject(PAGES_MENU);

  protected buttons: Record<string, IButton> = {
    menu: { id: 'menu', icon: 'menu', ariaLabel: 'Меню', buttonType: 'icon-only' },
    search: { id: 'search', icon: 'search', ariaLabel: 'Поиск', buttonType: 'icon-only' },
    add: { id: 'add', icon: 'add-circle', ariaLabel: 'Добавить', buttonType: 'icon-only' },
  };

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
