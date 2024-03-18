import React, { useState, useEffect } from "react";
import { addStyle } from "../../utils/addStyle";
import { AUTOCOMPLETE_OPTIONS } from "./AutoComplete.constant";
import {
  AutocompleteArrayChildrenType,
  AutocompleteArrayType,
} from "./Autocomplete.type";

const Autocomplete: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [options, setOptions] = useState<AutocompleteArrayType>([]);
  const [selectedOptions, setSelectedOptions] = useState<AutocompleteArrayType>(
    []
  );

  const style = ` 
      .react-autocomplete{
        width:50%;
      }
      .autocomplete-input{
        display:flex;
        flex-wrap:wrap;
        border:1px solid whitesmoke;
        border-radius:6px;
        padding:4px 8px;
        min-height:36px;
      }
      .autocomplete-chip{
        display: flex;
        gap: 4px;
      }
      .autocomplete-chip .chip{
        background: whitesmoke;
        border-radius:16px;
        padding:4px;
        display:flex;
        align-items:center;
        gap:8px;
      }
      .autocomplete-chip .chip .remove-icon{
        cursor:pointer;
        padding:4px;
      }
      .autocomplete-chip .chip .remove-icon:hover{
        background:rgba(0,0,0,0.1);
        border-radius:50%;
      }
      .react-autocomplete input{
          flex:1;
          font-size:16px;
          border-radius:6px;
          border:none;   
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
        box-sizing: border-box;
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

  useEffect(() => {
    if (inputVal) {
      const data = AUTOCOMPLETE_OPTIONS?.filter((item) =>
        item?.label.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase())
      );
      setOptions(data);
    } else {
      setOptions(AUTOCOMPLETE_OPTIONS);
    }
  }, [inputVal]);

  useEffect(() => {
    addStyle(style);
  }, []);

  const handleSelect = (item: AutocompleteArrayChildrenType) => {
    setInputVal("");
    setSelectedOptions((prev) => [...prev, item]);
  };

  const handleRemove = (item: AutocompleteArrayChildrenType) => {
    const filteredData = selectedOptions?.filter(
      (opt) => opt?.label !== item?.label
    );
    setSelectedOptions(filteredData);
  };

  return (
    <div className="react-autocomplete">
      <div className="autocomplete-input">
        <div className="autocomplete-chip">
          {selectedOptions?.length
            ? selectedOptions?.map((item: AutocompleteArrayChildrenType) => (
                <div className="chip">
                  <div>{item?.label}</div>
                  <div
                    className="remove-icon"
                    onClick={() => handleRemove(item)}>
                    x
                  </div>
                </div>
              ))
            : ""}
        </div>
        <input
          type="text"
          value={inputVal}
          placeholder="Search Something!"
          onChange={(e) => setInputVal(e.target.value)}
        />
      </div>
      <div className="autocomplete-listBox">
        <ul className="autocomplete-list">
          {options?.length
            ? options?.map(
                (item: AutocompleteArrayChildrenType, index: number) => (
                  <li key={index} onClick={() => handleSelect(item)}>
                    {item?.label}
                  </li>
                )
              )
            : "No data found"}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
