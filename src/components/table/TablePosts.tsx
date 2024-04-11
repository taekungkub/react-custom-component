import { posts } from "@/constant/posts";
import React from "react";

type Props = {};

export default function TablePosts({}: Props) {
  return (
    <div>
      <div id="All" className="min-w-[1500px]">
        <table className="table-fixed" id="my-table">
          <thead>
            <tr>
              <th className="w-32 ">id</th>
              <th className="w-32">userId</th>
              <th className="w-64">title</th>
              <th className="w-64">body</th>

              <th className="w-64">body</th>
              <th className="w-64">body</th>
              <th className="w-64">body</th>
              <th className="w-64">body</th>
              <th className="w-64">body</th>

              <th className="w-64">title</th>
              <th className="w-44">userId</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((v) => (
              <tr>
                <td className="text-center">{v.id}</td>
                <td className="text-center">{v.userId}</td>
                <td>{v.title}</td>
                <td>{v.body}</td>

                <td>{v.body}</td>
                <td>{v.body}</td>
                <td>{v.body}</td>
                <td>{v.body}</td>
                <td>{v.body}</td>

                <td>{v.title}</td>
                <td className="text-center">{v.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
