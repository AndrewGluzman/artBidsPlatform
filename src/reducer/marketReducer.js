const stateInit = {
  carts_ar: [],
  name: "moshe",
  showCart:false
}


export const marketReducer = (state= stateInit , action) => {
  switch (action.type){
    case "SHOW_HIDE_CART":
      // saveToLocal שומר את זה בהתחלה בלוקאל ואז משגר את הסטטיט
      return saveToLocal({...state, showCart:action.flag})
    break;
    case "UPDATE_THE_CART":
      return saveToLocal(addToCart(state,action));
    break;
    default:
    // check if there localstorage and update itself
      return (localStorage["market"]) ? JSON.parse(localStorage["market"]) : state;
    break
  }
}

const addToCart = (state,action) => {
  // נבדוק אם המוצר נמצא
  // אם המוצר נמצא אנחנו פשוט נעדכן את הקאונט לקאונט שנשלח בשיגור האחרון
  // ואם לא אנחנו נוסיף את המוצר לתוך המערך
  // אם שקר יבצע פעולה הוספה למערך אם אמת יעדכן את הקאונט
  let prodFound = false;
  let temp_ar = [...state.carts_ar]
  temp_ar.map((item , i) => {
    if(item._id == action.item._id){
      item.count = action.item.count;   
      prodFound = true; 
    }
  })
  if(!prodFound) {
    temp_ar.push(action.item)
  }
  return {...state, carts_ar:temp_ar}

}


const saveToLocal = (stateTOSave) => {
  localStorage.setItem("market", JSON.stringify(stateTOSave));
  return stateTOSave;
}