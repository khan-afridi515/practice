import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProductList from './components/ProductList.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './App.css';
import Cart from './pages/cart.jsx';

function App() {


  //callback
  const users = [
    { id: 1, name: "Ali", age: 22, isActive: true },
    { id: 2, name: "Ahmed", age: 17, isActive: false },
    { id: 3, name: "Usman", age: 25, isActive: true },
    { id: 4, name: "Hamza", age: 19, isActive: true },
    { id: 5, name: "Bilal", age: 16, isActive: false }
  ];

  const processUser = (users, callback) => {
    const result = callback(users)
    result.forEach((student) => {
      console.log(student.name)
    })

  };

  processUser(users, (users) => {
    const resultArray = users.filter((man) => man.isActive === true && man.age > 18)
    return resultArray;
  })

  // closures
  const createAccount = (inatialBalance) => {
    let balance = inatialBalance;

    return {
      withdraw: function (amount) {
        if (amount > balance) {
          console.log("Insufficient balance")
        } else if (amount < 0) {
          console.log("Add proper Amount")
        } else {
          balance = balance - amount
          console.log("reduce amount", amount)
        }
      },

      deposite: function (amount) {
        if (amount <= 0) {
          console.log("Add proper amount")
        } else {
          balance = balance + amount;
          console.log("add amount", amount)
        }
      },

      getbalance: function () {
        console.log("get all amount", balance);
      }
    }
  }

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

  const filterarr = arr.filter((item) => item > 30)
  console.log("filter arr", filterarr);

  const findarr = arr.find((item) => item === 40)
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

  for(let use in user){
    console.log(use, ":", user[use])
  }

  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="app-shell">
            <Navbar />

            <main className="content-grid">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <ProductList />
                    </>
                  }
                />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
