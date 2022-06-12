import { createReadStream } from 'fs';
import { stdout } from 'process';
import { getFileAbsolutePath } from '../util/getFileAbsolutePath.js';
const { createHash } = await import('crypto');
import { msgCurrentDir } from '../util/msgApp.js';

export const hash = async (file) => {
  const sourceFullName = getFileAbsolutePath(file);
  const hash = createHash('sha256');
  hash.setEncoding('hex');

  try {
    const readStream = createReadStream(sourceFullName, { encoding: 'utf8' });
    await new Promise((resolve) => {
      readStream
        .on('error', () => console.log(`Operation faild\n${msgCurrentDir()}`))
        .pipe(hash)
        .on('end', () => {
          console.log('\n' + msgCurrentDir());
          resolve();
        })
        .pipe(stdout);
    });
  } catch (error) {
    console.log(`Operation faild\n${msgCurrentDir()}`);
  }
};
