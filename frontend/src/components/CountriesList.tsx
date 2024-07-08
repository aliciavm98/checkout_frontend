// src/components/CountriesList.tsx
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
      code
      emoji
    }
  }
`;

const CountriesList = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Countries List</h1>
      <ul>
        {data.countries.map(
          (country: {
            id: number;
            name: string;
            code: string;
            emoji: string;
          }) => (
            <li
              key={country.id}
              onClick={() => router.push(`/country/${country.code}`)}
            >
              {country.name} {country.emoji}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CountriesList;
