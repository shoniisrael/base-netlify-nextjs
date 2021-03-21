const fs = require("fs-extra");
const filesToCopy = ["_redirects", "functions"];
Promise.all(
  filesToCopy.map((fileName) => fs.copy(`./${fileName}`, `./out/${fileName}`).then(() => fileName)),
)
  .then((fileNames) =>
    console.info(`The following files were copied to './out': ${JSON.stringify(fileNames)}`),
  )
  .catch((error) => console.error(error));
