#!/usr/bin/env node

const lnk = require("lnk")
const fs = require("fs-extra")
const child_process = require("child_process")
const path = require("path")
const report = require("yurnalist")

const cwd = process.cwd()
const inner_workings = path.join(cwd, "inner_workings")
const gatsby_files = path.join(__dirname, "gatsby_files")

const arguments = process.argv.slice(2)
const firstArgument = arguments[0]

const VALID_ARGUMENTS = {
  NEW: "new",
  DEVELOP: "develop",
  BUILD: "build"
}

const getValidArgumentStrings = () => Object.values(VALID_ARGUMENTS)

const establishLinks = async () => {
  await fs.emptyDir(inner_workings)
  report.success("cleared inner_workings directory")

  const filesToCopy = ["gatsby-config.js", "gatsby-node.js", "src"]

  while (filesToCopy.length > 0) {
    const fileToCopy = filesToCopy.pop()
    await fs.copy(
      path.join(gatsby_files, fileToCopy),
      path.join(inner_workings, fileToCopy)
    )
  }

  await lnk(
    [`${cwd}/node_modules`, `${cwd}/package.json`, `${cwd}/package-lock.json`],
    inner_workings
  )
  report.success("copied files to inner_workings directory")
}

const main = async () => {
  if (arguments.length === 0) {
    report.error(
      `You must provide an argument like: ${getValidArgumentStrings().join(
        ", "
      )}`
    )
    return
  }

  if (!getValidArgumentStrings().includes(firstArgument)) {
    report.error(
      `${firstArgument} isn't a valid argument. try one of the following: ${getValidArgumentStrings().join(
        ", "
      )}`
    )
    return
  }

  if (firstArgument === VALID_ARGUMENTS.DEVELOP) {
    await establishLinks()

    child_process.execSync(`gatsby develop`, {
      cwd: inner_workings,
      stdio: [0, 1, 2]
    })
  }
}

main()
