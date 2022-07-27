import React from "react";
import { storiesOf } from "@storybook/react";
import MyCompo from "./MyCompo";
import MyCompoWrapper from "./MyCompoWrapper";


    
storiesOf("ColorButton2", module)
    .add("MyCompo",
        () => {
            const dataSelf = 'yoooo'
            return(
                <MyCompoWrapper>
                    <MyCompo  dataSelf={dataSelf}/>
                </MyCompoWrapper>
                
            )
        }
    )
