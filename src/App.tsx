import {TodoList} from "./TodoList"

function App() {
  

  return (
   
      <div className="main-container">
        
        <h1><TodoList/></h1>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
          
        </ul>
        <input type="text" placeholder="add todo item" />
        <button>Add</button>
      </div>
        
    
  )
}

export default App
