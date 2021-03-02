const fs   = require('fs');
const path = require('path');

// Async scandir
const scandir = module.exports = (dir, handler, extensions = ['json','js'], load = false) => {
  fs.readdir(dir, async (error,entry) => {
    if (error) throw error;
    const fullpath = path.resolve(dir,entry);
    const stat     = await new Promise((r,f) => fs.stat(fullpath, (e,d)=>e?f(e):r(d)));

    // Iterate down directories
    if (stat.isDirectory()) {
      return scandir(fullpath, handler, extensions);
    }

    // Ensure it's the right file
    if (!stat.isFile()) return;
    const ext = entry.split('.').pop();
    if (!~extensions.indexOf(ext)) return;

    // Hand over to the handler
    await handler(load ? require(fullpath) : fullpath);
  });
}

// Sync scandir
scandir.sync = (dir, handler, extensions = ['json','js'], load = false) => {
  fs.readdirSync(dir).forEach(entry => {
    const fullpath = path.resolve(dir,entry);
    const stat     = fs.statSync(fullpath)

    // Iterate down directories
    if (stat.isDirectory()) {
      return scandir.sync(fullpath, handler, extensions);
    }

    // Ensure it's the right file
    if (!stat.isFile()) return;
    const ext = entry.split('.').pop();
    if (!~extensions.indexOf(ext)) return;

    // Hand over to the handler
    handler(load ? require(fullpath) : fullpath);
  });
}
