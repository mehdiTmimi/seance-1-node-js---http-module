import { urlApi } from "./config.js"
import { addTodoToTable } from "./main.js";

export const load=async ()=>{
    const response= await fetch(urlApi+"todos")
    const todos= await response.json();
    todos.forEach(todo => {
        addTodoToTable(todo);
    });
}