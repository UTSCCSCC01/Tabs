import { model, Schema } from 'mongoose'
import { CategoryDocument } from '../types'

const categorySchema = new Schema(
    {
        inventoryId: String,
        categoryId: String,
        categoryName: String,
        categoryDesc: String
    }
)



const Category = model<CategoryDocument>('Category', categorySchema)
export default Category