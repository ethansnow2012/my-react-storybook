import React, {useState, useRef, useEffect, useLayoutEffect } from "react"
import styled from "styled-components"
import classNames from "classnames";

const textSymbols = {
    add: "+",
    minus: "-",
    cross: "✖"
}
const Styled = styled.div`
    &.c-root{
        ---color1: #8AD2F0;
        ---color2: #C6E9F8;
        ---color-grey: #696969;
        ---color-grey-mild: #b7b7b7;
        ---color-grey-light: #F7F7F8;
        ---sp-1: 20px;
        ---sp-2: 15px;
        ---sp-3: 0.3em;
        
        display: flex;
        background-color: var(---color1);
        color: white;
        width: max-content;
        border-radius: 10px;
        cursor: pointer;
        transition: all .8s ease;
        transition-property: max-width, min-width;
        overflow: hidden;
    }

    .c-root.c-root-expanding{
        cursor: unset;
        max-width: 0;
    }
    .c-root > * + *{
        padding-left: 10px;
    }
    .c-root-expendable{
        width: 0;
        height: 0;
        overflow: hidden;
        padding:0;
        background: var(---color2);;
        color: var(---color-grey);
    }
    &.c-root-expanding .c-root-expendable{
        width: unset;
        height: unset;
        padding-right: 10px;
        padding-left: 10px;
        padding-top: var(---sp-1);
        padding-bottom: var(---sp-1);
    }
    .c-root-add{
        width: max-content;
        flex-shrink: 0;
        padding: var(---sp-1);
        display: flex;
    }
    .c-root-add-symbol{
        padding-left: var(---sp-3);
        font-weight: bolder;
        transform: scale(1.3);
        position: relative;
        top: -1px;
    }
    .c-root-expendable-i{
        display: flex;
        flex-direction: column;
    }
    .c-root-expendable-i + .c-root-expendable-i{
        margin-top: var(---sp-2);
    }
    .c-root-expendable-i > * + *{
        margin-top:  var(---sp-3);
    }
    .c-root-expendable-i input{
        outline: none;
    }
    .c-root-expendable-i-selectbox{
        background: white;
        border-radius: 10px;
        margin-top:var(---sp-3);
        padding: var(---sp-3);
        display: flex;
        position: relative;
        max-width: 270px;
        flex-wrap: wrap;
    }
    .c-root-expendable-i-selectbox:first-child{
        top: calc(var(---topOffset) * -1);
    }
    .c-root-tags{
        width: max-content;
        padding: var(---sp-3);
        border-radius: 8px;
        background-color: var(---color-grey-light);
        border: 1px solid var(---color1);
        display: flex;
        margin-right:var(---sp-3);
        margin-bottom:var(---sp-3);
    }
    .c-root-expendable-i_text input{
        margin-left:var(---sp-3);
    }
        
    .c-root-tags-delete{
        margin-left: 3px;
        cursor: pointer;
    }
    .c-root-tags-delete:hover{
        color:var(---color-grey-mild)
    }
    .c-root-tags-delete-inner{
        position: relative;
        top: -2px;
    }
    .c-root-v-collapse{
        height: 0;
        overflow: hidden;
        padding: 0;
    }
    .c-root-expendable-i_multiselect > *:first-child{
        margin-bottom: var(---sp-3);
    }
    .c-root-expendable-i_multiselect-add, .c-root-expendable-i_multiselect-minus{
        background-color: #ffffff73;
        width: 15px;
        height: 1.2em;
        display: flex;
        padding-left: 5px;
        border-radius: 4px;
        padding-top: 1px;
        margin-left: var(---sp-3);
        cursor: pointer;
    }
    .c-root-expendable-i_multiselect-minus span{
        transform: translate(2px);
    }
    .c-root-expendable-i-selectbox-inner{
        overflow: hidden;
    }
    .c-root-expendable-i-selectbox-edit{
        background: #fff3e4;
    }
    .c-root-expendable-i-selectbox-edit .c-root-tags{
        cursor: pointer;
    }
`

export interface IProps {
    initObj?: any,
    dataSelf?: any
}
export default (props: IProps) => {
    const {dataSelf, initObj} = props
    const selfRef = useRef<HTMLElement|null>(null)
    const currentWidth = useRef('')
    const [expandToggle, setExpandToggle] = useState(false)
    const rootClasses = classNames({
        'c-root': true,
        'c-root-expanding': expandToggle,
    })

    const click$At = (ev)=>{
        setExpandToggle((self)=>{ return !self})
        currentWidth.current = selfRef.current?getComputedStyle(selfRef.current).width:''
    }

    useLayoutEffect (()=>{
        if(selfRef.current != null){
            if(expandToggle){
                selfRef.current.style.minWidth = ''
                selfRef.current.style.maxWidth = currentWidth.current
                setTimeout(()=>{
                    if(selfRef.current != null)
                    selfRef.current.style.maxWidth =  '500px'
                }, 0)
            }else{
                selfRef.current.style.maxWidth = ''
                selfRef.current.style.minWidth = currentWidth.current

                setTimeout(()=>{
                    if(selfRef.current != null)
                    selfRef.current.style.minWidth = '0px'
                }, 0)
            }
        }
    }, [expandToggle])

    return (
        <Styled className={rootClasses} ref={selfRef} onClick={click$At}>
            <div className="c-root-add">
                {initObj?.textAdd} { (expandToggle!=true)&&<div className="c-root-add-symbol">{textSymbols.add}</div>}
            </div>
            <div className="c-root-expendable" >
                {
                    initObj&&initObj.inputSchema.map((_inputSchema)=>{
                        if(_inputSchema.type==='text'){
                            return (
                                <div className="c-root-expendable-i_text" key={_inputSchema.id}>
                                    <label htmlFor={_inputSchema.id} >{_inputSchema.label}</label>
                                    <input type="text" id={_inputSchema.id} />
                                </div>
                            )
                        }
                    })
                }
            </div>
        </Styled>
    )
}