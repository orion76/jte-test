import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../core/components/header/header';


@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './main.html',
})
export class MainLayout {}
