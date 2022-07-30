import React from "react";
import { storiesOf } from "@storybook/react";
import AutoAnimationPlayGround from "../components/AutoAnimationPlayGround";



storiesOf("Library Test", module)
    .add("AutoAnimationPlayGround",
        () => {
            const dataSelf = 'yoooo'
            return(
                <AutoAnimationPlayGround/> 
            )
        }
    )