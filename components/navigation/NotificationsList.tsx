import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/notifications/notificationsSlice";
import { View, Text, ActivityIndicator } from "react-native";

const NotificationsList = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      {notifications.map((notification) => (
        <Text key={notification.id}>{notification.message}</Text>
      ))}
    </View>
  );
};

export default NotificationsList;
