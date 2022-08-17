#!/usr/bin/env node

const screenGenerator = require("./generator/files/screen.generator");
const componentGenerator = require("./generator/files/component.generator");

const argument = process.argv;

switch (argument[2]) {
  case "screen":
    screenGenerator.screenGenerator(argument[3]);
    break;
  case "component":
    componentGenerator.componentGenerator(argument[3]);
    break;
  default:
    console.log("No input");
    break;
}

console.log(argument[2]);
