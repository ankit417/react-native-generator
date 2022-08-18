const shell = require("shelljs");
const fs = require("fs");

exports.debugBuild = () => {
  const CURR_DIR = process.cwd();
  const BUNDLE_PATH = `${CURR_DIR}/android/app/src/main/assets/index.android.bundle`;
  const BUNDLE_RES = `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`;
  if (!fs.existsSync(BUNDLE_PATH)) {
    fs.writeFileSync(BUNDLE_PATH, "", "utf8");
  }
  shell.exec("cd android && ./gradlew clean & cd ..");
  shell.exec(BUNDLE_RES);
  shell.exec(`cd android`);
  shell.exec(`./gradlew assembleDebug`);
};
