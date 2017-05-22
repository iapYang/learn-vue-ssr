const {createBundleRenderer} = require('vue-server-renderer');
const server = require('express')();

const template = require('fs').readFileSync(
    require('path').resolve(__dirname, './src/index.template.html'), 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
});

renderer.renderToString({
    title: 'Vue HN 2.0', // default title
    url: 'I',
}, (err, html) => {
    if (err) throw err;
    console.log(html);
});

// server.get('*', (req, res) => {
//     const handleError = err => {
//         if (err && err.code === 404) {
//             res.status(404).end('404 | Page Not Found');
//         } else {
//             // Render Error Page or Redirect
//             res.status(500).end('500 | Internal Server Error');
//             console.error(`error during render : ${req.url}`);
//             console.error(err.stack);
//         }
//     };

//     renderer.renderToString({
//         title: 'Vue HN 2.0', // default title
//         url: req.url,
//     }, (err, html) => {
//         if (err) {
//             return handleError(err);
//         }
//         console.log(html);
//         res.end(html);
//     });
// });

// const port = 8080;
// server.listen(port, () => {
//     console.log(`server started at localhost:${port}`);
// });
