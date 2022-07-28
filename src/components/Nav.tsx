import React from "react"
import NavItem from "./NavItem"
import styled from "styled-components"

const Styled = styled.div`
    &.nav-wrapper{
        width: max-content;
        margin-left: auto;
        display: flex;
    }
    &.nav-wrapper {
        flex-direction: column;
        gap: 10px;
    }
`

export default (props: any) => {
    return (
        <Styled className="nav-wrapper">
            <NavItem/>
            <NavItem/>
            <NavItem/>
        </Styled>
    )
}