const fs = require("fs");

const screenMaker = require("../boilerplates/screen.boilerplate");
const serviceMaker = require("../boilerplates/service.boilerplate");
const sliceMaker = require("../boilerplates/slice.boilerplate");
const styleMaker = require("../boilerplates/style.boilerplate");

exports.screenGenerator = (fileName, redux = false) => {
  const CURR_DIR = process.cwd();
  fs.mkdirSync(`${CURR_DIR}/src/screens/${fileName}`);

  //SCREEN
  const screenFile = `${CURR_DIR}/src/screens/${fileName}/${fileName}.screen.tsx`;
  fs.writeFileSync(screenFile, screenMaker.screenBoilerplate(fileName), "utf8");

  //STYLE
  const styleFile = `${CURR_DIR}/src/screens/${fileName}/${fileName}.style.ts`;
  fs.writeFileSync(styleFile, styleMaker.styleBoilerplate(fileName), "utf8");

  //INDEX
  const indexFile = `${CURR_DIR}/src/screens/${fileName}/index.ts`;
  fs.writeFileSync(indexFile, exportScreen(fileName), (err) => {
    if (err) throw err;
  });

  //SERVICE AND SLICE GENERATOR
  if (redux) {
    const serviceFile = `${CURR_DIR}/src/screens/${fileName}/${fileName}.service.ts`;
    fs.writeFileSync(
      serviceFile,
      serviceMaker.serviceBoilerplate(fileName),
      "utf8"
    );

    const sliceFile = `${CURR_DIR}/src/screens/${fileName}/${fileName}.slice.ts`;
    fs.writeFileSync(sliceFile, sliceMaker.sliceBoilerplate(fileName), "utf8");
  }
  console.log(`screen ${fileName} created`);
  return;
};

const exportScreen = (screenName) => {
  return `export * from "./${screenName}.screen"`;
};
