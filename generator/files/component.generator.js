const fs = require("fs");
const capitalize = require("../utils/capitalize");

const componentMaker = require("../boilerplates/component.boilerplate");
const serviceMaker = require("../boilerplates/service.boilerplate");
const sliceMaker = require("../boilerplates/slice.boilerplate");
const styleMaker = require("../boilerplates/style.boilerplate");

exports.componentGenerator = (fileName, redux = false) => {
  const name = capitalize(fileName);
  const CURR_DIR = process.cwd();

  const COMPONENT_PATH = `${CURR_DIR}/component/${fileName}`;

  if (!fs.existsSync(`${CURR_DIR}/component`)) {
    //GENERATE COMPONENT FOLDER
    fs.mkdirSync(`${CURR_DIR}/component`);
  }

  if (fs.existsSync(`${COMPONENT_PATH}`)) {
    return console.log(`${fileName} component already exists!`);
  } else {
    //GENERATE COMPONENT
    fs.mkdirSync(COMPONENT_PATH);

    //COMPONENT FILE
    const componentFile = `${COMPONENT_PATH}/${fileName}.component.tsx`;
    fs.writeFileSync(
      componentFile,
      componentMaker.componentBoilerplate(fileName),
      "utf8"
    );

    //INDEX
    const indexFile = `${COMPONENT_PATH}/index.ts`;
    fs.writeFileSync(indexFile, exportScreen(fileName), (err) => {
      if (err) throw err;
    });

    //STYLE
    const styleFile = `${COMPONENT_PATH}/${fileName}.style.ts`;
    fs.writeFileSync(styleFile, styleMaker.styleBoilerplate(fileName), "utf8");

    //COMPONENT INDEX
    const COMPONENT_INDEX_PATH = `${CURR_DIR}/component/index.ts`;
    if (fs.existsSync(COMPONENT_INDEX_PATH)) {
      fs.appendFile(COMPONENT_INDEX_PATH, exportAll(fileName), (err) => {
        if (err) throw err;
      });
    } else {
      fs.writeFileSync(COMPONENT_INDEX_PATH, exportAll(fileName), (err) => {
        if (err) throw err;
      });
    }

    //REDUX
    if (redux) {
      const serviceFile = `${COMPONENT_PATH}/${fileName}.service.ts`;
      //SERVICE FILE
      fs.writeFileSync(
        serviceFile,
        serviceMaker.serviceBoilerplate(fileName),
        "utf8"
      );

      //SLICE FILE
      const sliceFile = `${COMPONENT_PATH}/${fileName}.slice.ts`;
      fs.writeFileSync(
        sliceFile,
        sliceMaker.sliceBoilerplate(fileName),
        "utf8"
      );
    }
  }
};

const exportScreen = (componentName) => {
  return `export * from "./${componentName}.component";\n`;
};

const exportAll = (component) => {
  return `export * from "./${component}";\n`;
};
