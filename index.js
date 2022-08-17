#!/usr/bin/env node

const screenGenerator = require("./generator/files/screen.generator");
const componentGenerator = require("./generator/files/component.generator");
const projectGenerator = require("./generator/files/cloneRepo");

const argument = process.argv;

switch (argument[2]) {
  case "create":
    projectGenerator.cloneRN();
    break;
  case "screen":
    var redux = false;
    if (argument[3] == undefined) {
      console.log("Screen name is required i.e: rn-code screen screen-name");
      break;
    }
    if (argument[4] !== undefined && argument[4] == "-r") {
      redux = true;
    }
    screenGenerator.screenGenerator(argument[3], redux);
    break;

  case "component":
    var redux = false;
    if (argument[3] == undefined) {
      console.log(
        "component name is required i.e: rn-code component component-name"
      );
      break;
    }
    if (argument[4] !== undefined && argument[4] == "-r") {
      redux = true;
    }
    componentGenerator.componentGenerator(argument[3], redux);
    break;

  default:
    console.log("No input");
    break;
}

console.log(argument[2]);
