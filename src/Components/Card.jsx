import {
  React,
  useState,
  useEffect,
  useContext,
} from "react";
// import defaultImage from "../Assests/Images/Group 1572.svg";
import { cartStatus } from "../Layouts/Layout";

const Card = () => {
  const [userDetails, setUserDetails] = useState([]);
  const {
    cartData,
    setCartData,
    itemIDSelected,
    setItemIDSelected,
    setGrandTotal,
    grandTotal,
    setMsg,
  } = useContext(cartStatus);

  const userList = [
    {
      id: 0,
      username: "atuny0",
      password: "9uQFF1Lh",
      cost: 100,
    },
    {
      id: 2,
      username: "hbingley1",
      password: "CQutx25i8r",
      cost: 70,
    },
    {
      id: 3,
      username: "rshawe2",
      password: "OWsTbMUgFc",
      cost: 100,
    },
    {
      id: 4,
      username: "yraigatt3",
      password: "sRQxjPfdS",
      cost: 80,
    },
    {
      id: 1,
      username: "kminchelle",
      password: "0lelplR",
      cost: 80,
    },
  ];

  console.log("cartdata inside card.jsx", cartData);
  console.log('grandtotal:',grandTotal)

  const fetchFunction = async (user) => {
    return new Promise((resolve, reject) => {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            console.log("error", res.status);
            reject(res.status);
          }
          const data = await res.json();
          resolve(data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  const fetchUser = async () => {
    const userPromise = userList.map(
      async (element) => await fetchFunction(element)
    );
    // console.log("userPromise54:",userPromise)
    const userData = await Promise.all(userPromise);
    // console.log("userData55:",typeof userData)
    // console.log("...userData",...userData)
    setUserDetails(userData.filter(Boolean));
    upgradeUserInfo();
  };

  const upgradeUserInfo = () => {
    for (let i = 0; i < userDetails.length; i++) {
      userDetails[i]["id"] = userList[i]["i"];
      userDetails[i]["cost"] = userList[i]["cost"];
      userDetails[i]["quantity"] = userList[i]["quantity"];
    }
    // console.log("upgraded userDetails:", userDetails);
  };

  // const keepDisbled = () => {
  //   for(let id in itemIDSelected)
  //     document.getElementById(`button-user-${id}`)?.setAttribute("disabled", true);
  // }

  useEffect(() => {
    fetchUser();
  }, []);

  const calculateAmount = (array) => {
    let amount = 0;
    for (let i = 0; i < array.length; i++)
      amount += array[i].quantity * array[i].cost;
    setGrandTotal(amount);
    setMsg(`Grand Total: ${amount}`);
  };

  const updateCartData = (user, cost) => {
    const array = [...cartData];
    user["cost"] = cost;
    user["quantity"] = 1;
    array.push(user);
    setCartData(array);
    calculateAmount(array);
  };

  const addItemID = (id) => {
    const array = [...itemIDSelected];
    array.push(id);
    setItemIDSelected(array);
  };

  const deleteItemID = (id) => {
    const array = [...itemIDSelected.filter(element => element !== id)]
    setItemIDSelected(array);
  };

  const deleteItem = (user) => {
    const array = [...cartData];
    const newArray = array.filter(element=>element.id !== user.id);
    setCartData(newArray);
    calculateAmount(newArray);
  }

  return (
    <>
      {userDetails.map((user, index) => (
        <div
          key={userList[index].id}
          className="bg-white flex flex-col p-1 rounded-md shadow-md shadow-white"
        >
          <img
            src={user.image}
            alt=""
            className="h-[300px] mb-4 bg-amber-500 rounded-md"
          />
          <div className="flex flex-col gap-2 px-4 py-1">
            <h1 className="text-3xl font-bold text-center">
              {user.firstName + " " + user.lastName}
            </h1>
            <div className="bg-gradient-to-r from-transparent via-amber-500 to-transparent w-full h-[2px]"></div>
            <p className="text-sm mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              asperiores. Dolorem perspiciatis delectus tempora aliquam incidunt
              illo exercitationem a ducimus. Mollitia cum dolorem nostrum odit
              voluptatem itaque molestias ipsam aspernatur.
            </p>
          </div>
          <div className="flex flex-row justify-between items-center mt-12 gap-10 px-4">
            <span className="text-amber-500 text-3xl font-extrabold">
              Rs. {userList[index].cost}
            </span>
            {itemIDSelected.includes(user.id) ? (
              <button
                id={`button-user-${user.id}`}
                onClick={()=>{deleteItem(user); deleteItemID(user.id)}}
                className="flex flex-row justify-between items-center font-bold gap-4 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Remove<span className="text-2xl font-bold">-</span>
              </button>
            ) : (
              <button
                id={`button-user-${user.id}`}
                onClick={() => {
                  updateCartData(user, userList[index].cost);
                  addItemID(user.id);
                }}
                className="flex flex-row justify-between items-center font-bold gap-4 px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 text-white"
              >
                Add to cart
                <span className="text-2xl font-bold">+</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
