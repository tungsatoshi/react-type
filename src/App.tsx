import "./App.css";

// type

/**
 * Kieu du lieu don gian: number, string, boolean, null, undefined, void, any
 * Kieu du lieu phuc tap: object, array
 */

let myAge: number = 30;
myAge = 31;
console.log(myAge);

// let isLogged: boolean = false;

function Login(isLogged: boolean): void {
  if (isLogged) {
    console.log("Ban da dang nhap thanh cong!");
  } else {
    console.log("Ban chua dang nhap!");
  }
}

function App() {
  // <></> fragment
  return (
    <>
      <button onClick={() => Login(true)}>Dang nhap</button>
    </>
  );
}

export default App;
