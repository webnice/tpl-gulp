// @ts-ignore

const path = require('path');
const fs = require('fs');
const colors = require('colors');
const moment = require('moment');


const srcAppVersion = require('./package.json').version;
const appVersion = `${srcAppVersion}+build.${moment().utc().format('YYYYMMDD.HHmmss.UTC')}`;
const writeFileOpt = {
    flag: 'w',
};
const versionFilePath = './src/ts/version.constant.ts';
const src = `// Этот файл создан автоматически, генератором кода.
// !!! Версию изменять только в файле package.json !!!
// Синтаксис версий: Semantic Versioning 2.0.0 (https://semver.org/).
//
// This file was automatically generated.
// Version syntax: Semantic Versioning 2.0.0 (https://semver.org/).

const appVersion: string = '${appVersion}';
export {
  appVersion,
}
`;

console.log(colors.cyan('Запущена задача предварительной сборки.'));
// Извлечение версии приложения из файла package.json и создание программного файла src/ts/version.constant.ts.
// @ts-ignore
fs.writeFile(versionFilePath, src, writeFileOpt, (err) => {
    if (err) return console.log(colors.red(err));
    console.log(colors.green(`Версия приложения: ${colors.yellow(appVersion)}`));
    console.log(`${colors.green('Версия записана в файл: ')}${colors.yellow(versionFilePath)}\n`);
});
