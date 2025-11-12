import React from 'react'
import { useOrders, type Order, type Money } from '@shopify/shop-minis-react'

function formatPrice(money: Money): string {
  const numPrice = parseFloat(money.amount)
  if (isNaN(numPrice)) return `${money.amount} ${money.currencyCode}`

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(numPrice)
}

function renderStars(rating: number): React.JSX.Element {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className="text-yellow-400">
        ★
      </span>
    )
  }

  if (hasHalfStar) {
    stars.push(
      <span key="half" className="text-yellow-400">
        ☆
      </span>
    )
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="text-gray-300">
        ☆
      </span>
    )
  }

  return <span className="flex">{stars}</span>
}

export function Orders() {
  const result = useOrders()
  const { loading, error } = result

  // Try different possible data paths
  let orders: Order[] = []
  if ((result as any).data?.data) {
    orders = (result as any).data.data
  } else if ((result as any).data && Array.isArray((result as any).data)) {
    orders = (result as any).data
  } else if ((result as any).orders) {
    orders = (result as any).orders
  }

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Recent Orders</h3>
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <p className="ml-2 text-sm text-blue-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Recent Orders</h3>
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">
            Error loading orders: {error.message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Recent Orders</h3>
        <span className="text-xs text-gray-500">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-md border border-dashed border-gray-300">
          <p className="text-sm text-gray-600">No orders found</p>
          <p className="text-xs text-gray-500 mt-1">
            Your orders will appear here once you make a purchase
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map((order: Order) => {
            const totalItems = order.lineItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            )
            const totalValue = order.lineItems.reduce((sum, item) => {
              const price = item.product?.price
              return (
                sum + (price ? parseFloat(price.amount) * item.quantity : 0)
              )
            }, 0)
            const currency =
              order.lineItems[0]?.product?.price?.currencyCode || 'USD'

            return (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Compact Order Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {order.name}
                      </h4>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        #{order.id.split('/').pop()?.slice(-6)}
                      </span>
                    </div>

                    {/* Compact Shop Info */}
                    {order.shop && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-gray-600">
                            {order.shop.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600 truncate">
                          {order.shop.name}
                        </span>
                        {order.shop.isFollowing && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full flex-shrink-0">
                            Following
                          </span>
                        )}
                      </div>
                    )}

                    {/* Compact Shop Rating */}
                    {order.shop?.reviewAnalytics?.averageRating && (
                      <div className="flex items-center gap-1 text-xs">
                        <div className="flex text-xs">
                          {renderStars(
                            order.shop.reviewAnalytics.averageRating
                          )}
                        </div>
                        <span className="text-gray-600 text-xs">
                          {order.shop.reviewAnalytics.averageRating.toFixed(1)}(
                          {order.shop.reviewAnalytics.reviewCount})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-sm font-bold text-gray-900">
                      {formatPrice({
                        amount: totalValue.toFixed(2),
                        currencyCode: currency,
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {totalItems} item{totalItems !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Compact Line Items */}
                <div className="space-y-1.5">
                  <h5 className="text-xs font-medium text-gray-700">
                    Products ({order.lineItems.length})
                  </h5>

                  {order.lineItems.map((item, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="flex gap-2 p-2 bg-gray-50 rounded-md"
                    >
                      {/* Compact Product Image */}
                      {item.product?.featuredImage && (
                        <div className="flex-shrink-0">
                          <img
                            src={item.product.featuredImage.url}
                            alt={item.productTitle}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                        </div>
                      )}

                      {/* Compact Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h6 className="text-xs font-medium text-gray-900 truncate">
                              {item.productTitle}
                            </h6>
                            {item.variantTitle && (
                              <p className="text-xs text-gray-600 truncate">
                                {item.variantTitle}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                            {item.product?.isFavorited && (
                              <span className="text-red-500 text-xs">♥</span>
                            )}
                            {item.product?.price && (
                              <span className="text-xs font-medium text-gray-900">
                                {formatPrice(item.product.price)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">
                              Qty: {item.quantity}
                            </span>

                            {/* Compact Product Rating */}
                            {item.product?.reviewAnalytics?.averageRating && (
                              <div className="flex items-center gap-1">
                                <div className="flex text-xs">
                                  {renderStars(
                                    item.product.reviewAnalytics.averageRating
                                  )}
                                </div>
                                <span className="text-xs text-gray-600">
                                  (
                                  {item.product.reviewAnalytics.reviewCount ||
                                    0}
                                  )
                                </span>
                              </div>
                            )}
                          </div>

                          {item.product?.price && (
                            <span className="text-xs font-medium text-gray-900 flex-shrink-0">
                              {formatPrice({
                                amount: (
                                  parseFloat(item.product.price.amount) *
                                  item.quantity
                                ).toFixed(2),
                                currencyCode: item.product.price.currencyCode,
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
