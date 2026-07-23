import { Component } from '@angular/core';
import { Header } from './core/components/header/header';
import { ViewportsOverlay } from './features/dynamic-overlay/viewports-overlay/viewports-overlay';

@Component({
  selector: 'app-root',
  imports: [Header, ViewportsOverlay],
  templateUrl: './app.html',
})
export class App {}
