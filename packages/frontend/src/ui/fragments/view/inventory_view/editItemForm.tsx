import { gql } from "@apollo/client"

export const MODIFY_ITEM_NAME=gql`
mutation ModifyItemName($userId: String, $itemId: String, $name: String) {
  modifyItemName(userId: $userId, itemId: $itemId, name: $name)
}
`

export const MODIFY_ITEM_CATEGORY=gql`
mutation ModifyItemCategory($userId: String, $itemId: String, $categoryId: String) {
  modifyItemCategory(userId: $userId, itemId: $itemId, categoryId: $categoryId)
}
`