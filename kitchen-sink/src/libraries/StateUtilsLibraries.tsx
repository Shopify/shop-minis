import { useState, useEffect } from "react";
import { create } from "zustand";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as _ from "lodash";
import { ulid } from "ulid";
import {
  useNavigateWithTransition,
  Card,
  Button,
  Input,
  Alert,
  Touchable,
} from "@shopify/shop-minis-react";

// Zustand Store
interface TodoStore {
  todos: Array<{ id: string; text: string; completed: boolean }>;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    { id: ulid(), text: "Test Zustand store", completed: false },
    { id: ulid(), text: "Try React Query", completed: false },
  ],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: ulid(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));

// Create QueryClient instance
const queryClient = new QueryClient();

// Mock API function
const fetchUserData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    name: "John Doe",
    email: "john@example.com",
    id: ulid(),
    timestamp: new Date().toISOString(),
  };
};

function StateUtilsContent() {
  const navigate = useNavigateWithTransition();
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } =
    useTodoStore();
  const [newTodo, setNewTodo] = useState("");
  const [activeTab, setActiveTab] = useState<
    "zustand" | "query" | "lodash" | "ulid"
  >("zustand");

  // React Query
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    staleTime: 5000,
  });

  // Lodash examples
  const [lodashResults, setLodashResults] = useState<any>({});

  useEffect(() => {
    const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const users = [
      { name: "Alice", age: 25, active: true },
      { name: "Bob", age: 30, active: false },
      { name: "Charlie", age: 25, active: true },
    ];

    setLodashResults({
      chunk: _.chunk(sampleData, 3),
      shuffle: _.shuffle(sampleData),
      groupBy: _.groupBy(users, "age"),
      debounced: "Type to see debounce",
      throttled: "Click button to see throttle",
    });
  }, []);

  const debouncedUpdate = _.debounce((value: string) => {
    setLodashResults((prev: any) => ({
      ...prev,
      debounced: `Debounced: ${value}`,
    }));
  }, 500);

  const throttledClick = _.throttle(() => {
    setLodashResults((prev: any) => ({
      ...prev,
      throttled: `Throttled at ${new Date().toLocaleTimeString()}`,
    }));
  }, 2000);

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
            <h1 className="text-lg font-bold text-gray-900">
              State & Utilities
            </h1>
            <p className="text-xs text-gray-600">
              Zustand, React Query, Lodash, ULID
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          {(["zustand", "query", "lodash", "ulid"] as const).map((tab) => (
                      <Touchable
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {tab === "query" ? "React Query" : tab}
            </Touchable>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Zustand Tab */}
        {activeTab === "zustand" && (
          <>
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Todo List (Zustand Store)
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && newTodo.trim()) {
                        addTodo(newTodo);
                        setNewTodo("");
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (newTodo.trim()) {
                        addTodo(newTodo);
                        setNewTodo("");
                      }
                    }}
                    variant="default"
                  >
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5"
                      />
                      <span
                        className={`flex-1 ${
                          todo.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                                <Touchable
                        onClick={() => removeTodo(todo.id)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </Touchable>
                    </div>
                  ))}
                </div>

                {todos.some((t) => t.completed) && (
                  <Button
                    onClick={clearCompleted}
                    variant="secondary"
                    className="w-full"
                  >
                    Clear Completed
                  </Button>
                )}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Store Stats</h3>
              <div className="space-y-1 text-sm">
                <p>Total todos: {todos.length}</p>
                <p>Completed: {todos.filter((t) => t.completed).length}</p>
                <p>Active: {todos.filter((t) => !t.completed).length}</p>
              </div>
            </Card>
          </>
        )}

        {/* React Query Tab */}
        {activeTab === "query" && (
          <>
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Fetched User Data
              </h3>

              {isLoading && (
                <div className="text-center py-4">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Loading...</p>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  Error fetching data: {(error as Error).message}
                </Alert>
              )}

              {userData && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium">
                        {userData.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {userData.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ID:</span>
                      <span className="text-sm font-mono text-xs">
                        {userData.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Fetched:</span>
                      <span className="text-sm">
                        {new Date(userData.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => refetch()}
                    variant="default"
                    className="w-full"
                  >
                    Refetch Data
                  </Button>
                </div>
              )}
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                React Query Features
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Automatic background refetching</li>
                <li>• Request deduplication</li>
                <li>• Caching with stale time</li>
                <li>• Loading & error states</li>
                <li>• Optimistic updates</li>
              </ul>
            </Card>
          </>
        )}

        {/* Lodash Tab */}
        {activeTab === "lodash" && (
          <>
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Array Methods
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">_.chunk([1-10], 3)</p>
                  <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-auto">
                    {JSON.stringify(lodashResults.chunk, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium">_.shuffle([1-10])</p>
                  <pre className="bg-gray-100 p-2 rounded mt-1 text-xs">
                    {JSON.stringify(lodashResults.shuffle)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium">_.groupBy(users, 'age')</p>
                  <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-auto">
                    {JSON.stringify(lodashResults.groupBy, null, 2)}
                  </pre>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Function Methods
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">
                    Debounce (500ms delay)
                  </p>
                  <Input
                    onChange={(e) => debouncedUpdate(e.target.value)}
                    placeholder="Type to see debounce..."
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {lodashResults.debounced}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">
                    Throttle (2s limit)
                  </p>
                  <Button
                    onClick={throttledClick}
                    variant="secondary"
                    className="w-full"
                  >
                    Click Rapidly (Throttled)
                  </Button>
                  <p className="text-xs text-gray-600 mt-1">
                    {lodashResults.throttled}
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* ULID Tab */}
        {activeTab === "ulid" && (
          <>
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                ULID Generator
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    const newId = ulid();
                    setLodashResults((prev: any) => ({
                      ...prev,
                      latestUlid: newId,
                    }));
                  }}
                  variant="default"
                  className="w-full"
                >
                  Generate New ULID
                </Button>

                {lodashResults.latestUlid && (
                  <div className="p-3 bg-gray-100 rounded">
                    <p className="text-xs font-mono break-all">
                      {lodashResults.latestUlid}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                ULID Features
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Lexicographically sortable</li>
                <li>• 128-bit compatibility with UUID</li>
                <li>• 48-bit timestamp (millisecond precision)</li>
                <li>• 80 bits of randomness</li>
                <li>• Monotonic sort order (same millisecond)</li>
                <li>• No special characters (URL safe)</li>
              </ul>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export function StateUtilsLibraries() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateUtilsContent />
    </QueryClientProvider>
  );
}
