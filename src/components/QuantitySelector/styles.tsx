import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d1d1',
        width: 100,
        justifyContent: 'space-between',
    },
    button: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d1d1d1',
    },
    buttonText: {
        fontSize: 14,
    },
    quantity: {
        color: '#007eb9'
    },
});

export default style;