import { useList } from "@refinedev/core";
import { useNavigate } from "react-router";
export default function Home() {
  interface IBucket {
    id: number;
    name: string;
    price: number;
  }
  const navigate = useNavigate();
  const { data: buckets } = useList<IBucket>({
    resource: "buckets",
  });
  return (
    <div> home </div>
  );
}
