const {createBundleRenderer} = require('vue-server-renderer');
const server = require('express')();

const template = require('fs').readFileSync('./template.html', 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
});

renderer.renderToString(server, (err, html) => {
    if (err) throw err;
    console.log(html);
});
