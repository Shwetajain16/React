import React, { useRef, useState } from "react";
import Sidebar from "./Test";

function Parent() {
  const SidebarRef = useRef();
  const [visible,setVisible]=useState(null);
  const set=(newvisible)=>{
    setVisible(newvisible)
  }
  console.log(visible)
  return (
    <>
      <button onClick={() => SidebarRef.current.opensideBar()}>
        Show SideBar
      </button>
      <Sidebar ref={SidebarRef} setv={set}/>
      {visible===true?(
        <aside className="sidebar">
           <ul className="list-group ">
             <li className=" list-group-item">HOME</li>
             <li className=" list-group-item">ABOUT</li>
             <li className=" list-group-item">SERVICES</li>
             <li className=" list-group-item">CONTACT</li>
             <li className=" list-group-item">GALLERY</li>
          </ul>
       </aside>
      ):null}
    </>
  );
}
export default Parent;
