import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

function CustomTabButton({ children, onPress, routeName, accessibilityState }: any) {
  const [visible, setVisible] = useState(false);

  // guide text per tab
  const guideText = {
    Home: "Go to your dashboard",
    Consults: "Chat with a doctor",
    Profile: "View your profile settings",
  }[routeName] ?? "";

  return (
    <Tooltip
      isVisible={visible}
      content={<Text style={{ color: "#000000" }}>{guideText}</Text>}
      placement="top"
      onClose={() => setVisible(false)}
      backgroundColor="rgba(0,0,0,0.3)"
    >
      <TouchableOpacity
        onPress={onPress}   // keep navigation instant
        onLongPress={() => setVisible(true)}
        delayLongPress={300}
        activeOpacity={1}
        style={{  alignItems: "center", justifyContent: "center" }} // ⬅️ keep alignment
      >
        {children}
      </TouchableOpacity>
    </Tooltip>
  );
}


export default CustomTabButton;