import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
// import './App.css'
function App() {
  const [data,setData]=useState([])
  const [input,setInput]=useState('')
  const [update,setUpdate]=useState('')
  const [toggle,setToggle]=useState(true)

  useEffect(()=>{
    axios.get('https://dummyjson.com/todos').then(res=>{
      setData(res.data.todos);
    })
  },[])

  const AddItem=()=>{
        const list={
          todo:input,
        }
        setData([...data,list])
        setInput('')
      }

  const DeleteItem=(index)=>{
    let temp=[...data]
    const newtodo=temp.filter((a)=>a !== temp[index])
    setData(newtodo);
  }
  const handleUpdate=(index)=>{
    setUpdate(index)
    setToggle(!toggle)
  }
  const UpdateItem=(index,newEle)=>{
    const newData=[...data]
    newData[index]=newEle
    setData(newData)
  }
  return (
    <>
    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} ></input>
    <button onClick={()=>AddItem()}>Add Todo</button>
    {
      data.map((item,index)=>{
        return (
          <div>
            <ul>
              <li>{item.todo}
                { toggle && update === index ? <input type="text" name="name" value={item.todo} 
                  onChange={(e)=>UpdateItem(index,e.target.value)} /> : ''
                }
                <input type="checkbox" checked={item.completed} />
                <button onClick={()=>handleUpdate(index)}>{toggle && update === index ? 'Save':'Update'}</button>
                <button onClick={()=>DeleteItem(index)}>Delete</button>
              </li>
            </ul>
          </div>
          )
      })
    }
    </>
  )
}
export default App
