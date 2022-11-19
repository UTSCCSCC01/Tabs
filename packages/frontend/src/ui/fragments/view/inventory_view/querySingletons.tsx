import { gql, useQuery } from "@apollo/client";
import React from "react";
import {  Text } from 'react-native';
import Loading from "../loading";





export const FIND_CATS = gql`
query Query($inventoryId: String) {
  findCatsByInvId(inventoryId: $inventoryId) {
    id
    inventoryId
    categoryId
    categoryName
    categoryDesc
    isRestricted
    owner
    admins
  }
}
`


export const ADD_CATEGORY=gql`
mutation Mutation($userId: String, $inventoryId: String, $categoryName: String, $categoryDesc: String, $isRestricted: Boolean) {
  addCat(userId: $userId, inventoryId: $inventoryId, categoryName: $categoryName, categoryDesc: $categoryDesc, isRestricted: $isRestricted)
}
`
export const FIND_ITEMS=gql`
query ItemsQuery($categoryId: String) {
  findItemsByCategory(categoryId: $categoryId) {
    id
    quantity
    expiration
    tags
    categoryId
    name
  }
}
`

export const FIND_ITEM=gql`
query FindItem($itemId: String) {
    findItem(itemId: $itemId) {
      id
      quantity
      expiration
      tags
      categoryId
      name
    }
  }
`

export const CREATE_ITEM = gql`
mutation CreateItem($userId: String, $categoryId: String, $name: String, $expiration: String) {
  createItem(userId: $userId, categoryId: $categoryId, name: $name, expiration: $expiration)
}
`

export const ADD_CAPACITY = gql`
mutation AddItem($userId: String, $itemId: String) {
  addItem(userId: $userId, itemId: $itemId)
}
`

export const SUBTRACT_CAPACITY = gql`
mutation SubtractItem($userId: String, $itemId: String) {
  subtractItem(userId: $userId, itemId: $itemId)
}
`

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

export const CategoryListSingleton = ({inventoryId}:{inventoryId:string}) => {
    const categoryQuery = useQuery(FIND_CATS, {
      variables: {inventoryId: inventoryId}
    });
  
  
  const queries = [categoryQuery]
  
  for (var i of queries){
      if (i.loading || i.loading) return  <Loading/>;
      if (i.error) return <Text style={{fontSize: 8}}>{i.error.message}:{"\n" + JSON.stringify(i.error)}</Text>;
      console.log(JSON.stringify(i.data) + "\nThis is data... hoping it is not null");
  }
  
  const allCats = categoryQuery.data.findCatsByInvId;

  if (allCats == null) return <Loading/>;
  
  return allCats;
}

export const ItemListSingleton = ({categoryId}:{categoryId:string}) => {
    const itemQuery = useQuery(FIND_ITEMS, {
        variables: {categoryId: categoryId}
      });

    
    const queries = [itemQuery]

    for (var i of queries){
        if (i.loading || i.loading) return <Loading/>;
        if (i.error) return <Text style={{fontSize: 8}}>{i.error.message}:{"\n" + JSON.stringify(i.error)}</Text>;
        console.log(JSON.stringify(i.data) + "\nThis is data... hoping it is not null");
    }
    const allItems = itemQuery.data.findItemsByCategory;

    if (allItems == null) return <Loading/>;
  
  return allItems;
}

export const itemSingleton = ({itemId}:{itemId:string}) => {
    const itemQuery = useQuery(FIND_ITEM, {
        variables: {itemId: itemId}
      });

    
    const queries = [itemQuery]

    for (var i of queries){
        if (i.loading || i.loading) return <Loading/>;
        if (i.error) return <Text style={{fontSize: 8}}>{i.error.message}:{"\n" + JSON.stringify(i.error)}</Text>;
        console.log(JSON.stringify(i.data) + "\nThis is data... hoping it is not null");
    }
    const item = itemQuery.data.findItem

    if (item == null) return <Loading/>;
  
  return item;
}