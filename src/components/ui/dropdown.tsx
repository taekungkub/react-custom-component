import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function MyDropdown({ children }: Props) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [wrapperRef]);

  return (
    <div className="relative inline-block text-left" ref={wrapperRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setOpen((prev) => !prev)}
        >
          Options
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div
            className="py-1"
            role="none"
            onClick={() => setOpen((prev) => !prev)}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface ItemProps {
  children: React.ReactNode;
}

function Item({
  children,
  ...rest
}: ItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div
      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
      {...rest}
    >
      {children}
    </div>
  );
}

MyDropdown.Item = Item;
