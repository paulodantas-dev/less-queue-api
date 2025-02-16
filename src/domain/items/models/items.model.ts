import mongoose from 'mongoose'

export function createItemsSchema() {
  return new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      preparationTime: { type: Number },
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
      placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places',
        required: true,
      },
      imageUrls: [{ type: String }],
    },
    { timestamps: true },
  )
}

export const ItemsModel = mongoose.model('Items', createItemsSchema())
