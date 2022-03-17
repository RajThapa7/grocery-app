import React, { useState, useReducer, useEffect } from "react";
import Modal from "./modal"
import reducer from './reducer'

export default function Item() {
    const initialState = {
        list: [],
        isModalOpen: false,
        modalContent:"",
    }
  const [grocery, setGrocery] = useState("");
const [state, dispatch] = useReducer(reducer, initialState);
//
const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const editItem = (id) => {
    const specificItem = state.list.find((item) => item.id === id);
    setGrocery(specificItem.grocery) 
    setIsEditing(true);
    setEditID(id);
 };
  //

const handleSubmit = (e)=>{
    e.preventDefault();
    if(grocery){
        const newItem = { id: new Date().getTime().toString(),grocery };
        dispatch({type: "ADD_ITEM", payload: newItem});
        setGrocery("");
    }
    else if(grocery && state.isEditing){ 
        setIsEditing(false);

    }
    else{
        dispatch({type: "EMPTY"});
    }
}
const closeModal = ()=>{
    dispatch({type: "CLOSE_MODAL"});
}
useEffect(() => {
    localStorage.setItem('state.list', JSON.stringify(state.list));
  }, [state.list]);
  return (
    <>
{state.isModalOpen &&(
    <Modal modalContent={state.modalContent} closeModal = {closeModal} />
) }
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          value={grocery}
          onChange={(e) => setGrocery(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      {
          state.list.map((item)=>{
              return(
                  <div key={item.id}>
                      <p>{item.grocery}</p>
                      <button
              onClick={() => {
                dispatch({ type: "REMOVE_ITEM", payload: item.id });
              }}
            >
              Remove
            </button>
            <button
              onClick={() => {
                dispatch({ type: "EDIT_ITEM", payload: item.id});
                editItem(item.id)
              }}
            >
              Edit
            </button>
                  </div>
              )
          })
      }
      <button onClick={()=>{
          dispatch({type: "CLEAR_ALL"});
      }}>Clear All</button>


    </>
  );
}
