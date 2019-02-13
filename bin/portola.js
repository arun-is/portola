#!/usr/bin/env node

const VALID_ARGUMENTS = {
  NEW: "new",
  DEVELOP: "develop",
  BUILD: "build"
}

const getValidArgumentStrings = () => Object.values(VALID_ARGUMENTS)

const arguments = process.argv.slice(2)
const firstArgument = arguments[0]

if (arguments.length === 0) {
  console.log(
    `You must provide an argument like: ${getValidArgumentStrings().join(", ")}`
  )
  return
}

if (!getValidArgumentStrings().includes(firstArgument)) {
  console.log(`${firstArgument} isn't a valid argument.`)
  console.log(
    `try one of the following: ${getValidArgumentStrings().join(", ")}`
  )
  return
}
