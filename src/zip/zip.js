import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { getFileAbsolutePath } from '../util/getFileAbsolutePath.js';
import { msgCurrentDir } from '../util/msgApp.js';

const compress = async (source, target) => {
  const sourceFullName = getFileAbsolutePath(source);
  const targetFullName = getFileAbsolutePath(target);

  const handleError = (err) => {
    console.log('Operation failed\n' + msgCurrentDir());
  };

  const readStream = createReadStream(sourceFullName);
  const zipStream = createBrotliCompress();
  const writeStream = createWriteStream(targetFullName);
  readStream
    .on('error', handleError)
    .pipe(zipStream)
    .on('error', handleError)
    .pipe(writeStream)
    .on('error', handleError)
    .on('finish', () => {
      console.log(`Compress file ${sourceFullName} is done`);
    });
};

const decompress = async (source, target) => {
  const sourceFullName = getFileAbsolutePath(source);
  const targetFullName = getFileAbsolutePath(target);

  const handleError = (err) => {
    console.log('Operation failed\n' + msgCurrentDir());
  };

  const unzipStream = createBrotliDecompress();
  const readStream = createReadStream(sourceFullName);
  const writeStream = createWriteStream(targetFullName);
  const main = readStream
    .on('error', handleError)
    .pipe(unzipStream)
    .on('error', handleError)
    .pipe(writeStream)
    .on('error', handleError)
    .on('finish', () => {
      console.log(`Decompress file ${sourceFullName} is done.\n${msgCurrentDir()}`);
    });
};

export const zip = { compress, decompress };
