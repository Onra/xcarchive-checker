const exec = require("child_process").exec;
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 <command> [options]")
  .command(
    "validate [xcarchive]",
    "Validates that the xcarchive contains the host passed with the -h option"
  )
  .alias("a", "archive")
  .nargs("a", 1)
  .describe("a", "Archive to validate")
  .alias("p", "path")
  .nargs("p", 1)
  .describe("p", "API path the archive should target")
  .demandOption(["a", "p"])
  .help("h").argv;

const dir = exec(
  `grep -q ${argv.p} ${argv.a}/Products/Applications/*.app/main.jsbundle`,
  (err, stdout, stderr) => {
    if (err) {
      console.log("###############################");
      console.log("####        WARNING        ####");
      console.log("#### Host not found in IPA ####");
      console.log("###############################");
      return;
    }
    console.log("The archive is targeting the right API host");
  }
);
