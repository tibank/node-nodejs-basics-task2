const hi = () => {
  console.log(`Welcome to the File Manager, ${global.userName}!`);
};

const byeBye = () => {
  console.log(`Thank you for using File Manager, ${global.userName}!`);
  process.exit(0);
};

const msgCurrentDir = () => {
  return `You are currently in ${global.currentDir}`;
};

export { hi, byeBye, msgCurrentDir };
