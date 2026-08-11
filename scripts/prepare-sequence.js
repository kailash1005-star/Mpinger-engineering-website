const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../mpinger_engineering/engineering');
const destDir = path.join(__dirname, '../public/sequence');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log(`Source directory: ${srcDir}`);
console.log(`Destination directory: ${destDir}`);

const TOTAL_TARGET_FRAMES = 300;
const TOTAL_SRC_FRAMES = 300;

for (let i = 0; i < TOTAL_TARGET_FRAMES; i++) {
  /// Map index [0, 299] to source index [1, 300]
  const srcIndex = i + 1;
  const srcFileName = `ezgif-frame-${String(srcIndex).padStart(3, '0')}.jpg`;
  const destFileName = `frame_${i}.webp`;

  const srcPath = path.join(srcDir, srcFileName);
  const destPath = path.join(destDir, destFileName);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
}

console.log(`Successfully prepared ${TOTAL_TARGET_FRAMES} frames in ${destDir}`);
