const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newList = [...state.list, action.payload];
    return {
      ...state,
      list: newList,
      isModalOpen: true,
      modalContent: "Item added to your list",
    };
  }
  if (action.type === "EMPTY") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Please enter an item",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const newList = state.list.filter(
      (item) => item.id !== action.payload
    );
    return { ...state, list: newList };
  }
  //
  if(action.type === "EDIT_ITEM"){
    const newList = state.list.filter((item) => item.id !== action.payload);
    return{
        ...state,
        list: newList,
        isModalOpen: true,
        modalContent: 'value changed',
    }
  }
//

  if(action.type === "CLEAR_ALL"){
      return{
          ...state,
          list:[],
          isModalOpen: true,
          modalContent: "List cleared"
      }
    }
  throw new Error("no matching action type");
};


export default reducer;