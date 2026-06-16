import { useEffect } from "react";
import { useState } from "react";

export const useLocalstorage = (key, initialValue = []) => {
  // state start value wil depend on if there is anything stored in localstoarge,
  //if yes, retrive data and set as startvalue, if not start with "initialValue"
  const [value, setValue] = useState(() => {
    // try to retrive data from localstoarge
    try {
      const storedValue = localStorage.getItem(key);
      // if key contains data, return parsed data
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      // if no data is found, return initial value (empty array by default)
      return initialValue;
    } catch (error) {
      //if retrival from lovalstorage fails, log error
      console.error(
        " could not rertrive data from localstorage, error: ",
        error,
      );
      return initialValue;
    }
  });

  // useeffect that updates state when value or key is changed
  useEffect(() => {
    //tries to write to localStorage, if successfull write strigyfied version of value
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // if unsuccessfull, log error
      console.error("could not write to localstorage, error:", error);
    }
    // do this whenever key or value changes
  }, [key, value]);

  // return state variable and setter function
  return [value, setValue];
};
