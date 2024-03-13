import React, { useState, useEffect } from "react";

const API = "https://dummyjson.com/users/search?q=";

const Autocomplete: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [options, setOptions] = useState<Array<string>>([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      if (inputVal.trim() === "") {
        setSuggestions([]);
      }
      fetch(API + inputVal)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.users))
        .catch((error) => console.log(error));
    };
    fetchUsers();
  }, [inputVal]);

  useEffect(() => {
    addStyle();
  }, []);

  const chip = ["nitin", "hello"];

  return (
    <div className="react-autocomplete">
      <div className="autocomplete-input">
        <div className="autocomplete-chip">
          {chip?.length
            ? chip?.map((item) => <div className="chip">{item}</div>)
            : ""}
        </div>
        <input
          type="text"
          placeholder="Search Something!"
          onChange={(e) => setInputVal(e.target.value)}
        />
      </div>
      <div className="autocomplete-listBox">
        <ul className="autocomplete-list">
          {suggestions?.length
            ? suggestions?.map((item) => (
                <li key={item?.email}>
                  {item?.firstName} {item?.lastName}
                </li>
              ))
            : ""}
          w
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;

const addStyle = () => {
  const Autocomplete = ` 
      .react-autocomplete{
        width:50%;
      }
      .autocomplete-input{
        position:relative;
        display:flex;
        flex-wrap:wrap;
      }
      .autocomplete-chip{
        position: absolute;
        top: 4px;
        left: 8px;
        display: flex;
        gap: 4px;
      }
      .autocomplete-chip .chip{
        background: whitesmoke;
        border-radius:16px;
        padding:4px;
      }
      .react-autocomplete input{
          font-size:16px;
          border-radius:6px;
          border:0.5px solid grey;   
          width:100%;
          padding: 4px 8px;
          box-sizing: border-box;
      }
      .react-autocomplete input:focus{
        outline:none;
      }
      .autocomplete-listBox{
        width:100%;
        margin-top:4px;
        border-radius:4px;
        box-shadow:0 0 2px rgba(0,0,0,0.1);
        padding: 4px;
      }
      .autocomplete-list{
        list-style: none;
        padding: 0 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 16px;
      }
      .autocomplete-list li{
        padding:4px;
      }
      .autocomplete-list li:hover{
        background:rgba(0,0,0,0.1);
        border-radius:6px;
        cursor:pointer;
      }
      `;
  const styled = document.createElement("style");

  styled.innerHTML = Autocomplete;
  document.head.appendChild(styled);
};
