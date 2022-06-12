import { EOL, arch, cpus, homedir, userInfo } from 'os';

export const commandsOS = {
  '--EOL': () => console.log(JSON.stringify(EOL)),
  '--cpus': () => {
    const arr = cpus();
    console.log('overall amount of CPUS ' + arr.length);
    arr.forEach((cpu) => console.log('model: ' + cpu.model + ' clock rate: ' + (cpu.speed / 1000).toFixed(2)));
  },
  '--homedir': () => console.log('Home dir is ' + homedir()),
  '--username': () => console.log('Username is ' + userInfo().username),
  '--architecture': () => console.log(arch()),
};
