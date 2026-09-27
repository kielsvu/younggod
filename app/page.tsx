import site from "@/data/site.json";
import members from "@/data/members.json";
import Home from "@/components/Home";

export default function Page() {
  return <Home site={site} members={members} />;
}