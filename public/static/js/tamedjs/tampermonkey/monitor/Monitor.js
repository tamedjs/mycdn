console.log ('- MyCDN: Monitoring AJAX traffic...');

export class Monitor {
  static after ({ callback, request, response }) {
    if (request.url.indexOf ('http://localhost') !== 0) {
      request.url = Monitor.getLocation ({ request });

      fetch (`http://localhost:3100/api/request/cache/load`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify (request),
      })
      .then (res => res.json ())
      .then (async (data) => {
        if (data && !data.content) {
          await Monitor.save ({
            callback,
            request,
            response,
          });
        }
        callback ();
      })
      .catch ((err) => {
        console.error (err);
        callback ();
      });
    }
    else {
      callback (response);
    }
  }

  static before ({ request, callback }) {
    let response, url;

    if (request.url.indexOf ('http://localhost') !== 0) {
      request.url = Monitor.getLocation ({ request });

      fetch (`http://localhost:3100/api/request/cache/load`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify (request),
      })
      .then (res => res.json ())
      .then ((data) => {
        if (data && data.content) {
          console.log ('- Loaded Response:', data)
          // callback (data.content);
          callback ();
        }
        else {
          callback ();
        }
      });
    }
    else {
      callback ();
    }
  }

  static getLocation ({ request }) {
    let location;
    location = request.url;
    if (location [0] === '/') {
      location = window.location.protocol + '//' + window.location.host + location;
    }
    return location;
  }

  static async save ({ request, response }) {
    await fetch (`http://localhost:3100/api/request/cache/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify ({
        request,
        response
      }),
    })
    .then (res => res.json ())
    // .then ((data) => {
    //   callback ();
    // });
  }
}

// window.xhook.after (function (request, response, callback) { return Monitor.after ({ callback, request, response }); });
// window.xhook.before (function (request, callback) { Monitor.before ({ callback, request }); });



// body: JSON.stringify ({
//   url: 'https://keychainsandbox.crexendo.com/keychain?destination=KeychainLogin_Authenticate',
//   method: 'POST',
//   content: `Effect.Shake($('dialog'), {distance: 15, duration:0.4}); $('password').clear();var errors = $$('.messages')[0]; if(!errors) { errors = new Element('div', {'class' : 'messages'}) } else { errors.update('') };errors.update('<ul><li>Unrecognized email address. Use an email address that is connected to your account.</li></ul>');$('dialog').insert({top : errors});`
// })

// window.xhook.before ((req) => {
//   let location;
//
//   if (req.url.indexOf ('http://localhost') !== 0) {
//     // fetch (`http://localhost:3100/api/request/cache/load`)
//     //   .then (res => res.json ())
//     //   .then (data => console.log ('- Loaded Response:', data));
//
//     console.log (req);
//     location = req.url;
//     if (location [0] === '/') {
//       location = window.location.protocol + '//' + window.location.host + location;
//     }
//
//     fetch (`http://localhost:3100/api/request/cache/load`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify (req),
//     })
//     .then (res => res.json ())
//     .then (data => console.log ('- Loaded Response:', data));
//   }
// });
//
// window.xhook.after(function(req, res) {
//   if (req.url.indexOf ('http://localhost') !== 0) {
//     fetch (`http://localhost:3100/api/request/cache/save`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify (req),
//       // body: JSON.stringify ({
//       //   url: 'https://keychainsandbox.crexendo.com/keychain?destination=KeychainLogin_Authenticate',
//       //   method: 'POST',
//       //   content: `Effect.Shake($('dialog'), {distance: 15, duration:0.4}); $('password').clear();var errors = $$('.messages')[0]; if(!errors) { errors = new Element('div', {'class' : 'messages'}) } else { errors.update('') };errors.update('<ul><li>Unrecognized email address. Use an email address that is connected to your account.</li></ul>');$('dialog').insert({top : errors});`
//       // })
//     })
//     .then (res => res.json ())
//     .then (data => console.log ('- Cached Response:', data));
//   }
// });


//   .then ((res) => {
//   console.log ('- Monitor Response:', res, );
//
//   // callback (res);
// })
//
//modify 'responseText' of 'example2.txt'
// res.text = res.text.replace ('Unrecognized', 'ronbravo');
// console.log ('res:', res.text);

// if(request.url.match(/example\.txt$/))
// response.text = response.text.replace(/[aeiou]/g,'z');
// response.text = response.text.replace(/[aeiou]/g,'z');
// window.xhook.after ((req, res) => {
//   res.data = res.data.replace ('Unrecognized', 'ronbravo');
//   console.log ('REQ:', res.data);
//   // return res;
//   // fetch (`http://localhost:3100/api/echo/get`);
// });
