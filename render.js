const {createBundleRenderer} = require('vue-server-renderer');
const Vue = require('vue');

const template = require('fs').readFileSync('./template.html', 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const app = new Vue({
    data: {
        url: 'lol',
    },
    template: `<div>The visited URL is: {{ url }}</div>`,
});

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
});

renderer.renderToString(app, (err, html) => {
    if (err) throw err;
    console.log(html);
});
