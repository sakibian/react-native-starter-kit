import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";
import { View, Text, ActivityIndicator } from "react-native";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      {posts.map((post) => (
        <Text key={post.id}>{post.title}</Text>
      ))}
    </View>
  );
};

export default PostList;
