const fs = require('fs-extra');
const path = require("path");

const localesSrc = path.resolve("./dist/ngx-fomantic-ui/behaviors/localization/locales");
const localesDest = path.resolve("./dist/ngx-fomantic-ui/locales");

fs.readdirSync(localesDest).filter(f => f.includes(".d.ts")).forEach(f => {
  const rewritten = fs.readFileSync(`${localesDest}/${f}`).toString().replace("./interfaces/values", "../index");
  fs.writeFileSync(`${localesDest}/${f}`, rewritten);
});
