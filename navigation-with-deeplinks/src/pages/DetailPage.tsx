import { useParams } from "react-router";
import {
  useNavigateWithTransition,
  Button,
  Touchable,
} from "@shopify/shop-minis-react";
import { ArrowLeft, Star, Share2, Heart } from "lucide-react";

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigateWithTransition();

  // Extract item number from id (e.g., "item-42" -> 42)
  const itemNumber = id?.split("-")[1] || "1";
  const categories = ["Electronics", "Fashion", "Home", "Sports", "Books"];
  const category = categories[parseInt(itemNumber) % categories.length];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center px-4 py-3">
          <Touchable
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Touchable>
          <h1 className="text-lg font-semibold ml-2">Item Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Hero Image Placeholder */}
        <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl font-bold mb-2">{itemNumber}</div>
            <div className="text-sm opacity-90">Item Image</div>
          </div>
        </div>

        {/* Item Info */}
        <div className="bg-white p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold mb-2">Item {itemNumber}</h2>
              <span className="inline-block text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {category}
              </span>
            </div>
            <Touchable
              onClick={() => {}}
              className="p-2 hover:bg-gray-100 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Add to favorites"
            >
              <Heart className="w-6 h-6 text-gray-600" />
            </Touchable>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">(4.5 / 5.0)</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              This is a detailed description for item {itemNumber}. This item is
              part of our {category.toLowerCase()} collection and features
              high-quality materials and craftsmanship. Perfect for anyone
              looking to enhance their experience with premium products.
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              {[
                "Premium quality materials",
                "Fast shipping available",
                "30-day return policy",
                "Customer satisfaction guaranteed",
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-blue-600 mb-6">
            ${(99 + parseInt(itemNumber)).toFixed(2)}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full min-h-[52px]">Add to Cart</Button>
            <Button className="w-full min-h-[52px]" variant="secondary">
              <Share2 className="w-5 h-5 mr-2" />
              Share Item
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white p-6 mb-20">
          <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Item ID</span>
              <span className="font-medium">{id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Category</span>
              <span className="font-medium">{category}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Availability</span>
              <span className="font-medium text-green-600">In Stock</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free shipping over $50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
