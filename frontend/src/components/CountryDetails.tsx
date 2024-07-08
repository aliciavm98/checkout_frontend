// src/components/CountryDetails.tsx
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

const CountryDetails = () => {
  const router = useRouter();
  const { code } = router.query;

  console.log("Router query code:", code); // Ajout de log pour vérifier la variable code

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code: code as string },
    skip: !code, // Skip the query until the code is available
  });

  console.log("GraphQL query result:", data); // Ajout de log pour vérifier les données retournées

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.country) return <p>No data available</p>;

  const { country } = data;

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Code: {country.code}</p>
      <p>Emoji: {country.emoji}</p>
      <p>Continent: {country.continent ? country.continent.name : "N/A"}</p>
    </div>
  );
};

export default CountryDetails;
