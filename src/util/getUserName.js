import { argv } from 'process';
export function getUserName() {
  let propValue = 'Stranger';

  if (argv.length > 2) {
    if (argv[2].startsWith('--username=')) {
      propValue = argv[2].slice(11);
    }
  }

  return propValue;
}
