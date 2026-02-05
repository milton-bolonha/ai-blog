const fs = require('fs-extra');
const path = require('path');

async function flatten() {
  console.log('Starting deployment flattening...');

  const dirsToMove = [
    { src: 'landing-page/.next', dest: '.next' },
    { src: 'landing-page/public', dest: 'public' },
    { src: 'landing-page/next.config.js', dest: 'next.config.js' }
  ];

  for (const { src, dest } of dirsToMove) {
    if (await fs.pathExists(src)) {
      console.log(`Copying ${src} to ${dest}...`);
      await fs.remove(dest); // Clean destination
      await fs.copy(src, dest);
    } else {
      console.warn(`Warning: Source ${src} not found.`);
    }
  }

  console.log('Flattening complete. Root is now ready for deployment.');
}

flatten().catch(err => {
  console.error('Flattening failed:', err);
  process.exit(1);
});
