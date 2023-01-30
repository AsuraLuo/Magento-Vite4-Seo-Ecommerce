import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { useApp } from '@hooks/App'

const App = () => {
  const { content } = useApp()

  return (
    <div className="App">
      <div
        dangerouslySetInnerHTML={{ __html: documentToHtmlString(content) }}
      />
    </div>
  )
}

export default App
