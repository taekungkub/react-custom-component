import React, { useEffect, useMemo, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";

type Props = {};

export default function InputDropdownSearch({}: Props) {
  const randomUsers = useMemo(() => {
    return Array.from({ length: 500000 }, (_, index) => ({
      name: `User ${index}`,
      bgColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
      size: Math.floor(Math.random() * 40) + 100,
      description: `Description for user ${index}`,
    }));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filterUser = useMemo(() => {
    return randomUsers.filter((v) => {
      if (searchQuery) {
        if (v.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          setIsOpen(true);
        }

        return v.name.toLowerCase().includes(searchQuery.toLowerCase());
      }

      return randomUsers;
    });
  }, [searchQuery]);

  const drpodownRef = useRef(null);

  const handleClickOutside = (event: any) => {
    if (drpodownRef.current && !drpodownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative" ref={drpodownRef}>
      <input
        placeholder="search"
        className="border rounded-lg p-3 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && filterUser.length != 0 && isOpen === true && (
        <div className="absolute  z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ">
          <div
            className="item  rounded-lg"
            style={{
              height: 400,
              overflow: "hidden",
              resize: "both",
              padding: "1em",
            }}
          >
            <Virtuoso
              style={{ height: "100%" }}
              data={filterUser}
              itemContent={(_, user) => (
                <div
                  style={{
                    backgroundColor: user.bgColor,
                    padding: "0.5rem",
                    height: `${user.size}px`,
                  }}
                  onClick={() => {
                    setSearchQuery(user.name);
                    setIsOpen(false);
                  }}
                >
                  <p>
                    <strong>{user.name}</strong>
                  </p>
                  <div>{user.description}</div>
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
