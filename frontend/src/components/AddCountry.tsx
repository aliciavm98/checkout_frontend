// src/components/AddCountry.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "../graphql/mutations";
import { GET_COUNTRIES } from "../graphql/queries";

const AddCountry = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [continentId, setContinentId] = useState("");
  const [addCountry, { error }] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCountry({
        variables: {
          data: {
            name,
            code,
            emoji,
            continent: continentId ? { id: parseInt(continentId, 10) } : null,
          },
        },
      });
      setName("");
      setCode("");
      setEmoji("");
      setContinentId("");
    } catch (err) {
      console.error("Error adding country:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Country Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country Emoji"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
      />
      <input
        type="text"
        placeholder="Continent ID (optional)"
        value={continentId}
        onChange={(e) => setContinentId(e.target.value)}
      />
      <button type="submit">Add Country</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default AddCountry;
