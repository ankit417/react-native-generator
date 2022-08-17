const shell = require("shelljs");
const repo = "https://github.com/ankit417/react-native-boilerplate";

exports.cloneRN = () => {
  return shell.exec(`git clone ${repo}`);
};
