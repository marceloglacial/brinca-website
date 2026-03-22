export function getLocalizedValue(value: any, locale: string): string {
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && locale in value) {
    return value[locale]
  }
  return ''
}

export function renderLexical(node: any, index: number = 0): any {
  if (!node) return null

  const nodeKey = node.key || `node-${index}`

  if (Array.isArray(node)) {
    return node.map((n, i) => <div key={`${nodeKey}-${i}`}>{renderLexical(n, i)}</div>)
  }

  if (typeof node === 'string') {
    return node
  }

  if (node.type === 'text') {
    return node.text
  }

  if (node.type === 'paragraph') {
    return (
      <p key={nodeKey}>
        {Array.isArray(node.children) &&
          node.children.map((child: any, i: number) => (
            <span key={`${nodeKey}-child-${i}`}>{renderLexical(child, i)}</span>
          ))}
      </p>
    )
  }

  if (node.type === 'heading') {
    const level = node.tag || 2
    const HeadingTag: any = `h${level}`
    return (
      <HeadingTag key={nodeKey}>
        {Array.isArray(node.children) &&
          node.children.map((child: any, i: number) => (
            <span key={`${nodeKey}-child-${i}`}>{renderLexical(child, i)}</span>
          ))}
      </HeadingTag>
    )
  }

  if (node.type === 'quote') {
    return (
      <blockquote key={nodeKey}>
        {Array.isArray(node.children) &&
          node.children.map((child: any, i: number) => (
            <div key={`${nodeKey}-child-${i}`}>{renderLexical(child, i)}</div>
          ))}
      </blockquote>
    )
  }

  if (node.type === 'list') {
    if (node.listType === 'number') {
      return (
        <ol key={nodeKey}>
          {Array.isArray(node.children) &&
            node.children.map((child: any, i: number) => (
              <div key={`${nodeKey}-child-${i}`}>{renderLexical(child, i)}</div>
            ))}
        </ol>
      )
    }
    return (
      <ul key={nodeKey}>
        {Array.isArray(node.children) &&
          node.children.map((child: any, i: number) => (
            <div key={`${nodeKey}-child-${i}`}>{renderLexical(child, i)}</div>
          ))}
      </ul>
    )
  }

  if (node.type === 'listitem') {
    return (
      <li key={nodeKey}>
        {Array.isArray(node.children) &&
          node.children.map((child: any, i: number) => (
            <span key={`${nodeKey}-child-${i}`}>{renderLexical(child, i)}</span>
          ))}
      </li>
    )
  }

  if (Array.isArray(node.children)) {
    return (
      <>
        {node.children.map((child: any, i: number) => (
          <div key={`${nodeKey}-child-${i}`}>{renderLexical(child, i)}</div>
        ))}
      </>
    )
  }

  return null
}
