import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DOM_PARSER } from '@shared/services/dom-parser';
import { Observable, catchError, map, of, shareReplay, take, timeout } from 'rxjs';
import { ISvgData } from './types';

@Injectable({ providedIn: 'root' })
export class IconRegistry {
  private requestTimeout = 10_000;
  private cache = new Map<string, Observable<ISvgData | undefined>>();

  private sanitizer = inject(DomSanitizer);
  private domParser = inject(DOM_PARSER);
  private http = inject(HttpClient);

  get(name: string): Observable<ISvgData | undefined> {
    const cached = this.cache.get(name);
    if (cached) return cached;

    const req = this.http.get(`assets/icons/${name}.svg`, { responseType: 'text' }).pipe(
      take(1),
      timeout(this.requestTimeout),
      map((raw) => this.extractSvgData(name, raw)),
      catchError(() => {
        return of(undefined);
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
    this.cache.set(name, req);
    return req;
  }
  private extractSvgData(iconName: string, rawSvg: string): ISvgData {
    const parsedDoc = this.domParser.parseFromString(rawSvg, 'image/svg+xml');
    const svgElement = parsedDoc.querySelector('svg');

    if (!svgElement) {
      throw new Error(`Invalid SVG file: ${iconName}`);
    }
    return {
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(svgElement.innerHTML),
      viewBox: svgElement.getAttribute('viewBox'),
    };
  }
}
