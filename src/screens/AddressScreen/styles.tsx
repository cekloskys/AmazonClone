import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    root: {
        padding:10,
    },
    row: {
        marginVertical: 5,
    },
    errorLabel: {
        color: 'red',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        backgroundColor: 'white',
        padding: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 5,
    },
});

export default style;