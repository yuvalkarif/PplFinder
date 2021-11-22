import { useEffect, useState } from "react";
const initialCountries = [
  { value: "BR", label: "Brazil", isChecked: false },
  { value: "AU", label: "Australia", isChecked: false },
  { value: "CA", label: "Canada", isChecked: false },
  { value: "DE", label: "Germany", isChecked: false },
  { value: "NZ", label: "New Zealand", isChecked: false },
];
export const useCountries = () => {
  //Converted each country checkbox values to array of values in state to follow if its checked
  //and to be able to add as many countries as you wish.
  const [countries, setCountries] = useState(initialCountries);
  const [checkedNats, setCheckedNats] = useState([]);
  useEffect(() => {
    // Updating (inner) Checked Nats array used to Evaluate if there is a need to update the main one.
    if (countries) {
      setCheckedNats(
        countries.flatMap((country) => {
          return country.isChecked ? country.value : [];
        })
      );
    }
  }, [countries]);

  const handleCheckBox = (value) => {
    // Updating object checked in arr
    const newCountries = countries.slice();
    countries.forEach((element, i) => {
      if (element.value === value) {
        newCountries[i] = { ...element, isChecked: !element.isChecked };
      }
    });
    setCountries(newCountries);
  };

  return [countries, checkedNats, handleCheckBox];
};
