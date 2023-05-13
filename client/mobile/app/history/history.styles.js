import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants'

export const historyStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
        alignItems: 'center',
        padding: 20,
    },
    profileContainer: {
        marginTop: 30,
        width: 388,
        height: 268,
        backgroundColor: COLORS.bgProfile,
        borderRadius: 10,
        alignItems: 'center',
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
    historyContainer: {
        marginTop: 30,
        width: '100%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 30,
    }
})