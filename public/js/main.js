import { addFormTodo, loginForm, loginTitle, logoutBtn, registerForm, tbody, urlApi } from "./config.js";
import { checkAuth } from "./router.js";
import { formToJson } from "./utils.js";

loginForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    try{
    let response =await fetch(urlApi+"users/login",{
        method:"POST",
        body:JSON.stringify(formToJson('loginForm')),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.ok)
        {
            
            return checkAuth();
        }
    let res=  await response.json()
    alert(res.message)
    }
    catch(e)
    {
        console.log(e)
        alert("error")
    }
})



registerForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    let datas=formToJson('registerForm');
    let {pwd1,pwd2}=datas;
    if(pwd1!=pwd2)
        return alert("no match")
    let dataToSend= {
                    login: datas.login, 
                    pwd:pwd1
                };
    try{
    let response =await fetch(urlApi+"users/register",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.ok)
        {
            window.location.hash="login"
            loginForm.elements['login'].value=datas.login;
            return alert("success")
        }
    let res=  await response.json()
    alert(res.message)
    }
    catch(e)
    {
        console.log(e)
        alert("error")
    }
})

logoutBtn.addEventListener('click',async ()=>{
    await fetch("users/logout")
    window.location.hash=""
    checkAuth()
})

addFormTodo.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const dataToSend=formToJson('addFormTodo');
    const response = await fetch(urlApi+"todos",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(!response.ok)
        return alert("error")
    const dataReceived=await response.json()
    addTodoToTable(dataReceived)

})

export const addTodoToTable=(todo)=>{
    const tr=document.createElement("tr")
    const tdTitle=document.createElement("td")
    const tdCompleted=document.createElement("td")
    const tdOptions=document.createElement("td")
    const btnDelete=document.createElement("button")

    tr.appendChild(tdTitle)
    tr.appendChild(tdCompleted)
    tr.appendChild(tdOptions)
    tdOptions.appendChild(btnDelete)

    tdTitle.innerText=todo.title
    tdCompleted.innerText=todo.completed
    btnDelete.innerText="X";

    btnDelete.addEventListener('click',async ()=>{
        //TODO 
         const response = await fetch(urlApi+"todos/"+todo._id,{method:"DELETE"})
         if(response.ok)
            return tr.remove();
        alert("can't delete todo")
    })
    tbody.appendChild(tr)
}