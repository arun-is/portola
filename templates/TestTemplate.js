import React from "react"

const TestTemplate = ({ frontmatter, children }) => {
  console.log("logic goes here")

  return (
    <div>
      <h1 style={{ color: "red" }}>{frontmatter.foo}</h1>
      <h1>{frontmatter.bar}</h1>
      {children}
    </div>
  )
}

export default TestTemplate
