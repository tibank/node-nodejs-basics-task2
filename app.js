import { stdin } from 'process';
import { homedir } from 'os';
import { commandsFS } from './src/util/commands/loadCommandsFS.js';
import { commandsOS } from './src/util/commands/loadCommandsOS.js';
import { hi, byeBye, msgCurrentDir } from './src/util/msgApp.js';
import { getUserName } from './src/util/getUserName.js';
import { executeCommand } from './src/util/executeCommand.js';

global.currentDir = homedir();
global.userName = getUserName();

stdin.resume();
hi();
msgCurrentDir();

stdin.on('data', async (chunk) => {
  const [strCommand, ...arr] = chunk.toString().trim().split(' ').filter(Boolean);

  if (commandsFS.hasOwnProperty(strCommand)) {
    await executeCommand(strCommand, arr);
  } else if (strCommand === 'os' && commandsOS.hasOwnProperty(arr[0])) {
    commandsOS[arr[0]]();
    console.log(msgCurrentDir());
  } else {
    console.log(`Invalid input\n${msgCurrentDir()}`);
  }
});

process.on('SIGINT', () => {
  byeBye();
});
