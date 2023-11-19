#!/usr/bin/env node

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');

// Project Name
const project_name = process.argv[2];

const current_dir = process.cwd();
const project_dir = path.resolve(current_dir, project_name);
fs.mkdirSync(project_dir, { recursive: true });

const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, project_dir, { recursive: true });
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
spawn.sync('npm', ['install'], { stdio: 'inherit' });

console.log('Success! Your new Base Phaser 3 Game is ready.');
console.log(`Created ${project_name} at ${project_dir}`);
