import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants'

export const historyStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgPrimary,
        alignItems: 'center',
        padding: 20,
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