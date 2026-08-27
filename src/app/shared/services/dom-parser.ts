import { InjectionToken } from "@angular/core";

export const DOM_PARSER = new InjectionToken<DOMParser>('DOM_PARSER', {
  providedIn: 'root',
  factory: () => new DOMParser(), // Создастся один раз для всего приложения
});
