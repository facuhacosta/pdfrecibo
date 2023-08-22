"use strict";const a=require("electron");function d(e=["complete","interactive"]){return new Promise(t=>{e.includes(document.readyState)?t(!0):document.addEventListener("readystatechange",()=>{e.includes(document.readyState)&&t(!0)})})}const i={append(e,t){Array.from(e.children).find(n=>n===t)||e.appendChild(t)},remove(e,t){Array.from(e.children).find(n=>n===t)&&e.removeChild(t)}};function s(){const e="loaders-css__square-spin",t=`
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${e} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `,n=document.createElement("style"),o=document.createElement("div");return n.id="app-loading-style",n.innerHTML=t,o.className="app-loading-wrap",o.innerHTML=`<div class="${e}"><div></div></div>`,{appendLoading(){i.append(document.head,n),i.append(document.body,o)},removeLoading(){i.remove(document.head,n),i.remove(document.body,o)}}}a.contextBridge.exposeInMainWorld("electronAPI",{printComponent:async(e,t)=>{let n=await a.ipcRenderer.invoke("printComponent",e);t(n)},previewComponent:async(e,t)=>{let n=await a.ipcRenderer.invoke("previewComponent",e);t(n)}});const{appendLoading:p,removeLoading:r}=s();d().then(p);window.onmessage=e=>{e.data.payload==="removeLoading"&&r()};setTimeout(r,4999);
