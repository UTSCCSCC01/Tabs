import { removeId } from "../view/ActiveDebtListComponent"
import Toast from 'react-native-simple-toast';

/**
 * Send request to the server to accept debt and handle as necessary
 * 
 * @name acceptDebt
 * @param debtId Id of debt
 * @param name Name of author of debt
 */
export function removeDebt(debtId: string, name: string | null = null) {
    console.log('remove debt ' + debtId)

    removeId(debtId)

    // Toast.show('Debt removed')
}