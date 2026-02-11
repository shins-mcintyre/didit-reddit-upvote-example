import { PostList } from "../components/PostList";
import { SortDropdown } from "@/components/SortPosts";

export default async function Home({searchParams}) {

  const currentPage=Number(searchParams.page) || 1;
  const sort = searchParams.sort || "top";
  return (
  <>
  <SortDropdown/>
  <PostList currentPage={currentPage} sort={sort}/>;
  </>
  )
}
