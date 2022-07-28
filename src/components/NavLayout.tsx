import React from "react"
import styled from "styled-components"

const Styled = styled.div`
  &.l-layout {
    width: 100%;
    height: 700px;
  }
  &.l-layout > *{
    margin-left: auto;
  }
`

export default (props: any) => {
    const {children} = props
    return (
        <Styled className={'l-layout'}>
            {children}
        </Styled>
    )
}

