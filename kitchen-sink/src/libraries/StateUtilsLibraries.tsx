import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as _ from "lodash";
import { ulid } from "ulid";
import * as LucideIcons from "lucide-react";
import {
  useNavigateWithTransition,
  Card,
  Button,
  Input,
  Alert,
  Touchable,
  Badge,
} from "@shopify/shop-minis-react";

// Zustand Store with Persistence
interface TodoStore {
  todos: Array<{
    id: string;
    text: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
  }>;
  addTodo: (text: string, priority?: "low" | "medium" | "high") => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
  updatePriority: (id: string, priority: "low" | "medium" | "high") => void;
}

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [
        {
          id: ulid(),
          text: "Test Zustand store",
          completed: false,
          priority: "high",
        },
        {
          id: ulid(),
          text: "Try React Query",
          completed: false,
          priority: "medium",
        },
        {
          id: ulid(),
          text: "Explore Lodash utilities",
          completed: false,
          priority: "low",
        },
      ],
      addTodo: (text, priority = "medium") =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: ulid(), text, completed: false, priority },
          ],
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
      updatePriority: (id, priority) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, priority } : todo
          ),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);

// Counter Store
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
}));

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Mock API functions
const fetchUserData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    name: "John Doe",
    email: "john@example.com",
    id: ulid(),
    role: "Developer",
    timestamp: new Date().toISOString(),
  };
};

const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    { id: ulid(), name: "Laptop", price: 999, stock: 15 },
    { id: ulid(), name: "Mouse", price: 29, stock: 50 },
    { id: ulid(), name: "Keyboard", price: 79, stock: 30 },
  ];
};

const updateUserName = async (newName: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    name: newName,
    updatedAt: new Date().toISOString(),
  };
};

function StateUtilsContent() {
  const navigate = useNavigateWithTransition();
  const {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
    updatePriority,
  } = useTodoStore();
  const { count, increment, decrement, reset, incrementBy } =
    useCounterStore();

  const [newTodo, setNewTodo] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [activeTab, setActiveTab] = useState<
    "zustand" | "query" | "lodash" | "ulid"
  >("zustand");

  // React Query - Multiple queries
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

  const {
    data: products,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled: activeTab === "query",
  });

  // React Query - Mutation
  const [newName, setNewName] = useState("");
  const mutation = useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      refetch();
      setNewName("");
    },
  });

  // Lodash examples
  const [lodashResults, setLodashResults] = useState<any>({});
  const [ulidList, setUlidList] = useState<string[]>([]);

  useEffect(() => {
    const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const users = [
      { name: "Alice", age: 25, active: true, score: 85 },
      { name: "Bob", age: 30, active: false, score: 92 },
      { name: "Charlie", age: 25, active: true, score: 78 },
      { name: "David", age: 35, active: true, score: 88 },
    ];

    const products = [
      { name: "Laptop", category: "Electronics", price: 999 },
      { name: "Desk", category: "Furniture", price: 299 },
      { name: "Phone", category: "Electronics", price: 599 },
      { name: "Chair", category: "Furniture", price: 199 },
    ];

    setLodashResults({
      // Array methods
      chunk: _.chunk(sampleData, 3),
      shuffle: _.shuffle([...sampleData]),
      uniq: _.uniq([1, 2, 2, 3, 3, 3, 4]),
      flatten: _.flatten([[1, 2], [3, 4], [5]]),
      difference: _.difference([1, 2, 3, 4], [2, 4]),
      intersection: _.intersection([1, 2, 3], [2, 3, 4]),
      take: _.take(sampleData, 3),
      drop: _.drop(sampleData, 3),

      // Collection methods
      groupBy: _.groupBy(users, "age"),
      sortBy: _.sortBy(users, "score"),
      filter: _.filter(users, { active: true }),
      partition: _.partition(products, (p) => p.price > 300),
      keyBy: _.keyBy(users, "name"),

      // Object methods
      pick: _.pick(users[0], ["name", "age"]),
      omit: _.omit(users[0], ["score"]),
      merge: _.merge({}, { a: 1 }, { b: 2 }),
      mapValues: _.mapValues({ a: 1, b: 2 }, (v) => v * 2),

      // String methods
      camelCase: _.camelCase("hello world example"),
      kebabCase: _.kebabCase("HelloWorldExample"),
      snakeCase: _.snakeCase("helloWorldExample"),
      capitalize: _.capitalize("hello world"),

      // Utility text
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
              className={`flex-1 px-4 py-3 text-sm font-medium capitalize flex items-center justify-center text-center ${
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
            {/* Counter Store Example */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">
                Simple Counter Store
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="text-5xl font-bold text-blue-600">
                    {count}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={decrement}
                    variant="secondary"
                    className="w-full"
                  >
                    <LucideIcons.Minus className="w-4 h-4" />
                  </Button>
                  <Button onClick={reset} variant="secondary" className="w-full">
                    Reset
                  </Button>
                  <Button
                    onClick={increment}
                    variant="default"
                    className="w-full"
                  >
                    <LucideIcons.Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => incrementBy(5)}
                    variant="default"
                    size="sm"
                  >
                    +5
                  </Button>
                  <Button
                    onClick={() => incrementBy(10)}
                    variant="default"
                    size="sm"
                  >
                    +10
                  </Button>
                </div>
              </div>
            </Card>

            {/* Todo List Store Example */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">
                Todo List Store (Persisted)
              </h3>
              <div className="space-y-3">
                <div className="gap-2">
                  <Input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && newTodo.trim()) {
                        addTodo(newTodo, newTodoPriority);
                        setNewTodo("");
                      }
                    }}
                    className="flex-1 mb-2"
                  />
                  <Button
                    onClick={() => {
                      if (newTodo.trim()) {
                        addTodo(newTodo, newTodoPriority);
                        setNewTodo("");
                      }
                    }}
                    variant="default"
                  >
                    Add
                  </Button>
                </div>

                <div className="flex gap-2">
                  {(["low", "medium", "high"] as const).map((priority) => (
                    <Touchable
                      key={priority}
                      onClick={() => setNewTodoPriority(priority)}
                      className={`flex-1 px-3 py-2 text-xs rounded capitalize text-center ${
                        newTodoPriority === priority
                          ? priority === "high"
                            ? "bg-red-600 text-white"
                            : priority === "medium"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {priority}
                    </Touchable>
                  ))}
                </div>

                <div className="space-y-2 max-h-[400px] overflow-auto">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 mt-0.5 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span
                          className={`block text-sm ${
                            todo.completed
                              ? "line-through text-gray-400"
                              : "text-gray-900"
                          }`}
                        >
                          {todo.text}
                        </span>
                        <div className="flex gap-1 mt-1">
                          {(["low", "medium", "high"] as const).map(
                            (priority) => (
                              <Touchable
                                key={priority}
                                onClick={() => updatePriority(todo.id, priority)}
                                className={`px-2 py-0.5 text-xs rounded capitalize ${
                                  todo.priority === priority
                                    ? priority === "high"
                                      ? "bg-red-100 text-red-700 font-medium"
                                      : priority === "medium"
                                        ? "bg-blue-100 text-blue-700 font-medium"
                                        : "bg-gray-200 text-gray-700 font-medium"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {priority}
                              </Touchable>
                            )
                          )}
                        </div>
                      </div>
                      <Touchable
                        onClick={() => removeTodo(todo.id)}
                        className="text-red-600 text-sm px-2 shrink-0"
                      >
                        <LucideIcons.Trash2 className="w-4 h-4" />
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
                    <LucideIcons.CheckCheck className="w-4 h-4 mr-2" />
                    Clear Completed
                  </Button>
                )}
              </div>
            </Card>

            {/* Store Stats */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Store Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {todos.length}
                  </div>
                  <div className="text-xs text-blue-700">Total Todos</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {todos.filter((t) => t.completed).length}
                  </div>
                  <div className="text-xs text-green-700">Completed</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">
                    {todos.filter((t) => !t.completed).length}
                  </div>
                  <div className="text-xs text-amber-700">Active</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {count}
                  </div>
                  <div className="text-xs text-purple-700">Counter Value</div>
                </div>
              </div>
            </Card>

            {/* Zustand Features */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Zustand Features
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Simple, unopinionated state management</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Built-in persistence middleware</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>No boilerplate or providers needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>TypeScript support out of the box</span>
                </li>
              </ul>
            </Card>
          </>
        )}

        {/* React Query Tab */}
        {activeTab === "query" && (
          <>
            {/* User Data Query */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">
                Fetched User Data (useQuery)
              </h3>

              {isLoading && (
                <div className="text-center py-8">
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
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium">
                        {userData.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {userData.email}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Role:</span>
                      <Badge>{userData.role}</Badge>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">ID:</span>
                      <span className="text-xs font-mono break-all">
                        {userData.id}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
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
                    <LucideIcons.RefreshCw className="w-4 h-4 mr-2" />
                    Refetch Data
                  </Button>
                </div>
              )}
            </Card>

            {/* Mutation Example */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">
                Update User (useMutation)
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter new name..."
                    disabled={mutation.isPending}
                  />
                  <Button
                    onClick={() => {
                      if (newName.trim()) {
                        mutation.mutate(newName);
                      }
                    }}
                    variant="default"
                    disabled={mutation.isPending || !newName.trim()}
                  >
                    {mutation.isPending ? "Updating..." : "Update"}
                  </Button>
                </div>

                {mutation.isSuccess && (
                  <Alert>
                    <LucideIcons.CheckCircle className="w-4 h-4" />
                    Name updated successfully!
                  </Alert>
                )}

                {mutation.isError && (
                  <Alert variant="destructive">
                    <LucideIcons.XCircle className="w-4 h-4" />
                    Failed to update name
                  </Alert>
                )}
              </div>
            </Card>

            {/* Products Query */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">
                  Products List (Enabled Query)
                </h3>
                <Button
                  onClick={() => refetchProducts()}
                  variant="secondary"
                  size="sm"
                >
                  <LucideIcons.RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {productsLoading && (
                <div className="text-center py-4">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                </div>
              )}

              {products && (
                <div className="space-y-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          Stock: {product.stock}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        ${product.price}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* React Query Features */}
            <Card className="p-4 bg-green-50 border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                React Query Features
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Automatic background refetching</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Request deduplication</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Caching with stale time</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Loading & error states</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Mutations with optimistic updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Parallel & dependent queries</span>
                </li>
              </ul>
            </Card>
          </>
        )}

        {/* Lodash Tab */}
        {activeTab === "lodash" && (
          <>
            {/* Array Methods */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Array Methods
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.chunk([1-10], 3)
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {JSON.stringify(lodashResults.chunk, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.shuffle([1-10])
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs">
                    {JSON.stringify(lodashResults.shuffle)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.uniq([1,2,2,3,3,3,4])
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs">
                    {JSON.stringify(lodashResults.uniq)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.difference([1,2,3,4], [2,4])
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs">
                    {JSON.stringify(lodashResults.difference)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.intersection([1,2,3], [2,3,4])
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs">
                    {JSON.stringify(lodashResults.intersection)}
                  </pre>
                </div>
              </div>
            </Card>

            {/* Collection Methods */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Collection Methods
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.groupBy(users, 'age')
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {JSON.stringify(lodashResults.groupBy, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.sortBy(users, 'score')
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {JSON.stringify(lodashResults.sortBy, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.filter(users, &#123; active: true &#125;)
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {JSON.stringify(lodashResults.filter, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.partition(products, price &gt; 300)
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {JSON.stringify(lodashResults.partition, null, 2)}
                  </pre>
                </div>
              </div>
            </Card>

            {/* Object Methods */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Object Methods
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.pick(user, ['name', 'age'])
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs">
                    {JSON.stringify(lodashResults.pick, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.omit(user, ['score'])
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs">
                    {JSON.stringify(lodashResults.omit, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    _.merge(&#123;&#125;, &#123;a:1&#125;, &#123;b:2&#125;)
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-xs">
                    {JSON.stringify(lodashResults.merge)}
                  </pre>
                </div>
              </div>
            </Card>

            {/* String Methods */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                String Methods
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">_.camelCase()</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {lodashResults.camelCase}
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">_.kebabCase()</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {lodashResults.kebabCase}
                  </code>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">_.snakeCase()</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {lodashResults.snakeCase}
                  </code>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">_.capitalize()</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {lodashResults.capitalize}
                  </code>
                </div>
              </div>
            </Card>

            {/* Function Methods */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Function Methods
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Debounce (500ms)</p>
                    <Badge variant="secondary">_.debounce()</Badge>
                  </div>
                  <Input
                    onChange={(e) => debouncedUpdate(e.target.value)}
                    placeholder="Type to see debounce..."
                  />
                  <p className="text-xs text-gray-600 mt-2 p-2 bg-gray-100 rounded">
                    {lodashResults.debounced}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Throttle (2s limit)</p>
                    <Badge variant="secondary">_.throttle()</Badge>
                  </div>
                  <Button
                    onClick={throttledClick}
                    variant="secondary"
                    className="w-full"
                  >
                    Click Rapidly (Throttled)
                  </Button>
                  <p className="text-xs text-gray-600 mt-2 p-2 bg-gray-100 rounded">
                    {lodashResults.throttled}
                  </p>
                </div>
              </div>
            </Card>

            {/* Lodash Features */}
            <Card className="p-4 bg-amber-50 border-amber-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Lodash Benefits
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>200+ utility functions for common tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>Consistent cross-browser behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>Performance-optimized implementations</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>Functional programming helpers</span>
                </li>
              </ul>
            </Card>
          </>
        )}

        {/* ULID Tab */}
        {activeTab === "ulid" && (
          <>
            {/* ULID Generator */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                ULID Generator
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    const newId = ulid();
                    setUlidList((prev) => [newId, ...prev.slice(0, 9)]);
                  }}
                  variant="default"
                  className="w-full"
                >
                  <LucideIcons.Plus className="w-4 h-4 mr-2" />
                  Generate New ULID
                </Button>

                {ulidList.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Recent IDs ({ulidList.length})
                      </span>
                      <Button
                        onClick={() => setUlidList([])}
                        variant="secondary"
                        size="sm"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1 max-h-[400px] overflow-auto">
                      {ulidList.map((id, index) => (
                        <div
                          key={id}
                          className="flex items-center gap-2 p-3 bg-gray-50 rounded"
                        >
                          <Badge variant="secondary">{index + 1}</Badge>
                          <code className="text-xs font-mono flex-1 break-all">
                            {id}
                          </code>
                          <Touchable
                            onClick={() => {
                              navigator.clipboard.writeText(id);
                            }}
                            className="shrink-0"
                          >
                            <LucideIcons.Copy className="w-4 h-4 text-gray-600" />
                          </Touchable>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* ULID Anatomy */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">ULID Anatomy</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-mono text-sm mb-2">
                    01H8VYQJ7K{" "}
                    <span className="text-blue-600 font-bold">YZJPM9Z3RQ</span>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <div className="font-medium text-gray-700">Timestamp</div>
                      <div className="text-gray-600">48 bits (10 chars)</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-700">Randomness</div>
                      <div className="text-blue-600">80 bits (16 chars)</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Total length: 26 characters</p>
                  <p>• Uses Crockford's base32 for readability</p>
                  <p>• Lexicographically sortable by timestamp</p>
                  <p>• Case insensitive (uppercase normalized)</p>
                </div>
              </div>
            </Card>

            {/* ULID Features */}
            <Card className="p-4 bg-purple-50 border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                ULID Features
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>Lexicographically sortable by time</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>128-bit compatibility with UUID</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>Millisecond precision timestamp</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>No special characters (URL safe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>Monotonic sort order in same millisecond</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>Case insensitive & URL friendly</span>
                </li>
              </ul>
            </Card>

            {/* Comparison */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                ULID vs UUID
              </h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-medium text-green-700 mb-1">ULID</div>
                    <code className="text-xs">01H8VYQJ7KYZJPM9Z3RQ</code>
                    <div className="text-xs text-green-600 mt-1">
                      ✓ Sortable ✓ Compact
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-700 mb-1">UUID</div>
                    <code className="text-xs">
                      550e8400-e29b-41d4-a716-446655440000
                    </code>
                    <div className="text-xs text-gray-600 mt-1">
                      ✗ Random order
                    </div>
                  </div>
                </div>
              </div>
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
