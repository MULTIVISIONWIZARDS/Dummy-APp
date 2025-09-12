import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors";


type Props = {
  title?: string;
  subtitle?: string;
};

const BrandHeader: React.FC<Props> = ({
  title = "Vintage",
  subtitle = "Your Health, Our Priority",
}) => {
  return (
    <View style={styles.container}>
      <Icon name="hospital-building" size={28} color={Colors.darkBlue} />
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    // backgroundColor: '#e7f6ffff',
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    // borderBottomEndRadius:20,
    // borderBottomLeftRadius:20
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.darkBlueP1,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,fontWeight:"500"
  },
});

export default BrandHeader;
