import { useRef, useState } from "react";
import React from "react";
import { useEffect } from "react";
import Select from "react-select";

interface Props {
  options: any;
  name: string;
  onChange: (item: any) => void;
  handleClearGenData: (item: any) => void;
  index: string | number;
  error: string;
  floatLabel: string;
  placeholder: string;
  isDisabled: boolean;
  value: string;
  noClearButton: boolean;
  focusValue: any;
  focusKey: any;
  focusList: any;
  onChangeList: (item: any) => void;
}

export default function SearchSelector({
  options,
  name,
  onChange,
  handleClearGenData,
  index,
  error,
  floatLabel,
  placeholder,
  isDisabled,
  value,
  noClearButton,
  focusValue,
  focusKey,
  focusList,
  onChangeList,
}: Props) {
  // const searchInput = useRef();
  const [valueObj, setValueObj] = useState(value);

  const handleChange = (newValue, meta) => {
    setValueObj(newValue);
    const label = meta.name;

    onChange(newValue);
    if (!newValue?.value) {
      setIsFloat(false);
    } else {
      setIsFloat(true);
    }
  };
  const [isFloat, setIsFloat] = useState(valueObj);
  function setLabel() {
    if (!valueObj) {
      setIsFloat(true);
    }
  }

  useEffect(() => {
    if (!value) {
      onChange("", name);
      setValueObj("");
    } else {
      setValueObj(value);
    }
  }, [value]);

  // useEffect(() => {
  //   setValueObj(value || "")
  // },[value])

  // focusValue && (options?.find(list => (list.ele[focusKey] == focusValue)))
  return (
    <div className="relative w-full">
      <Select
        // defaultValue={{ value: value, label: value }}
        id="floating"
        options={focusList?.length ? focusList : options}
        onChange={handleChange}
        onClear={() => {
          handleClearGenData(index, name);
        }}
        onInputChange={(val, e) => {
          if (e.action == "menu-close") return;
          if (onChangeList) {
            onChangeList(val);
          }
        }}
        name={name}
        placeholder={!floatLabel ? placeholder || "" : ""}
        value={valueObj}
        backspaceRemovesValue
        // menuPortalTarget={document.body}
        menuPosition={"fixed"}
        menuPlacement="auto"
        isDisabled={isDisabled}
        isClearable={noClearButton ? false : true}
        styles={{
          // control: (baseStyles, state) => (console.log(state)),
          control: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",
            borderColor:
              !isDisabled && error ? "red" : state.isHovered && "initial",
            // background: isDisabled && '#E5E7EB',
            "*": {
              boxShadow: "none !important",
            },
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            border: "none",
          }),
          // option: (styles, { isFocused, isSelected, data }) => ({
          //   ...styles,
          //   // background: data[focusKey] == focusValue
          //   background: focusList?.length && '#F3FFEF'
          // }),
          // menuPortal: (base) => ({ display: onChangeList && !valueObj && "none" })
        }}
        onMenuOpen={setLabel}
        onMenuClose={() => !valueObj && setIsFloat(false)}
        // components={{ DropdownIndicator, IndicatorSeparator: null }}
        // controlShouldRenderValue={false}
      />
      <label
        htmlFor="floating"
        className={`${floatLabel ? "absolute" : "hidden"} ${
          floatLabel == "top"
            ? "top-[.25em] bg-white text-inherit text-[16px]"
            : isFloat
            ? "top-[.25em] bg-white"
            : "top-[1.25em] text-lg"
        } px-2 text-gray-500  duration-300 transform -translate-y-4 scale-75  origin-[0]  peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
      >
        {placeholder}
      </label>
    </div>
  );
}
