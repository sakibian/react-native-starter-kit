import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchGroupsPostsEvents } from "../features/search/searchSlice";
import { View, TextInput, Button, Text, ActivityIndicator } from "react-native";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);

  const handleSearch = () => {
    dispatch(searchGroupsPostsEvents(query));
  };

  return (
    <View>
      <TextInput
        placeholder="Search groups, posts, events..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      {results.map((result) => (
        <Text key={result.id}>{result.title || result.name}</Text>
      ))}
    </View>
  );
};

export default Search;
