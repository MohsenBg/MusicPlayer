import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./App/Redux/Store";
import Index from "./App/Index";

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
