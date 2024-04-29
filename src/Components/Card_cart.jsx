import React, { useContext } from "react";
import { cartStatus } from "../Layouts/Layout";

const Card_cart = () => {
  const { cartData, setCartData, setGrandTotal, itemIDSelected, setItemIDSelected } = useContext(cartStatus);

  
  const changeQuantity = (operator, user) => {
    const userID = user.id
    const element = document.getElementById(`${userID}`)
    const stmt = element.innerHTML
    const currQunatity = +stmt.substring(stmt.indexOf(' ')+1)
    // console.log("currQuantity:",currQunatity)
    let newQuantity = 0
    if(operator === '-') {
      newQuantity = currQunatity-1;
      if(newQuantity <= 0) {
        newQuantity = 0;
        deleteItem(user);
      }
      element.innerHTML = `Quantity: ${newQuantity}`
    }
    else {
      newQuantity = currQunatity+1; 
      element.innerHTML = `Quantity: ${newQuantity}`
    }
    user.quantity = newQuantity
    setGrandTotal(0)
  }

  const deleteItem = (user) => {
    const array = [...cartData]
    const newArray = array.filter(element=>element.id !== user.id)
    const array2 = [...itemIDSelected.filter(element=>element !== user.id)]
    setItemIDSelected(array2)
    setCartData(newArray)
    setGrandTotal(0)
  }
  
  return (
    <>
      {cartData.map((user) => (
        <div key={user.id} className="flex flex-row gap-4 bg-amber-500 rounded-lg shadow-md shadow-white ring-2">
          <img src={user.image} alt="" className="h-[400px] ml-4 my-4" />
          <div className="flex flex-col bg-white py-10 px-4 justify-between">
            <h1 className="text-5xl font-bold text-center">{user.firstName + " " + user.lastName}</h1>
            <div className="bg-gradient-to-r from-transparent via-amber-500 to-transparent w-full h-[2px]"></div>
            <p className="text-sm mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              asperiores. Dolorem perspiciatis delectus tempora aliquam incidunt
              illo exercitationem a ducimus. Mollitia cum dolorem nostrum odit
              voluptatem itaque molestias ipsam aspernatur.Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Natus, asperiores. Dolorem
              perspiciatis delectus tempora aliquam incidunt illo exercitationem
              a ducimus. Mollitia cum dolorem nostrum odit voluptatem itaque
              molestias ipsam aspernatur.Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Natus, asperiores. Dolorem perspiciatis delectus
              tempora aliquam incidunt illo exercitationem a ducimus. Mollitia
              cum dolorem nostrum odit voluptatem itaque molestias ipsam
              aspernatur.Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Natus, asperiores. Dolorem perspiciatis delectus tempora
              aliquam incidunt illo exercitationem a ducimus. Mollitia cum
              dolorem nostrum odit voluptatem itaque molestias ipsam aspernatur.
            </p>
            <div className="flex flex-row justify-between items-center mt-12 gap-10 px-4">
              <span className="text-amber-500 text-3xl font-extrabold">
                Rs. {user.cost}
              </span>
              <div className="flex flex-row gap-1">
                <button className="bg-sky-500 py-2 px-4 text-sm font-bold rounded-l-lg hover:bg-teal-600" onClick={()=>changeQuantity('-', user)}>-</button>
                <button id={`${user.id}`} className="bg-sky-500 py-2 px-4 text-lg font-bold">Quantity: {user.quantity}</button>
                <button className="bg-sky-500 py-2 px-4 text-sm font-bold rounded-r-lg hover:bg-teal-600" onClick={()=>changeQuantity('+', user)}>+</button>
              </div>
              <button className="flex flex-row justify-between items-center font-bold gap-4 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"  onClick={()=>deleteItem(user)}>
                Remove<span className="text-2xl font-bold">-</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card_cart;
