import { commandsFS } from './commands/loadCommandsFS.js';

export const executeCommand = async (strCommand, arr) => {
  const command = commandsFS[strCommand];

  const argsCount = command.argsCount ?? 0;
  try {
    switch (argsCount) {
      case 0:
        await command.exec();
        break;
      case 1:
        await command.exec(arr[0]);
        break;
      case 2:
        await command.exec(arr[0], arr[1]);
        break;
      default:
    }
  } catch (err) {
    console.log('Operation failed' + err);
  }
};
