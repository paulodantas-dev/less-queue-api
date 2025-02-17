import mongoose from 'mongoose'

export function createItemsSchema() {
  return new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      preparationTime: { type: Number, required: true },
      price: { type: Number, required: true },
      stock: { type: Number },
      category: { type: String },
      weight: { type: Number },
      dimensions: {
        width: { type: Number },
        height: { type: Number },
        depth: { type: Number },
      },
      available: { type: Boolean, default: true },
      imageUrls: [{ type: String }],
      companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companies',
        required: true,
      },
    },
    { timestamps: true },
  )
}

export const ItemsModel = mongoose.model('Items', createItemsSchema())
