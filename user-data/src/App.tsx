import { useCurrentUser, useBuyerAttributes } from "@shopify/shop-minis-react";
import { CategorySearch } from "./components/CategorySearch";

export function App() {
  const { currentUser } = useCurrentUser();
  const { buyerAttributes } = useBuyerAttributes();

  if (!currentUser || !buyerAttributes) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4">
      <div className="flex items-center gap-4 mb-2">
        {currentUser.avatarImage?.url && (
          <img
            src={currentUser.avatarImage.url}
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
        )}

        <div className="flex flex-col">
          <p>
            <span className="font-bold">Display Name:</span>{" "}
            {currentUser.displayName}
          </p>
          <p>
            <span className="font-bold">Gender Affinity:</span>{" "}
            {buyerAttributes.genderAffinity ?? "Unknown"}
          </p>
        </div>
      </div>

      {buyerAttributes.categoryAffinities.length > 0 ? (
        <>
          <h1 className="text-xl font-bold mb-2">Category Affinities</h1>

          <div className="flex flex-col gap-2">
            {buyerAttributes.categoryAffinities.map((category) => (
              <div key={category.id} className="flex flex-col gap-2">
                <p className="font-bold">{category.name}</p>

                <CategorySearch
                  key={category.id}
                  category={category.id}
                  screenOffset="4"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No category affinities</p>
      )}
    </div>
  );
}
