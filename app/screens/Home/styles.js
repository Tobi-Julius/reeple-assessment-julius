import { StyleSheet } from "react-native";
import { colors } from "../../constants";
import { layout } from "../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  innerContainer: {
    height: "100%",
  },
  bottom: {
    height: "13%",
    backgroundColor: colors.primary,
    position: "relative",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: colors.secondary,
    width: "87%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: layout.pixelSizeVertical(18),
    borderRadius: layout.fontPixel(25),
  },
  btnText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: layout.size.h2,
    color: colors.white,
  },
  value: {
    color: colors.secondary,
    fontFamily: "Montserrat_600SemiBold",
    color: colors.white,
  },
  label: {
    fontSize: layout.size.h2,
    fontFamily: "Montserrat_700Bold",
    fontSize: layout.size.h2,
    color: colors.grayText,
    paddingRight: layout.pixelSizeHorizontal(20),
  },
});
