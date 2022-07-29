import React, {useState, useRef, useEffect, useLayoutEffect } from "react"
import styled from "styled-components"
import classNames from "classnames";
import {initObjType} from './MyCompo.d.ts'
import useOnClickOutside from '../hooks/useOnClickOutside'

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

type WithRequired<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Required<T, K>
type initObjType$ordered = WithRequired<initObjType, 'order'>
export interface IProps {
    initObj: initObjType$ordered|null,
    setInitObj: React.Dispatch<React.SetStateAction<initObjType$ordered>>,
    dataSelf?: any
}
export default (props: IProps) => {
    const [rerenderTriger, setRerenderTriger] = useState(0)
    const {dataSelf, initObj, setInitObj}= props
    
    const selfRef = useRef<HTMLElement|null>(null)
    const currentWidth = useRef('')
    const [expandToggle, setExpandToggle] = useState(false)
    const multiselectMapRefInitFlag = useRef(false)
    const multiselectMapRef = useRef(new WeakMap())
    const rootClasses = classNames({
        'c-root': true,
        'c-root-expanding': expandToggle,
    })
    let multiselect = []
    if (initObj && multiselectMapRefInitFlag.current==false) {//only invoke once
        multiselect = initObj.inputSchema.filter(x=>x.type==='multiselect')
        multiselect.forEach((el)=>{
            multiselectMapRef.current.set(el, {
                editMode:false,
                top:'0'
            })
        })
        multiselectMapRefInitFlag.current = true
    }
    
    
    useOnClickOutside(selfRef, ()=>{
        setExpandToggle(false)
    })

    const click$At = (ev)=>{
        setExpandToggle((self)=>{ return !self})
        currentWidth.current = selfRef.current?getComputedStyle(selfRef.current).width:''
    }
    const onMultiselectAdd=(target, ev)=>{
        if(target.editMode == false){
            const targetStyle = getComputedStyle(ev.target.closest('.c-root-expendable-i_multiselect').querySelector('.c-root-expendable-i-selectbox'))
            const top = parseFloat(targetStyle.height, 10) + parseFloat(targetStyle.paddingTop, 10) + parseFloat(targetStyle.paddingBottom, 10) + "px"
            target.editMode = true
            target.top = `-${top}`
        }else{
            target.editMode = false
            target.top = `0px`
        }
        setRerenderTriger(x=>x+=1)
    }
    const getMultiselectClasses = (inputItem: any)=>{
        let multiselectClassRaw : any= 
        {
            'c-root-expendable-i_multiselect': true,
        }
        multiselectClassRaw[`c-root-expendable-i_multiselect-${multiselectMapRef.current.get(inputItem).editMode?'A':'B'}`]
        return classNames(multiselectClassRaw)
    }
    const onTagDelete = (inputId, ev)=>{
        console.log('onTagDelete')
        const dueId = ev.target.closest('.c-root-tags').querySelector('.c-root-tags-delete').id // to be deleted
        setInitObj((self:initObjType$ordered|null)=>{
            if(self==null){return null }

            const dueSchema =  self.inputSchema.filter(x=>x.id==inputId)[0]
            const restSchema = self.inputSchema.filter(x=>x.id!=inputId)
            if(dueSchema.selected){
                dueSchema.selected = [...dueSchema.selected.filter(x=>x.id!=dueId)]
            }

            return { //effect
                ...self, 
                inputSchema: [
                    ...restSchema,
                    dueSchema
                ]
            }
        })
    }
    const onTagAdd = (target, inputId, ev) => {
        const dueId = ev.target.closest('.c-root-tags').id // to be deleted
        setInitObj((self:initObjType$ordered|null)=>{
            if(self==null){return null }

            let dueSchema =  self.inputSchema.filter(x=>x.id==inputId)[0]
            const restSchema = self.inputSchema.filter(x=>x.id!=inputId)
            const tagToAdd = dueSchema.selectable?.filter(x=>x.id==dueId)[0]

            if(dueSchema.selected && tagToAdd){
                dueSchema.selected = [...dueSchema.selected, tagToAdd]
            }
            target.editMode = false //
            target.top = "0px"
            return { 
                ...self, 
                inputSchema: [
                    ...restSchema,
                    dueSchema
                ]
            }
        })
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
                    initObj&&initObj.inputSchema.sort((a, b)=>(a.order??-1) - (b.order??-1)).map((inputItem)=>{
                        return (
                            <div className="c-root-expendable-i" onClick={(ev)=>{ev.stopPropagation()}} key={inputItem.id}>
                                {
                                    inputItem.type==='text' && //if text
                                    <div className="c-root-expendable-i_text" >
                                        <label htmlFor={inputItem.id} >{inputItem.label}</label>
                                        <input type="text" id={inputItem.id} />
                                    </div>
                                }
                                {
                                    inputItem.type==='multiselect' &&(
                                        
                                        <div className={getMultiselectClasses(inputItem)} >
                                            <div style={{display:'flex'}}> 
                                                <span>{inputItem.label}</span> 
                                                <div 
                                                    className={classNames({
                                                        'c-root-expendable-i_multiselect-add': !multiselectMapRef.current.get(inputItem).editMode,
                                                        'c-root-expendable-i_multiselect-minus': multiselectMapRef.current.get(inputItem).editMode
                                                    })}
                                                    onClick={(ev)=>{
                                                        onMultiselectAdd(multiselectMapRef.current.get(inputItem), ev)
                                                    }}
                                                    >
                                                    <span>{multiselectMapRef.current.get(inputItem).editMode?textSymbols.minus:textSymbols.add}</span>
                                                </div> 
                                            </div>
                                            
                                            <div className="c-root-expendable-i-selectbox-wrapper">
                                                <div className="c-root-expendable-i-selectbox-inner">
                                                    <div className="c-root-expendable-i-selectbox" style={{marginTop:multiselectMapRef.current.get(inputItem).top}}>
                                                        {
                                                            inputItem.selected.map((tag)=>{
                                                                return (
                                                                    <div className="c-root-tags" key={tag.id}>
                                                                        <div className="c-root-tags-inner">
                                                                            {tag.text}
                                                                        </div>
                                                                        <div className="c-root-tags-delete" id={tag.id}  onClick={(ev)=>{onTagDelete(inputItem.id, ev)}}>
                                                                            <div className="c-root-tags-delete-inner">
                                                                                {textSymbols.cross}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })                                                            
                                                        }
                                                    </div>
                                                    <div className={classNames({
                                                        'c-root-expendable-i-selectbox': true,
                                                        'c-root-expendable-i-selectbox-edit': true,
                                                        'c-root-v-collapse': !multiselectMapRef.current.get(inputItem).editMode
                                                    })} style={{marginTop:'unset'}}>
                                                        {
                                                            inputItem
                                                                .selectable
                                                                .filter(x=> inputItem.selected.filter(y=>y.id===x.id).length==0)
                                                                .map((tag)=>{
                                                                    return (
                                                                        <div 
                                                                            className="c-root-tags"
                                                                            key={tag.id}
                                                                            id={tag.id}
                                                                            onClick={(ev)=>{onTagAdd(multiselectMapRef.current.get(inputItem), inputItem.id, ev)}}
                                                                            >
                                                                            <div className="c-root-tags-inner">
                                                                                {tag.text}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                                        
                                    )
                                    
                                }
                                
                            </div>
                            
                        )
                    })
                }
            </div>
        </Styled>
    )
}