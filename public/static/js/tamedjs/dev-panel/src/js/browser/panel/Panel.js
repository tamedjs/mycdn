import Vue from '~/module/vuejs/2.6.12/vue.js';

const template = `
<div id="mycdn-dev-panel" class="uk-card uk-card-default uk-card-body">
  <h3 class="uk-card-title">Dev Panel</h3>
  <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>
`;

// Define a new component called button-counter
Vue.component('mycdn-dev-panel', {
  data: function () {
    return {
      count: 0
    }
  },
  template,
});

export class Panel {}
