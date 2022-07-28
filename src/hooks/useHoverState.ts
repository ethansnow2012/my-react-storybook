import { useState } from "react"
export default () : [boolean, {handleMouseOver: ()=>void, handleMouseOut:  ()=>void }] =>{
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };
    
    const handleMouseOut = () => {
        setIsHovering(false);
    };
    return [isHovering, {handleMouseOver, handleMouseOut}]
    
}
