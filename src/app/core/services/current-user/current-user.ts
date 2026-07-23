import { computed, Injectable, signal } from '@angular/core';
import { USER_ANONYM } from './anonym';
import { IUser } from './types';

@Injectable({ providedIn: 'root' })
export class CurrentUser {
  private readonly _currentUser = signal<IUser>(USER_ANONYM);

  set(user: IUser) {
    this._currentUser.set(user);
  }

  public readonly id = computed(() => this._currentUser().id);
  public readonly name = computed(() => this._currentUser().name);
  public readonly roles = computed(() => this._currentUser().roles);
}
