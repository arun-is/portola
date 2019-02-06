import React from "react"

const asyncComponent = importComponent => {
  return class extends React.Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default })
      })
    }

    render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : null
    }
  }
}

const MasterTemplate = ({ pageContext }) => {
  const { frontmatter, html } = pageContext

  const { template, ...restOfFrontmatter } = frontmatter

  const TemplateComponent = asyncComponent(() => {
    return import(`templates/${template}`)
  })

  return (
    <TemplateComponent frontmatter={restOfFrontmatter}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </TemplateComponent>
  )
}

export default MasterTemplate
