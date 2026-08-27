import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './core/components/header/header';
import { OverlayOutlet } from './features/dynamic-overlay/overlay-outlet/overlay-outlet';

@Component({
  selector: 'app-root',
  imports: [Header, OverlayOutlet],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
