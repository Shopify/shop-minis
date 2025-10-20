import {
  useCurrentUser,
  useNavigateWithTransition,
  Card,
  Skeleton,
  Touchable,
  Image,
} from "@shopify/shop-minis-react";

export function CurrentUserTest() {
  const navigate = useNavigateWithTransition();
  const { currentUser, loading, error } = useCurrentUser();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <Touchable
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg"
            style={{ minHeight: "48px", minWidth: "48px" }}
          >
            <span className="text-xl">←</span>
          </Touchable>
          <div className="flex-1 ml-2">
            <h1 className="text-lg font-bold text-gray-900">useCurrentUser</h1>
            <p className="text-xs text-gray-600">Access current user data</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-4">
          {/* Description */}
          <Card className="p-4">
            <h2 className="font-semibold text-gray-900 mb-2">
              About this Hook
            </h2>
            <p className="text-sm text-gray-600">
              The useCurrentUser hook provides access to the current Shop app
              user's information, including their display name and avatar.
            </p>
          </Card>

          {/* Loading State */}
          {loading && (
            <Card className="p-4">
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card className="p-4 border-red-200 bg-red-50">
              <h3 className="font-semibold text-red-900 mb-1">
                Error Loading User
              </h3>
              <p className="text-sm text-red-700">{error.message}</p>
            </Card>
          )}

          {/* User Data */}
          {currentUser && !loading && (
            <>
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  User Information
                </h3>
                <div className="space-y-3">
                  {currentUser.avatarImage?.url && (
                    <div className="flex items-center gap-3">
                      <Image
                        src={currentUser.avatarImage.url}
                        alt="User avatar"
                        className="w-16 h-16 rounded-full"
                        aspectRatio="1"
                        objectFit="cover"
                      />
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block">
                          Avatar
                        </span>
                        <p className="text-sm text-gray-900">
                          User profile image
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Display Name
                    </span>
                    <p className="text-sm text-gray-900">
                      {currentUser.displayName || "Not provided"}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Raw Data</h3>
                <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                  {JSON.stringify(currentUser, null, 2)}
                </pre>
              </Card>
            </>
          )}

          {/* No User State */}
          {!currentUser && !loading && !error && (
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">No User Data</h3>
              <p className="text-sm text-gray-600">
                No user is currently logged in or user data is unavailable.
              </p>
            </Card>
          )}

          {/* Code Example */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
              {`import { useCurrentUser } from '@shopify/shop-minis-react'

function MyComponent() {
  const { currentUser, loading, error } = useCurrentUser()
  
  if (loading) return <Skeleton />
  if (error) return <Error />
  
  return (
    <div>
      {currentUser?.avatarImage && (
        <Image src={currentUser.avatarImage.url} />
      )}
      <p>Hello {currentUser?.displayName || 'Guest'}!</p>
    </div>
  )
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
