import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Loader2,
  Mail,
  Trash,
} from "lucide-react";
import { Button } from "./components/ui/button";
import SearchSelector from "./components/selector/SearchSelector";
import Pagination from "./components/Pagination";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MyDropdown from "./components/ui/dropdown";
import { posts } from "./constant/posts";
import TablePosts from "./components/table/TablePosts";
import InputDropdownSearch from "./components/inputs/InputDropdownSearch";

function App() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [search, setSearch] = useState({
    page: 1,
    limit: 10,
    total: 10,
  });

  return (
    <>
      <div className="container">
        <br />
        <h1 className="text-lg text-center font-bold">Button</h1>
        <div className="flex gap-2 items-center">
          <Button>default</Button>
          <Button variant={"outline"}>outline</Button>
          <Button variant={"destructive"}>destructive</Button>
          <Button variant={"secondary"}>secondary</Button>
          <Button variant={"link"}>link</Button>
          <Button variant={"ghost"}>ghost</Button>
        </div>

        <h1 className="text-lg text-center font-bold"> with icon</h1>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <Button variant={"outline"}>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
        </div>

        <h1 className="text-lg text-center font-bold"> with loading</h1>
        <div className="flex gap-2 items-center">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
          <Button disabled variant={"outline"}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
          <Button disabled variant={"outline"}>
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        </div>

        <h1 className="text-lg text-center font-bold mt-10"> Search</h1>
        {/* @ts-ignore */}
        <SearchSelector
          placeholder="Search Selector"
          options={options}
          onChange={(v1) => {
            console.log(v1);
          }}
          noClearButton
        />

        <h1 className="text-lg text-center font-bold mt-10"> Pagination</h1>
        {/* @ts-ignore */}
        <Pagination search={search} fetchLists={() => {}} data={Array.of(10)} />

        <h1 className="text-lg text-center font-bold mt-10"> Dropdown</h1>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">Dropdown Shadcn</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <MyDropdown>
          <MyDropdown.Item onClick={() => console.log("1")}>
            test
          </MyDropdown.Item>
          <MyDropdown.Item onClick={() => console.log("2")}>
            test1
          </MyDropdown.Item>
          <MyDropdown.Item onClick={() => console.log("3")}>
            test5
          </MyDropdown.Item>
        </MyDropdown>

        {/* <h1 className="text-lg text-center font-bold mt-10 mb-10">Export</h1>
        <TablePosts />

        <Button onClick={() => downloadPDF()}>Export</Button> */}

        <h1 className="text-lg text-center font-bold mt-10 mb-10">
          Input dropdown
        </h1>

        <InputDropdownSearch />

        <Button>NExt Topic</Button>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default App;
