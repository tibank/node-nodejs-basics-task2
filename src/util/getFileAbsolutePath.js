import path from 'path';

export const getFileAbsolutePath = (str) => {
  return path.isAbsolute(str) ? str : path.resolve(path.join(global.currentDir, str));
};
