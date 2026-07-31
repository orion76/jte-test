const ICON_NAMES = ['search', 'cancel', 'add-circle', 'link', 'contacts', 'tag', 'favorites', 'history'];
const iconCache: Record<string, string> = {};

async function loadIcons(): Promise<void> {
  await Promise.all(ICON_NAMES.map(async (name) => {
    const resp = await fetch(`/assets/icons/${name}.svg`);
    iconCache[name] = await resp.text();
  }));
}

function icon(name: string): string {
  return iconCache[name] || '';
}

const MENU_ITEMS = [
  { id: 'links', label: 'Ссылки', icon: 'link' },
  { id: 'contacts', label: 'Контакты', icon: 'contacts' },
  { id: 'tags', label: 'Теги', icon: 'tag' },
  { id: 'favorites', label: 'Избранное', icon: 'favorites' },
  { id: 'history', label: 'Посещения', icon: 'history' },
];

class SearchFormDemo {
  private nav: HTMLElement;
  private menu: HTMLElement;
  private searchBtn: HTMLElement;
  private searchContainer: HTMLElement;
  private searchForm: HTMLElement;
  private searchInput: HTMLInputElement;
  private clearBtn: HTMLElement;
  private isOpen = false;
  private query = '';

  constructor() {
    this.nav = document.querySelector('.header__center')!;
    this.menu = document.querySelector('.app-menu')!;
    this.searchBtn = document.querySelector('.button-search')!;
    this.searchContainer = document.querySelector('.search-form-container')!;
    this.searchForm = document.querySelector('.search-form')!;
    this.searchInput = document.querySelector('.search-form__input') as HTMLInputElement;
    this.clearBtn = document.querySelector('.search-form__clear')!;

    this.searchContainer.style.width = '0';
    this.bindEvents();
  }

  private bindEvents(): void {
    this.searchBtn.addEventListener('click', () => this.toggle());
    this.searchInput.addEventListener('input', (e) => {
      this.query = (e.target as HTMLInputElement).value;
      this.updateClearBtn();
    });
    this.searchInput.addEventListener('focus', () => {
      this.clearBtn.style.display = this.query ? 'flex' : 'flex';
    });
    this.searchInput.addEventListener('blur', () => {
      setTimeout(() => {
        this.clearBtn.style.display = this.query ? 'flex' : 'none';
      }, 200);
    });
    this.clearBtn.addEventListener('click', () => {
      this.query = '';
      this.searchInput.value = '';
      this.searchInput.focus();
      this.updateClearBtn();
    });
  }

  private toggle(): void {
    this.isOpen = !this.isOpen;

    const menuWidth = this.menu.offsetWidth;
    const navWidth = this.nav.offsetWidth;

    if (this.isOpen) {
      this.searchContainer.style.width = menuWidth + 'px';
      this.searchContainer.style.left = '0';
      this.searchForm.style.transition = 'transform 0.3s ease-in-out';
      this.searchForm.style.transform = 'translateX(0)';
    } else {
      this.searchForm.style.transition = 'transform 0.3s ease-in-out';
      this.searchForm.style.transform = 'translateX(' + navWidth + 'px)';
    }

    this.nav.classList.toggle('search-form-opened', this.isOpen);
    this.searchBtn.style.display = this.isOpen ? 'none' : 'flex';

    if (this.isOpen) {
      setTimeout(() => this.searchInput.focus(), 350);
    }
  }

  private updateClearBtn(): void {
    this.clearBtn.style.display = this.query ? 'flex' : 'none';
  }
}

function renderMenu(): void {
  const container = document.querySelector('.app-menu .menu')!;
  container.innerHTML = MENU_ITEMS
    .map(
      (item) =>
        `<button class="menu-item__button menu-item__button--${item.id}">
          <span class="menu-item__icon">${icon(item.icon)}</span>
          <span class="menu-item__label">${item.label}</span>
        </button>`
    )
    .join('');
}

function renderIcons(): void {
  document.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon')!;
    el.innerHTML = icon(name);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadIcons();
  renderMenu();
  renderIcons();
  new SearchFormDemo();
});
