import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, map, catchError } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconRegistry {
  private cache = new Map<string, SafeHtml>();
  private pending = new Map<string, Observable<SafeHtml>>();

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  get(name: string, size: number): Observable<SafeHtml> {
    const key = `${name}_${size}`;
    const cached = this.cache.get(key);
    if (cached) return of(cached);

    const pending = this.pending.get(key);
    if (pending) return pending;

    const req = this.http
      .get(`assets/icons/${name}.svg`, { responseType: 'text' })
      .pipe(
        map((raw) => {
          const sized = raw.replace(
            /<svg/,
            `<svg width="${size}" height="${size}"`
          );
          const safe = this.sanitizer.bypassSecurityTrustHtml(sized);
          this.cache.set(key, safe);
          this.pending.delete(key);
          return safe;
        }),
        catchError(() => {
          this.pending.delete(key);
          return of(this.sanitizer.bypassSecurityTrustHtml(''));
        }),
        shareReplay(1),
      );

    this.pending.set(key, req);
    return req;
  }
}
