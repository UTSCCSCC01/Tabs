import { removeId } from "../view/DebtRequestListComponent"
import Toast from 'react-native-simple-toast';

/**
 * Send request to the server to accept debt and handle as necessary
 * 
 * @name acceptDebt
 * @param debtId Id of debt
 * @param name Name of author of debt
 */
export function acceptDebt(debtId: string, name: string | null = null) {
    console.log('accept debt ' + debtId)

    removeId(debtId)

    Toast.show('Debt accepted')
}

/**
 * Send request to the server to reject debt and handle as necessary
 * 
 * @name rejectDebt
 * @param debtId Id of debt
 * @param name Name of author of debt
 */
export function rejectDebt(debtId: string, name: string | null = null) {
    console.log('reject debt ' + debtId)

    removeId(debtId)

    Toast.show('Debt rejected')
}