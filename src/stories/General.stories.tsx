import React from "react";
import { storiesOf } from "@storybook/react";
import MyCompo from "../components/MyCompo";
import MyCompoWrapper from "../components/MyCompoWrapper";
import ColorButton from "../components/ColotButton";
import NavLayout from "../components/NavLayout";
import Nav from "../components/Nav";


    
storiesOf("MyCompo", module)
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
    .add("blue Button",
        () => <ColorButton color="blue" />
    )
    .add("NavLayout",
        () => <NavLayout>
            <Nav></Nav>
        </NavLayout>
    )
    
