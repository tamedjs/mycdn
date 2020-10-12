const { Server } = require ('./Server');
const fetch = require ('node-fetch');
const kill = require ('kill-port');

describe ('allow server to be setup and ran', () => {
  test ('it can be configured with default values', () => {
    let result;

    result = Server.setup ();
    expect (result).toBeTruthy ();
    expect (result).toEqual ({
      port: 5000,
    });
  });

  test ('it can be configured with override values', () => {
    let result;

    result = Server.setup({ state: {
      port: 3000,
    }});
    expect(result).toBeTruthy();
    expect(result).toEqual({
      port: 3000,
    });
  });

  test ('it can be started up and stopped', async () => {
    let app, port, result, state;

    // Currently you can kill ports running on TCP or UDP protocols
    port = 59888;
    await kill (port, 'tcp');

    state = Server.setup ({
      state: {
        port,
      }
    });

    app = await Server.start ({ state });

    result = await fetch (`http://localhost:${port}`)
      .then ((res) => res.text ());
    Server.stop ({ app });

    expect (result).toContain ('</html>');
  });
})
