# scandir

Simple scandir for my own purposes, as I've used versions of this throughout
multiple projects.

## Usage

```js
const scandir = require('@finwo/scandir');

// No way to await in async yet
scandir("path/to/directory", filename => {
  console.log(`Got a filename: ${filename}`);
}, ['json', 'js']);

// You can also load files directly (caution, may be dangerous)
// This loads the file through 'require'
scandir("path/to/directory", contents => {
  console.log(`Got file contents: ${contents}`);
}, ['json','js'], true);

// There's also a sync version, if that's what you need
// This accepts the same arguments
scandir.sync("path/to/directory", filename => {
  console.log(`Got a filename: ${filename}`);
}, ['json', 'js'], false);
```

### Methods

#### scandir( dir, handler, extensions = ['json','js'], load = false)

#### scandir.sync( dir, handler, extensions = ['json','js'], load = false)
