import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventSlice";
import { View, Text, ActivityIndicator } from "react-native";

const EventList = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      {events.map((event) => (
        <Text key={event.id}>{event.title}</Text>
      ))}
    </View>
  );
};

export default EventList;
