import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SkeletonGroup, Skeleton } from "react-native-skeleton-loaders";

const Loading = ({ count = 4, color = "white" }) => {
  return (
    <SkeletonGroup numberOfItems={count} direction="row" stagger={{ delay: 0 }}>
      <Skeleton w={10} h={10} bR={50} color={color} />
    </SkeletonGroup>
  );
};

export default Loading;

const styles = StyleSheet.create({});
