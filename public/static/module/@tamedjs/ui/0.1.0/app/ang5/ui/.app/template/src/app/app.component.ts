import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-{name}',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  host: { id: 'app-{name}', class: 'micro-app' },
})
export class AppComponent implements AfterViewInit {
  title = '{title}';

  ngAfterViewInit() {
    // Add this for when running the app by itself.
    if (!(window as any).__POWERED_BY_QIANKUN__) {
      document.body.classList.add ('ready');
    }
  }
}
