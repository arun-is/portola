import React from "react"

const TestTemplate = ({ frontmatter, children }) => {
  console.log("logic goes here")

  return (
    <div>
      <h1>Foo: {frontmatter.foo}</h1>
      <h1>Bar: {frontmatter.bar}</h1>
      {children}
    </div>
  )
}

export default TestTemplate
