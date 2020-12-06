import Vue from '~/module/vuejs/2.6.12/vue.js';
import interact from 'https://cdn.jsdelivr.net/npm/@interactjs/interactjs/index.js'

const template = `
<div id="mycdn-dev-panel" class="uk-card uk-card-default uk-card-body">
  <h3 class="uk-card-title">Dev Panel</h3>
  <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <div id="drag-1" class="draggable">
    <p> You can drag one element </p>
  </div>
  <div id="drag-2" class="draggable">
    <p> with each pointer </p>
  </div>
</div>
`;

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// Define a new component called button-counter
Vue.component('mycdn-dev-panel', {
  mounted: function () {
    let dom;

    console.log ('- MyCDN DevPanel is ready.');

    window.onbeforeunload = null;
    dom = document.querySelector ('#mycdn-init-loader-area > #__init-loader');
    dom.classList.add ('done');

    interact ('#body').draggable ({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      autoScroll: true,
      listeners: { move: dragMoveListener }
    });
  },
  data: function () {
    return {
      count: 0
    }
  },
  template,
});

export class Panel {}
