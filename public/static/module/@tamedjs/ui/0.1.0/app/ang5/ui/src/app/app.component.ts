import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-trg-ui-ang5',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  host: { id: 'app-trg-ui-ang5', class: 'micro-app' },
})
export class AppComponent implements AfterViewInit {
  title = 'TamedJs: Ui Angular 5';

  ngAfterViewInit() {
    // Add this for when running the app by itself.
    if (!(window as any).__POWERED_BY_QIANKUN__) {
      document.body.classList.add ('ready');
    }
  }
}
