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

  return (
    <div className="react-autocomplete">
      <div className="autocomplete-chip"></div>
      <input
        type="text"
        placeholder="Search Something!"
        onChange={(e) => setInputVal(e.target.value)}
      />
      <div className="autocomplete-listBox">
        <ul>
          {suggestions?.length
            ? suggestions?.map((item) => (
                <li key={item?.email}>
                  {item?.firstName} {item?.lastName}
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
