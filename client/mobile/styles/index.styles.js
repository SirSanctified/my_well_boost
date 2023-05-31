import { StyleSheet } from "react-native"

import { COLORS } from '../constants'


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgPrimary,
        flex: 1,
        padding: 8,
    },
    profileContainer: {
        marginTop: 30,
        width: 388,
        height: 268,
        backgroundColor: COLORS.bgProfile,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    profileText: {
        fontSize: 18,
    },
})

export default styles