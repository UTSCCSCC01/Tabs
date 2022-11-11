import { removeId as removeActiveDebtId} from "../ui/fragments/view/debt/ActiveDebtListComponent";
import { removeId as removeDebtRequestId } from "../ui/fragments/view/debt/DebtRequestListComponent"

import { Controller } from "./Controller";
import { gql, useMutation } from '@apollo/client';

/**
 * Debt UI Controller
 * 
 * @name ActiveDebtController
 * @method removeDebt
 */
export class ActiveDebtController extends Controller {

    /**
     * Remove debt from ui
     * 
     * @name removeDebt
     * @param debtId
     * @param name User Name
     * @in ActiveDebtController
     */
    removeDebt(debtId: string, name: string | null = null) {
        console.log('remove debt ' + debtId)
    
        removeActiveDebtId(debtId)
    }
}

/**
 * Debt UI Controller
 * 
 * @name RequestDebtController
 * @method acceptDebt
 * @method rejectDebt
 */
 export class RequestDebtController extends Controller {
    /**
     * Send request to the server to accept debt and handle as necessary
     * 
     * @name acceptDebt
     * @param debtId Id of debt
     * @param name Name of author of debt
     * @in RequestDebtController
     */
    acceptDebt(debtId: string, name: string | null = null) {
        console.log('accept debt ' + debtId)

        removeDebtRequestId(debtId)
    }

    /**
     * Send request to the server to reject debt and handle as necessary
     * 
     * @name rejectDebt
     * @param debtId Id of debt
     * @param name Name of author of debt
     * @in RequestDebtController
     */
    rejectDebt(debtId: string, name: string | null = null) {
        console.log('reject debt ' + debtId)

        removeDebtRequestId(debtId)
    }
}