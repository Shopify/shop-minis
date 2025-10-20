import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Tabs, Dialog, Switch } from "radix-ui";
import { create } from "zustand";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as _ from "lodash";
import { ulid } from "ulid";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
// import ClassNames from "embla-carousel-class-names"; // Unused in merged version
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  // horizontalListSortingStrategy, // Unused in merged version
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  useNavigateWithTransition,
  Card,
  Button,
  Input,
  Alert,
  // Badge, // Unused in merged version
  Touchable,
  Label,
} from "@shopify/shop-minis-react";
import { useLocation } from "react-router";

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

// DnD Components
interface Item {
  id: string;
  content: string;
  color: string;
}

function SortableItem({ item }: { item: Item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${
        item.color
      } p-4 rounded-lg text-white cursor-move touch-none ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{item.content}</span>
        <span className="text-xs opacity-75">Drag me</span>
      </div>
    </div>
  );
}

function AllLibrariesContent() {
  const navigate = useNavigateWithTransition();
  const location = useLocation();

  // Determine initial tab based on URL
  const getInitialTab = () => {
    const path = location.pathname;
    if (
      path.includes("motion") ||
      path.includes("lucide") ||
      path.includes("radix")
    ) {
      return "animation";
    } else if (
      path.includes("zustand") ||
      path.includes("react-query") ||
      path.includes("lodash") ||
      path.includes("ulid")
    ) {
      return "state";
    } else if (path.includes("embla") || path.includes("carousel")) {
      return "carousel";
    } else if (path.includes("dnd")) {
      return "dnd";
    }
    return "animation";
  };

  const [activeMainTab, setActiveMainTab] = useState(getInitialTab());

  // Animation & UI State
  const [showBox, setShowBox] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [animationTab, setAnimationTab] = useState("motion");

  // State & Utils
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState("");
  const [stateTab, setStateTab] = useState<
    "zustand" | "query" | "lodash" | "ulid"
  >("zustand");
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
  const [lodashResults, setLodashResults] = useState<any>({});

  // Carousel State
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);
  const [emblaRef3] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ speed: 1, stopOnInteraction: false }),
  ]);

  // DnD State
  const [activeId, setActiveId] = useState<string | null>(null);
  const [verticalItems, setVerticalItems] = useState<Item[]>([
    { id: "1", content: "Task 1", color: "bg-blue-500" },
    { id: "2", content: "Task 2", color: "bg-green-500" },
    { id: "3", content: "Task 3", color: "bg-purple-500" },
    { id: "4", content: "Task 4", color: "bg-red-500" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Carousel callbacks
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onSelect2 = useCallback(() => {
    if (!emblaApi2) return;
    setSelectedIndex2(emblaApi2.selectedScrollSnap());
  }, [emblaApi2]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi2) return;
    onSelect2();
    emblaApi2.on("select", onSelect2);
    return () => {
      emblaApi2.off("select", onSelect2);
    };
  }, [emblaApi2, onSelect2]);

  // Lodash demos
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

  // DnD handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleVerticalDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setVerticalItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const slides = Array.from({ length: 6 });
  const productSlides = [
    { id: 1, name: "Product 1", price: "$29.99", color: "bg-blue-500" },
    { id: 2, name: "Product 2", price: "$39.99", color: "bg-green-500" },
    { id: 3, name: "Product 3", price: "$49.99", color: "bg-purple-500" },
    { id: 4, name: "Product 4", price: "$59.99", color: "bg-red-500" },
  ];

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
              Third-Party Libraries
            </h1>
            <p className="text-xs text-gray-600">
              All supported libraries in one place
            </p>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto">
                    <Touchable
            onClick={() => setActiveMainTab("animation")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeMainTab === "animation"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Animation & UI
          </Touchable>
                    <Touchable
            onClick={() => setActiveMainTab("state")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeMainTab === "state"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            State & Utils
          </Touchable>
                    <Touchable
            onClick={() => setActiveMainTab("carousel")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeMainTab === "carousel"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Carousel
          </Touchable>
                    <Touchable
            onClick={() => setActiveMainTab("dnd")}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeMainTab === "dnd"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Drag & Drop
          </Touchable>
        </div>
      </div>

      {/* Content Areas */}
      <div className="flex-1 overflow-auto">
        {/* Animation & UI Content */}
        {activeMainTab === "animation" && (
          <Tabs.Root value={animationTab} onValueChange={setAnimationTab}>
            <Tabs.List className="flex bg-gray-100">
              <Tabs.Trigger
                value="motion"
                className="flex-1 px-4 py-2 text-sm data-[state=active]:bg-white"
              >
                Framer Motion
              </Tabs.Trigger>
              <Tabs.Trigger
                value="lucide"
                className="flex-1 px-4 py-2 text-sm data-[state=active]:bg-white"
              >
                Lucide Icons
              </Tabs.Trigger>
              <Tabs.Trigger
                value="radix"
                className="flex-1 px-4 py-2 text-sm data-[state=active]:bg-white"
              >
                Radix UI
              </Tabs.Trigger>
            </Tabs.List>

            {/* Framer Motion */}
            <Tabs.Content value="motion" className="p-4 space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Animations</h3>
                <Button
                  onClick={() => setShowBox(!showBox)}
                  variant="default"
                  className="w-full mb-4"
                >
                  Toggle Animation
                </Button>
                <AnimatePresence>
                  {showBox && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-lg text-white"
                    >
                      <p className="font-medium">Animated Box</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Gesture Animations
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 p-4 rounded-lg text-white text-center cursor-pointer"
                  >
                    Hover & Tap
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="bg-orange-500 p-4 rounded-lg text-white text-center"
                  >
                    Rotating
                  </motion.div>
                </div>
              </Card>
            </Tabs.Content>

            {/* Lucide Icons */}
            <Tabs.Content value="lucide" className="p-4 space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Icon Gallery
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <LucideIcons.Home className="w-6 h-6 text-gray-700" />
                    <span className="text-xs">Home</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <LucideIcons.ShoppingCart className="w-6 h-6 text-gray-700" />
                    <span className="text-xs">Cart</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <LucideIcons.User className="w-6 h-6 text-gray-700" />
                    <span className="text-xs">User</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <LucideIcons.Settings className="w-6 h-6 text-gray-700" />
                    <span className="text-xs">Settings</span>
                  </div>
                </div>
              </Card>
            </Tabs.Content>

            {/* Radix UI */}
            <Tabs.Content value="radix" className="p-4 space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Dialog</h3>
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                  <Dialog.Trigger asChild>
                    <Button variant="default">Open Dialog</Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90%] max-w-md z-50">
                      <Dialog.Title className="text-lg font-semibold mb-2">
                        Radix UI Dialog
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-gray-600 mb-4">
                        This is a dialog component from Radix UI.
                      </Dialog.Description>
                      <div className="flex gap-2 justify-end">
                        <Dialog.Close asChild>
                          <Button variant="secondary">Cancel</Button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                          <Button variant="default">Confirm</Button>
                        </Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Switch</h3>
                <div className="flex items-center gap-4">
                  <Label>
                    Enable notifications
                  </Label>
                  <Switch.Root
                    checked={switchChecked}
                    onCheckedChange={setSwitchChecked}
                    className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                  <span className="text-sm text-gray-500">
                    {switchChecked ? "On" : "Off"}
                  </span>
                </div>
              </Card>
            </Tabs.Content>
          </Tabs.Root>
        )}

        {/* State & Utils Content */}
        {activeMainTab === "state" && (
          <div>
            {/* Sub-tabs */}
            <div className="bg-gray-100 flex">
              {(["zustand", "query", "lodash", "ulid"] as const).map((tab) => (
                          <Touchable
                  key={tab}
                  onClick={() => setStateTab(tab)}
                  className={`flex-1 px-4 py-2 text-sm capitalize ${
                    stateTab === tab ? "bg-white" : ""
                  }`}
                >
                  {tab === "query" ? "React Query" : tab}
                </Touchable>
              ))}
            </div>

            <div className="p-4 space-y-4">
              {/* Zustand */}
              {stateTab === "zustand" && (
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
                  </div>
                </Card>
              )}

              {/* React Query */}
              {stateTab === "query" && (
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Fetched User Data
                  </h3>
                  {isLoading && <p>Loading...</p>}
                  {error && (
                    <Alert variant="destructive">
                      Error: {(error as Error).message}
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
              )}

              {/* Lodash */}
              {stateTab === "lodash" && (
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

              {/* ULID */}
              {stateTab === "ulid" && (
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    ULID Generator
                  </h3>
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
                    <div className="mt-4 p-3 bg-gray-100 rounded">
                      <p className="text-xs font-mono break-all">
                        {lodashResults.latestUlid}
                      </p>
                    </div>
                  )}
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Carousel Content */}
        {activeMainTab === "carousel" && (
          <div className="p-4 space-y-4">
            {/* Basic Carousel */}
            <Card className="overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900">Basic Carousel</h3>
              </div>
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_100%] min-w-0 relative aspect-[16/9]"
                    >
                      <div className="absolute inset-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                          <Touchable
                  onClick={scrollPrev}
                  className="p-2 rounded-lg bg-gray-100 active:bg-gray-200"
                >
                  ←
                </Touchable>
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                              <Touchable
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedIndex ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                          <Touchable
                  onClick={scrollNext}
                  className="p-2 rounded-lg bg-gray-100 active:bg-gray-200"
                >
                  →
                </Touchable>
              </div>
            </Card>

            {/* Autoplay Carousel */}
            <Card className="overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900">Autoplay Plugin</h3>
                <p className="text-xs text-gray-600">
                  Auto-advances every 3 seconds
                </p>
              </div>
              <div className="overflow-hidden" ref={emblaRef2}>
                <div className="flex">
                  {productSlides.map((slide) => (
                    <div key={slide.id} className="flex-[0_0_100%] min-w-0 p-4">
                      <div
                        className={`${slide.color} rounded-lg p-6 text-white`}
                      >
                        <h4 className="text-xl font-bold mb-2">{slide.name}</h4>
                        <p className="text-3xl font-bold mb-4">{slide.price}</p>
                        <Button variant="secondary" className="w-full">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 flex justify-center gap-2">
                {productSlides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedIndex2 ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </Card>

            {/* Auto Scroll */}
            <Card className="overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  Auto Scroll Plugin
                </h3>
                <p className="text-xs text-gray-600">
                  Continuous smooth scrolling
                </p>
              </div>
              <div className="overflow-hidden" ref={emblaRef3}>
                <div className="flex">
                  {[...productSlides, ...productSlides].map((slide, index) => (
                    <div
                      key={`${slide.id}-${index}`}
                      className="flex-[0_0_50%] min-w-0 p-2"
                    >
                      <div className="bg-white border rounded-lg p-4 text-center">
                        <div
                          className={`w-full h-20 ${slide.color} rounded mb-2`}
                        />
                        <p className="text-sm font-medium">{slide.name}</p>
                        <p className="text-lg font-bold">{slide.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Drag & Drop Content */}
        {activeMainTab === "dnd" && (
          <div className="p-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Sortable List
              </h3>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleVerticalDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
              >
                <SortableContext
                  items={verticalItems.map((i) => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {verticalItems.map((item) => (
                      <SortableItem key={item.id} item={item} />
                    ))}
                  </div>
                </SortableContext>
                <DragOverlay>
                  {activeId ? (
                    <div className="bg-gray-800 p-4 rounded-lg text-white shadow-2xl">
                      {verticalItems.find((i) => i.id === activeId)?.content}
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                DnD Kit Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Touch & keyboard support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Auto-scrolling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Customizable drag overlay</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Accessibility (ARIA attributes)</span>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export function AllLibrariesTest() {
  return (
    <QueryClientProvider client={queryClient}>
      <AllLibrariesContent />
    </QueryClientProvider>
  );
}
