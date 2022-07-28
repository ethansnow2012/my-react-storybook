import React from "react"
import styled from "styled-components"
import useHoverState from "../hooks/useHoverState"
import classNames from "classnames"

const Styled = styled.div`
    &.l-item {
        width: 50px;
        height: 50px;
        background-color: grey;
        position: relative;
    }
    & .l-item-hover{
        display:none;
        position: absolute;
        right: calc(100% + 10px);
    }
    & .l-item-hover.l-item-hover_active{
        display: block;
    }
`

export default (props: any) => {
    const [isHovering, hoverHandle] = useHoverState();
    
    return (
        <Styled className='l-item' onMouseOver={hoverHandle.handleMouseOver} onMouseOut={hoverHandle.handleMouseOut}>
            "item"
            <div className={classNames({
                'l-item-hover': true,
                'l-item-hover_active': isHovering
            })}>
                AAAAAAA
            </div>
        </Styled>
    )
}