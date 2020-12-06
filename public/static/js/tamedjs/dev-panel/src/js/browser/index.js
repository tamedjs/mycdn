import '~/module/less/3.12.2/less.min.js';
import '~/module/uikit/3.5.10/uikit.min.js';
import '~/module/uikit/3.5.10/uikit-icons.min.js';

(function () {
  let dom;
  
  // Load the qiankun framework.
  dom = document.createElement ('script');
  dom.src = '~/module/qiankun/2.3.2/qiankun.js';
  dom.addEventListener ('load', function () {
    import ('~/js/tamedjs/dev-panel/src/js/browser/app/App.js').then (({ App }) => {
      App.start ();
    });
  });
  document.body.appendChild (dom);
}) ();
