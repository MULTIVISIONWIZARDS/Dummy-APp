import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors";
import Icon1 from "react-native-vector-icons/Feather";

type Props = {
  title?: string;
  subtitle?: string;
  onMessagePress?: () => void; // callback for right icon press
};

const BrandHeader: React.FC<Props> = ({
  title = "Vintage",
  subtitle = "Your Health, Our Priority",
  onMessagePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Icon name="hospital-building" size={28} color={Colors.darkBlue} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>


      <TouchableOpacity onPress={onMessagePress} style={styles.rightIcon}>
        <Icon1 name="send" size={26} color={Colors.darkBlue} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // push right-side icon
    padding: 12,
    backgroundColor: Colors.light_white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.darkBlueP1,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
    fontWeight: "500",
  },
  rightIcon: {
    padding: 6,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default BrandHeader;
