import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProductList from './components/ProductList.jsx';
import CartPage from './pages/CartPage.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';


function StorefrontLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="content-grid">{children}</main>
    </div>
  );
}

function App() {
  //callback
  const users = [
    { id: 1, name: "Ali", age: 22, isActive: true },
    { id: 2, name: "Ahmed", age: 17, isActive: false },
    { id: 3, name: "Usman", age: 25, isActive: true },
    { id: 4, name: "Hamza", age: 19, isActive: true },
    { id: 5, name: "Bilal", age: 16, isActive: false }
  ];


  const [custormers, setCustormers] = useState([
    {
      name: "Ali",
      age: 12,
      accountNo: 123,
      balance: 1000,
    },
    {
      name: "Yaseen",
      age: 13,
      accountNo: 124,
      balance: 2000
    },
    {
      name: "Raziq",
      age: 14,
      accountNo: 125,
      balance: 2000,
    },
    {
      name: "Nabeel",
      age: 15,
      accountNo: 126,
      balance: 1500
    },
    {
      name: "Safeer",
      age: 16,
      accountNo: 127,
      balance: 1600
    }
  ])

  // useEffect(() => {
  //   const socket = io("http://localhost:3000");
  //   const handleConnect = () => {
  //     console.log('connected', socket.id);
  //     socket.emit("send_message", {
  //       message: "Hello",
  //       sender: "Aziz"
  //     });
  //   };
  //   const handleMessage = (data) => {
  //     console.log("messaage recieved", data);
  //   };

  //   socket.on('connect', handleConnect);
  //   socket.on("recieve_message", handleMessage);

  //   return () => {
  //     socket.off('connect', handleConnect);
  //     socket.off("recieve_message", handleMessage);
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    custormers.forEach((customer) => {
      console.log("customer", customer);
    });
  }, [custormers]);

  const bank = "NBP"; const branch = "ABC"; const timeOpen = "09:00"; const timeClose = "12:00";


  const depositMoney = (customer, amount) => {
    console.log("Increase clicked")
    console.log("amount come", amount)
    setCustormers((prevCart) => {
      return prevCart.map((item) => item.name === customer ? { ...item, balance: item.balance + amount } : item)


    }
    )
  }

  const withDrawMoney = (customer, amount) => {
    console.log("running website");
    setCustormers((prevCart) => {
      
      const filterClient = prevCart.find((custom) => custom.name === customer)
      console.log("filterclient", filterClient);
      if (filterClient.balance > amount) {
        console.log("filterclient work");
        return prevCart.map((item) => {
            return  item.name === customer ? {...item, balance : item.balance - amount} : item
        })
      }
      return prevCart

    })
  }

  const getData = () => {
    const mynew = users.map((x) => x.id === 1 ? { ...x, name: "Usman" } : x);
    console.log("mynew", mynew);
  };

  getData();

  const processUser = (users, callback) => {
    const result = callback(users);
    result.forEach((student) => {
      console.log(student.name);
    });
  };

  processUser(users, (users) => {
    const resultArray = users.filter((man) => man.isActive === true && man.age > 18);
    return resultArray;
  });

  function myfunction() {
    let x = 0;
    console.log("This is very important concept");
    return {
      add: function () {
        x++;
        console.log("my x is working great", x);
      }
    };
  }

  const fetch = myfunction();

  fetch.add();
  fetch.add();
  fetch.add();

  console.log("This is very important function");

  // closures
  const createAccount = (inatialBalance) => {
    let balance = inatialBalance;

    return {
      withdraw: function (amount) {
        if (amount > balance) {
          console.log("Insufficient balance");
        } else if (amount < 0) {
          console.log("Add proper Amount");
        } else {
          balance = balance - amount;
          console.log("reduce amount", amount);
        }
      },

      deposite: function (amount) {
        if (amount <= 0) {
          console.log("Add proper amount");
        } else {
          balance = balance + amount;
          console.log("add amount", amount);
        }
      },

      getbalance: function () {
        console.log("get all amount", balance);
      }
    };
  };

  const account = createAccount(2500);

  account.getbalance();
  account.withdraw(750);
  account.deposite(820);
  account.getbalance();

  //
  const arr = [10, 20, 30, 40, 50];

  //map:
  const newarr = arr.map((item) => item * 3);
  console.log("map", newarr);

  const filterarr = arr.filter((item) => item > 30);
  console.log("filter arr", filterarr);

  const findarr = arr.find((item) => item === 40);
  console.log("findarr", findarr);

  arr.forEach((item) => console.log("foreachitem", item * 2));

  const numbers = [10, 15, 20, 25, 30, 35];

  const taskarr = numbers.filter((number) => number > 20);
  const updatearr = taskarr.map((task) => task * 2);

  console.log("taskarr", updatearr);

  const user = {
    name: "Ali",
    age: 25,
    address: {
      city: "Peshawar",
      country: "Pakistan"
    }
  };

  console.log("name access", user.name);
  console.log("name access2", user["name"]);
  console.log("peshawer access", user.address.city);

  user.address.email = "ahmad@gmail.com";

  for (let use in user) {
    console.log(use, ":", user[use]);
  }

  return (


    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<StorefrontLayout><ProductList depositMoney={depositMoney} customers={custormers} withDrawMoney={withDrawMoney}/></StorefrontLayout>} />
            <Route path="/cart" element={<StorefrontLayout><CartPage /></StorefrontLayout>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
