const selfsigned = require ('selfsigned');
const fs = require ('fs-extra');

function sign () {
  return new Promise ((resolve) => {
    const attrs = [{ name: 'commonName', value: 'contoso.com' }];
    const bob = selfsigned.generate(attrs, { days: 365 }, function (err, pems) {
      // console.log(pems);
      resolve(pems);
    });
  });
}

(async () => {
  const bob = await sign ();
  await fs.ensureDir ('bob');
  await fs.writeFile ('bob/bob.key', bob.public, 'utf8');
  await fs.writeFile ('bob/bob.cert', bob.cert, 'utf8');
})();


// const selfsigned = require('selfsigned');
// const fs
// const pems = selfsigned.generate(attrs, { days: 365 });
// console.log (pems);
