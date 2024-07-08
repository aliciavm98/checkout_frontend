// src/pages/index.tsx
import AddCountry from "@/components/AddCountry";
import CountriesList from "@/components/CountriesList";

export default function Home() {
  return (
    <div>
      <h1>Countries</h1>
      <AddCountry />
      <CountriesList />
    </div>
  );
}
