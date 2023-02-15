import React from 'react'

type Props = {
  id: string
  src: string
}

const EsiIncludeInScript = React.memo<Props>(({ id, src }) => (
  <script
    id={id}
    suppressHydrationWarning
    type="text/javascript"
    dangerouslySetInnerHTML={{ __html: `<esi:include src="${src}" />` }} // eslint-disable-line react/no-danger
  />
))

export default EsiIncludeInScript
