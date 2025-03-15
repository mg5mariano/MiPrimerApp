import { DefaultTheme } from "@react-navigation/native";
import colors from "./colors";

const CusthomTheme ={
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.principal,
        card: colors.variante3,
        Text: colors.TextoPrimario,
        Borde: colors.Borde,

    }
}

export default CusthomTheme;