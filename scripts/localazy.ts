import "dotenv/config"
import { execSync } from "child_process";
import path from "path";

/**
 * Creates a path to an executable in the node_modules/.bin directory. Each
 * path segment is joined with the appropriate platform-specific separator as
 * a delimiter.
 * @param {String} cmd The name of the executable.
 * @returns {String} The path to the executable.
 */
function getBinFile(cmd) {
  return path.join('node_modules', '.bin', cmd);
}

function runLocalazy() {
  const groups = ['group-e', 'group-1', 'group-2', 'group-3', "group-4", "group-5"];

  groups.forEach(group => {
    if (process.argv[process.argv.length - 1] === '--upload') {
      execSync(`${getBinFile('localazy')} upload ${group} -w ${process.env.WRITE_KEY} -r ${process.env.READ_KEY}`, {stdio: 'inherit'});
    } else if (process.argv[process.argv.length - 1] === '--download') {
      execSync(`${getBinFile('localazy')} download -w ${process.env.WRITE_KEY} -r ${process.env.READ_KEY}`, {stdio: 'inherit'});
    }
  });
}

runLocalazy();

