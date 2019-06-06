import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'pdx-home',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage {

  constructor(private router: Router) {}

  public async multiPlayer() {
    await this.router.navigateByUrl('/game');
  }
}
