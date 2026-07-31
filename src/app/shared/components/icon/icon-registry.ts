import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, map, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IconRegistry {
  private cache = new Map<string, string>();
  private pending = new Map<string, Observable<string>>();

  private http = inject(HttpClient);

  get(name: string): Observable<string> {
    const cached = this.cache.get(name);
    if (cached) return of(cached);

    const pending = this.pending.get(name);
    if (pending) return pending;

    const req = this.http
      .get(`assets/icons/${name}.svg`, { responseType: 'text' })
      .pipe(
        map((raw) => {
          this.cache.set(name, raw);
          this.pending.delete(name);
          return raw;
        }),
        catchError(() => {
          this.pending.delete(name);
          return of('');
        }),
        shareReplay(1),
      );

    this.pending.set(name, req);
    return req;
  }
}
