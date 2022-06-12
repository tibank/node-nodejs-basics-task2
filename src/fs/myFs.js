import path from 'path';
import { readdir, access, stat, rename, rm as remove } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { getFileAbsolutePath } from '../util/getFileAbsolutePath.js';
import { msgCurrentDir } from '../util/msgApp.js';
import { stdout } from 'process';

const fileExists = async (file) => {
  try {
    await access(file);
    return true;
  } catch (err) {
    return false;
  }
};

const up = async () => {
  global.currentDir = path.join(global.currentDir, '..');
  console.log(msgCurrentDir());
};

const cd = async (dir) => {
  const newCurrentDir = path.isAbsolute(dir) ? dir : path.resolve(path.join(global.currentDir, dir));
  if (await fileExists(newCurrentDir)) {
    global.currentDir = newCurrentDir;
  } else {
    console.log('Operation failed');
  }
  console.log(msgCurrentDir());
};

const list = async () => {
  try {
    (await readdir(global.currentDir)).forEach((file) => console.log(file));
  } catch (err) {
    console.log('Invalid input');
  }
  console.log(msgCurrentDir());
};

const cat = async (source) => {
  const sourceFullName = getFileAbsolutePath(source);

  try {
    const readStream = createReadStream(sourceFullName, { encoding: 'utf8' });
    await new Promise((resolve) => {
      readStream
        .on('error', () => {
          console.log(`Operation faild\n${msgCurrentDir()}`);
        })
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

const add = async (source) => {
  const targetFullName = getFileAbsolutePath(source);

  if (~source.indexOf(path.sep)) {
    console.log('Invalid input');
  } else if (await fileExists(targetFullName)) {
    console.log('Operation failed');
  } else {
    try {
      const writeStream = createWriteStream(targetFullName, { encoding: 'utf8', flags: 'wx' });
      writeStream.write('');
    } catch (err) {
      console.log(`Operation failed t ${err}`);
    }
  }
  console.log(msgCurrentDir());
};

const cp = async (source, target) => {
  const sourceFullName = getFileAbsolutePath(source);
  const targetFullName = getFileAbsolutePath(target);
  const targetDir = path.dirname(targetFullName);

  try {
    const sourceStat = await stat(sourceFullName);
    const targetStat = await stat(targetDir);

    if (sourceStat.isFile() && targetStat.isDirectory()) {
      const handleError = (err) => {
        console.log('Operation failed');
      };

      const readStream = createReadStream(sourceFullName, { encoding: 'utf8' });
      const writeStream = createWriteStream(targetFullName, { encoding: 'utf8', flags: 'wx' });
      readStream.on('error', handleError).pipe(writeStream).on('error', handleError);
    } else {
      console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  }
  console.log(msgCurrentDir());
};

const rn = async (source, target) => {
  const sourceFullName = getFileAbsolutePath(source);
  const targetFullName = getFileAbsolutePath(target);
  try {
    const sourceStat = await stat(sourceFullName);
    if (sourceStat.isFile()) {
      await rename(sourceFullName, targetFullName);
    } else {
      console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed ');
  }
  console.log(msgCurrentDir());
};

const rm = async (source) => {
  const sourceFullName = getFileAbsolutePath(source);
  try {
    await remove(sourceFullName);
  } catch (err) {
    console.log('Operation failed');
  }
  console.log(msgCurrentDir());
};

const mv = async (source, target) => {
  const sourceFullName = getFileAbsolutePath(source);
  try {
    await cp(source, target);
    await remove(sourceFullName);
  } catch (err) {
    console.log('Operation failed');
  }
};

export const myFS = { up, cd, list, cat, add, rn, cp, mv, rm };
