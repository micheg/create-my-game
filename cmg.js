#!/usr/bin/env node

if(process.argv.length < 3)
{
    console.log('missing arguments, target dir');
    process.exit(1);
}

const fs = require('fs');
const path = require('path');
// Project Name
const project_name = process.argv[2];

const current_dir = process.cwd();
const project_dir = path.resolve(current_dir, project_name);
// check if directory alread exist
if (fs.existsSync(project_dir))
{
    console.log(`directory ${project_name} already exist, error`);
    process.exit(1);
}

fs.mkdirSync(project_dir, { recursive: true });
const template_dir = path.resolve(__dirname, 'template');
fs.cpSync(template_dir, project_dir, { recursive: true });
fs.renameSync(
    path.join(project_dir, 'gitignore'),
    path.join(project_dir, '.gitignore')
);
const _package_json = require(path.join(project_dir, 'package.json'));

_package_json.name = project_name;

fs.writeFileSync(
    path.join(project_dir, 'package.json'),
    JSON.stringify(_package_json, null, 2)
);

console.log('Success! Your new Base Phaser 3 Game is ready.');
console.log(`Created ${project_name} at ${project_dir}`);
console.log(`Proceded with cd ${project_name}`);
console.log(`npm install`);
