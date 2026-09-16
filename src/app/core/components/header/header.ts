import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PAGES_MENU } from '@app/app-menu.config';
import { IViewportObserver } from '@core/services/viewport-observer/types';
import { ViewportObserver } from '@core/services/viewport-observer/viewport-observer';
import { OverlayManager } from '@features/dynamic-overlay/overlay-manager';
import { OverlayOutlet } from '@features/dynamic-overlay/overlay-outlet/overlay-outlet';
import { IOverlayManager, IOverlayOpenOptions } from '@features/dynamic-overlay/types';
import { Menu } from '@shared/components';
import { Button } from '@shared/components/button/button';
import { IButton } from '@shared/components/button/types';
import { IMenuItemData } from '@shared/components/menu/types';
import { SearchForm } from '../search-form/search-form';
import { UserPanel } from '../user-panel/user-panel';

@Component({
  selector: 'app-header',
  imports: [Menu, UserPanel, OverlayOutlet, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected viewportObserver: IViewportObserver = inject(ViewportObserver);
  protected overlayManager: IOverlayManager = inject(OverlayManager);

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
        this.overlayManager.open('search-form-desktop', {
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
