import React from "react"
import styled from "styled-components"

const Styled = styled.div`
    &.l-item {
        width: 50px;
        height: 50px;
        background-color: grey;
    }
`

export default (props: any) => {
    
    return (
        <Styled>
            "item"
        </Styled>
    )
}