import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  search: any;
  data: any;
  fetchLists: () => void;
  noBorder: boolean;
}

function Pagination({ search, data, fetchLists, noBorder }: Props) {
  const handlePaginationSearch = (e: any) => {
    // setSearch({ ...search, [e.target.name]: e.target.value })
    if (e.target.name === "limit") {
      return fetchLists({
        ...search,
        [e.target.name]: e.target.value,
        page: 1,
      });
    }
    fetchLists({ ...search, [e.target.name]: e.target.value });
  };

  const handlePage = (num: number) => {
    // setSearch({ ...search, page: num })
    fetchLists({ ...search, page: num });
  };
  const lastPage = Math.ceil(search.total / search.limit) || 1;

  return (
    <div
      className={`flex justify-end gap-2 h-12 pr-2 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg ${
        !noBorder && "border-b-[1px]"
      } border-border-gray-table`}
    >
      <div className="flex items-center">
        <div>Rows per page:</div>
        <select
          id="limit"
          name="limit"
          className="h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handlePaginationSearch}
        >
          <option value="5">5</option>
          <option value="10" selected="selected">
            10
          </option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="mx-5">
        {search.limit * (search.page - 1) + 1}-
        {search.limit * (search.page - 1) + data.length} of {search.total}
      </div>

      <button
        className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 my-2 disabled:bg-gray-50"
        onClick={() => {
          handlePage(1);
        }}
        disabled={1 == search.page}
      >
        <ChevronFirst className="text-lg" />
      </button>
      <button
        className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1 disabled:bg-gray-50"
        onClick={() => {
          if (search.page == 1) return;
          handlePage(search.page - 1);
        }}
        disabled={search.page == 1}
      >
        <ChevronLeft className="text-lg" />
      </button>
      <button
        className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1 disabled:bg-gray-50"
        onClick={() => {
          handlePage(search.page + 1);
        }}
        disabled={search.page == lastPage}
      >
        <ChevronRight className="text-lg" />
      </button>
      <button
        className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1 disabled:bg-gray-50"
        onClick={() => {
          // const last = (Math.round(search.total/search.limit))
          // if (search.page == last) return
          handlePage(lastPage);
        }}
        disabled={search.page == lastPage}
      >
        <ChevronLast className="text-lg font-bold" />
      </button>
    </div>
  );
}

export default Pagination;
