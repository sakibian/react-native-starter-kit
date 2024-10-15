import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../store/group/groupSlice";
import { View, Text, ActivityIndicator } from "react-native";

const GroupList = () => {
  const dispatch = useDispatch();
  const { groups, loading, error } = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      {groups.map((group) => (
        <Text key={group.id}>{group.name}</Text>
      ))}
    </View>
  );
};

export default GroupList;
