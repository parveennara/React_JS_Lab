import { useState, useEffect } from "react";
import { getItems } from "../services/items";
import IItem from "../models/IItem";
import AddExpense from "./AddExpense";

function ShowExpenses() {

  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [sum, setSum] = useState<number | null>()
  const [rahulSpent, setRahulSpent] = useState<number>(0)
  const [rameshSpent, setRameshSpent] = useState<number>(0)

  let rahulSpent1 = 0;
  let rameshSpent1 = 0;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getItems();
        setItems(data);
        setSum(data.reduce((result, v) => result = result + v.price, 0));
        Shares(data);
      }

      catch (error: any) {
        setError(error)
      }
    }
    getData();
  },
    [showForm]
  );

  const Shares = (data: IItem[]) => {

    rahulSpent1 = 0
    rameshSpent1 = 0

    data.map(
      sams => (
        sams.payeeName === "Rahul" ? (
          rahulSpent1 = rahulSpent1 + sams.price
        ) :
          (
            rameshSpent1 = rameshSpent1 + sams.price
          )
      )
    )
    setRahulSpent(rahulSpent1)
    setRameshSpent(rameshSpent1)
  }

  const success = () => {
    setShowForm(false)
  }
  const cancel = () => {
    setShowForm(false)
  }


  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
      {
        showForm && (
          <div className="form">
            <AddExpense onTrue={success} onClose={cancel} />
          </div>
        )
      }
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
      </>
      {
        items && (
          items.map(
            (user, idx) => {
              return (
                <div key={idx}>
                  <div className="use-inline date">{user.setDate}</div>
                  <div className="use-inline">{user.product}</div>
                  <div className="use-inline price">{user.price}</div>
                  <div className="use-inline" style={{ width: 112 }}>{user.payeeName}</div>
                </div>
              )
            }
          )
        )
      }
      <hr></hr>
      <div className="use-inline ">Total: </div>
      <span className="use-inline total">{sum}</span> <br />
      <div className="use-inline ">Rahul paid: </div>
      <span className="use-inline total Rahul">{rahulSpent}</span> <br />
      <div className="use-inline ">Ramesh paid: </div>
      <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
      <span className="use-inline payable">{rahulSpent > rameshSpent ? "Pay Rahul " : "Pay Ramesh"}</span>
      <span className="use-inline payable price"> {Math.abs((rahulSpent - rameshSpent) / 2)}</span>


    </>

  )

}

export default ShowExpenses;