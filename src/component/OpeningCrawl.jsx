import React from 'react'

const OpeningCrawl = ({openCrawl}) => {
  return (
    <div id='marquee' >
      <p dangerouslySetInnerHTML={{ __html: openCrawl }}  />
    </div>
  )
}

export default OpeningCrawl