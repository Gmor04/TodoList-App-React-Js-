import { useState } from 'react'

function App() {

  let  [todo, setTodo] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  let [time, setTime] = useState('');
  let [edittitle, setEdittitle] = useState('');
  let [editdescription, seteditDescription] = useState('');
  let [edittodo, setedittodo] = useState(null);
  let getTodo = JSON.parse(localStorage.getItem("todoo"));
  let audio = document.getElementById('audio')

  if (getTodo != null) {
    todo = getTodo;
  }

  function Add() {
     let t = title.trim()
    if ( !t || !description || !time) {
      alert("Add a task to proceed")
      return
    }else{
      const list = { title, description, time}
      todo.push(list)
      setTodo([...todo])
  
      localStorage.setItem("todoo", JSON.stringify(todo))
      setTitle('');
      setDescription('');
      setTime('');
    }
    

  }
  function Done(index) {
    let e = edittitle.trim()
    if (!e || !editdescription) {
      alert("Add a task to proceed")
      return
    }
    else{
      todo[index].title = edittitle;
      todo[index].description = editdescription;
      setTodo([...todo]);
      localStorage.setItem("todoo", JSON.stringify(todo))
      setedittodo(null)
    }

  }

  function deletee(index) {
    // console.log(index);
    todo.splice(index, 1)
    setTodo([...todo])
    localStorage.setItem("todoo", JSON.stringify(todo))

  }
//  setInterval(() => {
//     reminder()
//  },5000)

  function reminder() {
    let act = new Date;
    let hrs = act.getHours();
    let mins = act.getMinutes()
    let newTime = `${hrs}:${mins}`
    if (newTime == time ) {
      alert('Time up')
      // audio.play();
      // audio.loop = true;
    }

  }
  
  
  function dellAll() {
    localStorage.removeItem("todoo");
    setTodo([...todo])
    location.reload()
   
  }

  return (
    <div className="App">
      <main>
        {/* <audio src="audio1.mp3" controls id='audio'></audio> */}
       <div className='todolist'>Todo List</div>
       <div className='pendding'><div className='div-pending'>You have {todo.length<1 ? 'no' : todo.length} pending{todo.length>1? 's': ''}</div> <div className='div-clear'onClick={dellAll}>Clear All</div></div>
       <div className='inputdiv'>
        <input type="text" id='titlle' className='titleinp' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" id='decp' className='decsinp' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="Time"  className='timeinp' id='timee' value={time} onChange={(e) => setTime(e.target.value)} />
        <button onClick={Add} className='submi'>ADD</button>
       </div>
       { todo &&  
         todo.map((value, index) => 
         <div className='coverr' key={index}>
             <input type="checkbox" className='checkkbox' />
             {edittodo === index ? <div className='titlee'><input type="text" id='editinputt'value={edittitle} onChange={(e) => setEdittitle(e.target.value)} /></div> : <div className='titlee'>{value.title}</div> }
             {edittodo === index ? <div className='titlee'><input type="text" id='editinputt'value={editdescription} onChange={(e) => seteditDescription(e.target.value)} /></div> : <div className='decp'>{value.description}</div> }                         
             <div className='timmee'>{value.time}</div>
             {edittodo === index ?  <button className='ediit'onClick={() => Done(index)}>Done</button> : <button className='ediit'onClick={() => setedittodo(index)}>Edit</button> }
             
             <button className='ediit' onClick={() => deletee(index)}>Del</button>
        </div>
 
        )
       }
      </main>
    </div>
  )
}

export default App
