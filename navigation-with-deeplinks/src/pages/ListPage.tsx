import { List, Touchable } from "@shopify/shop-minis-react";
import { useNavigateWithTransition } from "@shopify/shop-minis-react";
import { ChevronRight } from "lucide-react";
import { Outlet } from "react-router";

interface ListItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

// Generate items once outside the component to prevent re-renders
const generateItems = (): ListItem[] => {
  const categories = ["Electronics", "Fashion", "Home", "Sports", "Books"];
  const items: ListItem[] = [];

  for (let i = 1; i <= 100; i++) {
    items.push({
      id: `item-${i}`,
      title: `Item ${i}`,
      description: `This is a detailed description for item ${i}`,
      category: categories[i % categories.length],
    });
  }

  return items;
};

// Generate items once at module load time
const ITEMS = generateItems();

export function ListPage() {
  const navigate = useNavigateWithTransition();

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <h1 className="text-2xl font-bold">Shop Minis Navigation Demo</h1>
          <p className="text-sm text-gray-600 mt-1">
            Tap any item to see the detail view with view transitions
          </p>
        </div>

        {/* List with virtualization */}
        <div className="flex-1 overflow-hidden">
          <List
            items={ITEMS}
            height="100%"
            showScrollbar={true}
            renderItem={(item) => (
              <Touchable
                onClick={() => navigate(`/item/${item.id}`)}
                className="text-left px-4 py-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[72px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                </div>
              </Touchable>
            )}
          />
        </div>
      </div>

      {/* Outlet for nested routes (DetailPage) */}
      <Outlet />
    </>
  );
}
