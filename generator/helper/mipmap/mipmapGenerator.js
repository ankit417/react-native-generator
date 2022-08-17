const fs = require("fs");
const Jimp = require("jimp");

exports.generateIcon = (name) => {
  const CURR_DIR = process.cwd();

  const ASSET_PATH = `${CURR_DIR}/android/app/src/main/res`;

  if (!fs.existsSync(ASSET_PATH)) {
    console.log(
      "res folder doesn't exist or your are in wrong directory. Please ensure that you are in the root directory of the RN project"
    );
  } else {
    //mipmap-hdpi
    Jimp.read(name, (err, icon) => {
      if (err) throw err;
      icon.resize(72, 72).write(`${ASSET_PATH}/mipmap-hdpi/ic_launcher.png`);
      icon.circle().write(`${ASSET_PATH}/mipmap-hdpi/ic_launcher_round.png`);
    });

    //mipmap-mdpi
    Jimp.read(name, (err, icon) => {
      if (err) throw err;
      icon.resize(48, 48).write(`${ASSET_PATH}/mipmap-mdpi/ic_launcher.png`);

      icon.circle().write(`${ASSET_PATH}/mipmap-mdpi/ic_launcher_round.png`);
    });

    //mipmap-xhdpi
    Jimp.read(name, (err, icon) => {
      if (err) throw err;
      icon.resize(96, 96).write(`${ASSET_PATH}/mipmap-xhdpi/ic_launcher.png`);

      icon.circle().write(`${ASSET_PATH}/mipmap-xhdpi/ic_launcher_round.png`);
    });

    //mipmap-xxhdpi
    Jimp.read(name, (err, icon) => {
      if (err) throw err;
      icon
        .resize(144, 144)
        .write(`${ASSET_PATH}/mipmap-xxhdpi/ic_launcher.png`);
      icon.circle().write(`${ASSET_PATH}/mipmap-xxhdpi/ic_launcher_round.png`);
    });

    //mipmap-xxxhdpi
    Jimp.read(name, (err, icon) => {
      if (err) throw err;
      icon
        .resize(192, 192)
        .write(`${ASSET_PATH}/mipmap-xxxhdpi/ic_launcher.png`);

      icon.circle().write(`${ASSET_PATH}/mipmap-xxxhdpi/ic_launcher_round.png`);
    });
  }
};
