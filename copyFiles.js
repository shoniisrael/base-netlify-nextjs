const fs = require(`fs`).promises;

Promise.all(
  [`_redirects`].map((fileName) =>
    fs.copyFile(`./${fileName}`, `./out/${fileName}`).then(() => fileName),
  ),
).then((fileNames) =>
  console.info(`The following files were copied to './out': ${JSON.stringify(fileNames)}`),
);
