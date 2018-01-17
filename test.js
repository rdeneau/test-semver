// https://medium.com/@mbostock/prereleases-and-npm-e778fc5e2420
// https://github.com/npm/node-semver#prerelease-tags

var semver = require("semver");

// ---

console.log(`Test semver.satisfies()`);

const versions_2018_2_0 = createVersions("2018.2.0");

testSatisfies("~2018.2", versions_2018_2_0);
testSatisfies("^2018.2", versions_2018_2_0);
testSatisfies("^2018.2.0", versions_2018_2_0);
testSatisfies("^2018.2.0-dev", [
    ...createVersions("2018.1.0"),
    ...versions_2018_2_0,
    ...createVersions("2018.2.1"),
    ...createVersions("2018.3.0"),
]);

function createVersions(versionOneSi) {
    return [
        `${versionOneSi}`,
        `${versionOneSi}-dev.999`,
        `${versionOneSi}-master.999`,
    ];
}

function toColumn(labels) {
    const maxLength = Math.max(...labels.map(label => label.length));
    return label => label + " ".repeat(maxLength - label.length);
}

function testSatisfies(range, versions) {
    const printVersion = toColumn(versions);
    console.log(` -> range "${range}" satisfied by:`);
    versions.forEach(version => {
        const result = semver.satisfies(version, range);
        console.log(`   -> version ${printVersion(version)} => ${result}`);
    });
    console.log(` `);
}

// ---

console.log(` `);
console.log(`Test semver.compare()`);
testCompare("2018.2.0-master.998", "2018.2.0-dev.999");
testCompare("2018.2.0-master.998", "2018.2.0");

function testCompare(v1, v2) {
    const result = semver.compare(v1, v2);
    let operator = '?';
    switch (result) {
        case -1: operator = '<'; break;
        case  0: operator = '='; break;
        case  1: operator = '>'; break;
    }
    console.log(` -> "${v1}" ${operator} "${v2}"`);
}

// ---

console.log(` `);
console.log(`Test semver.inc()`);

testInc("2018.2.0-dev.999", "minor");
testInc("2018.2.0-dev.999", "patch");
testInc("2018.2.0-dev.999", "prepatch");
testInc("2018.2.0-dev.999", "prerelease");

function testInc(version, release) {
    const result = semver.inc(version, release);
    console.log(` -> "${version}" incremented on ${release} => "${result}"`);
}
