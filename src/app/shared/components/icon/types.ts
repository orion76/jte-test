import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export type UImageType = 'imageUrl' | 'svg';

export interface ISvgData {
  safeHtml: SafeHtml;
  viewBox: string | null;
}

export interface IIconRegistry {
  get(name: string): Observable<ISvgData | undefined>;
}
