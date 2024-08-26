const fs = require("fs");
const { execSync } = require("child_process");

// If environment variables are set then we could use them.
const version = require("./package.json").version;

let buildTag = process.env.BUILD_TAG;
let hash = null;
let date = null;
let branch = null;

if (!buildTag) {
    date = execSync("git log -1 --format=%ci").toString().trim();
    hash = execSync("git rev-parse --short HEAD").toString().trim();
    branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

    const dateParts = date.split(/ /);
    date = dateParts[0] + "T" + dateParts[1] + "Z";
} else {
    branch = process.env.COMMIT_BRANCH;
    hash = process.env.COMMIT_SHORT_SHA;
    date = process.env.COMMIT_TIMESTAMP;
}

const versionInfo = {
    git: {
        branch: branch,
        commit: {
            id: hash,
            time: date,
        },
    },
    build: {
        artifact: "alis-frontend",
        name: "alis-frontend",
        time: new Date().toISOString(),
        version: version,
        group: "ru.korusconsulting.alis",
    },
};

fs.writeFileSync("build/versionInfo.json", JSON.stringify(versionInfo));
