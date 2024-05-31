import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Virtuoso } from "react-virtuoso";
import { ImSpinner8 } from "react-icons/im";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Props {
  value: string;
  name: string;
  id: string;
  disabled?: boolean;
  label?: string;
  height?: string;
  error?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
  isLoading?: boolean;
  isClear?: boolean;
  readOnly?: boolean;
}

export default function InputDropdownSearch2({
  value,
  name,
  id,
  disabled = false,
  label,
  height,
  error,
  placeholder,
  isRequired,
  onChange,
  options = [],
  isLoading = false,
  isClear = false,
  readOnly = false,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const drpodownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  //   const users = useMemo(() => {
  //     return Array.from({ length: 2001 }, (_, index) => ({
  //       label: `User ${index}`,
  //       value: Math.floor(Math.random() * 40) + 100 + index,
  //     }));
  //   }, []);

  const [users, setUsers] = useState([]);

  async function initData() {
    const res = await axios.get<{ data: { id: number; name: string }[] }>(
      "https://jsonplaceholder.typicode.com/users"
    );

    const newMap = res.data.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));

    setUsers(newMap);
  }

  useEffect(() => {
    initData();
  }, []);

  const filterOptions = useMemo(
    () =>
      users.filter((v) => {
        if (searchQuery) {
          return v.label.toLowerCase().includes(searchQuery?.toLowerCase());
        }

        return users;
      }),
    [searchQuery, options]
  );

  useEffect(() => {
    if (value) {
      const found = options.find((v) => v.value === value);
      if (found) {
        setSearchQuery(found?.label);
      }
    }
  }, [value, options]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      drpodownRef.current &&
      !drpodownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleFocus = () => setIsOpen(true);

    if (inputRef.current) {
      inputRef.current.addEventListener("focus", handleFocus);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", handleFocus);
      }
    };
  }, [inputRef]);

  return (
    <>
      {label && (
        <label htmlFor={id}>
          <span className="text-gy-text"> {label}</span>
          {isRequired && <span className="text-red-primary"> *</span>}
        </label>
      )}
      <div
        className={`relative w-full cursor-pointer rounded-lg border border-gy-stoke text-gy-text ${
          label && " mt-2 "
        } ${height || "global-input-height"} ${error && "!border-red-primary"}`}
        ref={drpodownRef}
      >
        <div className="flex  justify-between relative items-center">
          <div className="grid flex-1 overflow-hidden items-center p-[2px_8px]">
            <input
              ref={inputRef}
              name={name}
              id={id}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              className={cn(
                "h-full w-full cursor-pointer rounded-lg border border-r-[0.8rem] border-transparent py-3  text-gy-text focus:outline-none"
              )}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-2 items-center pr-4">
            {!isClear && (
              <div onClick={() => setSearchQuery("")}>
                <IoMdClose
                  size={20}
                  className="text-gray-300 hover:text-gray-600"
                />
              </div>
            )}
            <span className="self-stretch w-px bg-[rgb(204,_204,_204)]  box-border"></span>
            <div>
              <FaAngleDown size={20} className="text-gray-300" />
            </div>
          </div>
        </div>

        <div
          hidden={isOpen === false}
          className="top-full absolute w-full bg-white shadow-sm border mt-2 rounded-md box-border"
        >
          <div>
            {isLoading && isOpen === true && (
              <div className="flex w-full justify-center p-2">
                <ImSpinner8 className=" mr-2 animate-spin" />
                <span>กำลังโหลดข้อมูล...</span>
              </div>
            )}

            {filterOptions.length === 0 && isOpen === true && !isLoading && (
              <div className="w-full text-center p-2">ไม่พบข้อมูล</div>
            )}

            {filterOptions.length !== 0 && isOpen === true && !isLoading && (
              <div
                style={{
                  height: filterOptions.length * 55 - filterOptions.length * 15,
                  overflow: "hidden",
                  maxHeight: "350px",
                }}
              >
                <Virtuoso
                  style={{ height: "100%" }}
                  data={filterOptions}
                  itemContent={(_, item) => (
                    <div
                      onClick={() => {
                        setSearchQuery(item?.label);
                        setIsOpen(false);
                        onChange(item.value?.toString());
                      }}
                      className="first:mt-0 mt-2 p-2  hover:bg-gray-100"
                    >
                      {item.label}
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
