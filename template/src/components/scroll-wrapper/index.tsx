import React from 'react'
import styled from 'styled-components'
import ScrollBar from 'react-custom-scrollbars'

const Wrapper = styled.div`
  .scroll-content {
    padding-right: 16px;
  }
`

const ScrollWrapper: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <ScrollBar>
        <div className="scroll-content">{children}</div>
      </ScrollBar>
    </Wrapper>
  )
}

export default ScrollWrapper
