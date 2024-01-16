import { useEffect, useReducer } from "react"
import { useRef } from "react"

const taskReducer = (state=[] , action) =>{
    switch (action.type) {
        case "Add_task":
            return [...state, { id: Date.now(), text: action.payload, hidden: false }];
        case "Toggle_Task":
            return state.map((task) =>
                task.id === action.payload ? { ...task, hidden: !task.hidden } : task
            );
        default:
            return state;
    }
}

const TaskList = () =>{

    const [tasks , dispatch] = useReducer(taskReducer , [])
    const inputRef = useRef()

    useEffect(()=>{
        if (inputRef.current){
            inputRef.current.focus()
        }
    } , [tasks])

    const handleAddTask = (text) => dispatch ({type:"Add_task" , payload:text})

    const handleToggleTask = (id) =>{
        if (tasks[id].hidden == true){
            tasks[id].hidden = false}
        else{
            tasks[id].hidden = true}

        dispatch({type:"Toggle_Task" ,  payload:id})
        inputRef.current.focus()
    }

    function handleBackToTop(id){
        if (inputRef.current){
            inputRef.current.focus()
        }
    }

    function handleEnter(e){
        if (e.key == "Enter"){
            handleAddTask(e.target.value)
            e.target.value = " "
        }
    }

    return (
        <div className="container">
            <h2>Daily Tasks</h2>
            <div>
                <input type="text" placeholder="Enter the Task" ref={inputRef} onKeyDown={handleEnter}/>
            </div>

            <ul>
                {tasks.map((el , i)=>(
                    (<li key={i}> <span style={{textDecoration: el.hidden?"line-through" : "none"}}>{el.hidden ? "Task is hidden" : el.text}</span><button onClick={()=>handleToggleTask(i)}>Toggle</button></li>)
                ))}
            </ul>

            <button className="back-to-top-btn" onClick={handleBackToTop}>Back to Top</button>
        </div>
    )

}

export default TaskList