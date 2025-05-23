import { useState } from 'react';
import './App.css'

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const[friends,setFriends]=useState([])
  const[showAddFriend, setShowAddFriend]=useState(false)

  function handleShowAddFriend (){
    setShowAddFriend((show)=>!show)
  }

  function handleAddFriend(friend){
    setFriends((friends)=>[...friends, friend])
  }

 return (
   <div className='app'>
    <div className='sidebar'>
      <FriendsList friends={friends}/>
      {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/> }
      <Button onClickOpen={handleShowAddFriend}>{showAddFriend ? 'Close':'Add Friend'}</Button>
    </div>
    <FormSplitBill/>
   </div>
  )
}

function FriendsList ({friends}){
  return (
    <ul>{friends.map((friend)=>(
     <Friend friend={friend} key={friend.id}/>
    ))}</ul>
  )
}

function Friend ({friend}){
  return (
    <li>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance<0 && (<p className='red'>You owe {friend.name} {Math.abs(friend.balance)}</p>)}
      {friend.balance>0 && (<p className='green'>{friend.name} owes you {Math.abs(friend.balance)}</p>)}
      {friend.balance===0 && (<p>You and {friend.name} are even</p>)}
    <Button>Select</Button>
      </li>
  )
}

function Button ({children, onClickOpen}){
  return (
    <button className='button' onClick={onClickOpen}>{children}</button>
  )
}

function FormAddFriend({onAddFriend}){
  const[name,setName]=useState('')
  const[image,setImage]=useState("https://i.pravatar.cc/48?u=499476")

  function handleSubmit(e){
    e.preventDefault();

    if(!name||!image) return

    const id = crypto.randomUUID()
    const newFriend ={
      id,
      name,
      image:`${image}?=${id}`,
      balance:0,
    
    }

    onAddFriend(newFriend)

    setName('')
    setImage("https://i.pravatar.cc/48?u=499476")
  }

  return(
    <form className='form-add-friend'>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
      <label>🌄 Image URL</label>
      <input type='text' value={image} onChange={(e)=>setImage(e.target.value)}/>
       <Button onClickOpen={handleSubmit}>Add</Button>
    </form>
  )
}

function FormSplitBill (){
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with X</h2>
      <label>💰Bill value</label>
      <input type='text'/>
      <label>🧍‍♂️Your expense</label>
      <input type='text'/>
      <label>🧑‍🤝‍🧑X's expense</label>
      <input type='text'/>
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>x</option>
      </select>
       <Button>Split bill</Button>

    </form>
  )
}


export default App
