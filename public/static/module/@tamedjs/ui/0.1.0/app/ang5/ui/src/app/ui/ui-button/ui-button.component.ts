import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.less']
})
export class UiButtonComponent implements OnInit {
  @Input () data = {
    className: {
      'uk-button': true,
      'uk-button-default': true
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
