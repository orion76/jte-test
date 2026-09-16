import { SafeHtml } from '@angular/platform-browser';

export type UImageType = 'imageUrl' | 'svg';

export interface ISvgData {
  safeHtml: SafeHtml;
  viewBox: string | null;
}
