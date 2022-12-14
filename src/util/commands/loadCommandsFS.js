import { myFS } from './../../fs/myFs.js';
import { zip } from './../../zip/zip.js';
import { hash } from './../../hash/hash.js';
import { byeBye } from '../msgApp.js';

export const commandsFS = {
  '.exit': {
    argsCount: 0,
    exec: byeBye,
  },
  up: {
    argsCount: 0,
    exec: myFS.up,
  },
  cd: {
    argsCount: 1,
    exec: myFS.cd,
  },
  ls: {
    argsCount: 0,
    exec: myFS.list,
  },
  cat: {
    argsCount: 1,
    exec: myFS.cat,
  },
  add: {
    argsCount: 1,
    exec: myFS.add,
  },
  rn: {
    argsCount: 2,
    exec: myFS.rn,
  },
  cp: {
    argsCount: 2,
    exec: myFS.cp,
  },
  mv: {
    argsCount: 2,
    exec: myFS.mv,
  },
  rm: {
    argsCount: 1,
    exec: myFS.rm,
  },
  hash: {
    argsCount: 1,
    exec: hash,
  },
  compress: {
    argsCount: 2,
    exec: zip.compress,
  },
  decompress: {
    argsCount: 2,
    exec: zip.decompress,
  },
};
