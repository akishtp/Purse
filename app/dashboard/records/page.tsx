import { fetchRecords } from "@/app/lib/data";
// import { Record } from "../../lib/definitions";

export default async function Page() {
  const records = await fetchRecords();
  console.log(records);

  return <p>Hello</p>;
}
