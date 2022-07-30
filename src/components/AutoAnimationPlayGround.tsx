import React, {useRef, useState, useEffect} from "react"
import styled from "styled-components"
//import autoAnimate from '@formkit/auto-animate'
import useAutoAnimate from '../hooks/useAutoAnimation'

export interface IProps {
    
}
const Styled = styled.div`
    & .l-block{
        width: 10em;
        height: 10em;
        background: grey;
        margin: 5px;
    }
`

const data1 = [{id:'sdfasdfag-0'}, {id:'sdfasdfag-1'}, {id:'sdfasdfag-2'}]
export default (props: IProps) => {
    const [blockDataReprecent, setBlockDataReprecent] = useState(data1)
    const [baseBlockWrapper] = useAutoAnimate(/* optional config */)
    const reandomToggle = () =>{
        setBlockDataReprecent(()=>{
            const newData = [...data1]
            const random = Math.floor(Math.random() * newData.length);
            const el = newData.splice(random, 1)[0];
            return newData
        })
    }
    return (
        <Styled>
            {/* ref={baseBlockWrapper} */}
            <div ref={baseBlockWrapper} >
                {
                    blockDataReprecent.map((el)=>{
                        return (
                            <div className="l-block" key={el.id}>
                                {el.id}
                            </div>
                        )
                    })
                }
                <div className="l-block-control">
                    <button className="l-button" onClick={reandomToggle}>Random Toggle</button>
                </div>
            </div>
        </Styled>
    )
}