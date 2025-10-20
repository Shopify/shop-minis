import { useState } from "react";
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
  horizontalListSortingStrategy,
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
  Badge,
  Touchable,
} from "@shopify/shop-minis-react";

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

function HorizontalSortableItem({ item }: { item: Item }) {
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
      } p-6 rounded-lg text-white cursor-move touch-none flex-shrink-0 w-32 h-32 flex items-center justify-center ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <span className="font-bold text-lg">{item.content}</span>
    </div>
  );
}

export function DragDropTest() {
  const navigate = useNavigateWithTransition();
  const [activeId, setActiveId] = useState<string | null>(null);

  const [verticalItems, setVerticalItems] = useState<Item[]>([
    { id: "1", content: "Task 1", color: "bg-blue-500" },
    { id: "2", content: "Task 2", color: "bg-green-500" },
    { id: "3", content: "Task 3", color: "bg-purple-500" },
    { id: "4", content: "Task 4", color: "bg-red-500" },
    { id: "5", content: "Task 5", color: "bg-yellow-500" },
  ]);

  const [horizontalItems, setHorizontalItems] = useState<Item[]>([
    { id: "h1", content: "A", color: "bg-indigo-500" },
    { id: "h2", content: "B", color: "bg-pink-500" },
    { id: "h3", content: "C", color: "bg-teal-500" },
    { id: "h4", content: "D", color: "bg-orange-500" },
  ]);

  const [kanbanColumns] = useState({
    todo: [
      { id: "k1", content: "Design mockups", color: "bg-gray-500" },
      { id: "k2", content: "Write documentation", color: "bg-gray-500" },
    ],
    inProgress: [
      { id: "k3", content: "Implement feature", color: "bg-blue-500" },
    ],
    done: [
      { id: "k4", content: "Code review", color: "bg-green-500" },
      { id: "k5", content: "Testing", color: "bg-green-500" },
    ],
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleHorizontalDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setHorizontalItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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
            <h1 className="text-lg font-bold text-gray-900">Drag & Drop</h1>
            <p className="text-xs text-gray-600">DnD Kit - Touch optimized</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Vertical List */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Sortable List</h3>

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

        {/* Horizontal List */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">
            Horizontal Sortable
          </h3>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleHorizontalDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <SortableContext
              items={horizontalItems.map((i) => i.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-3 overflow-x-auto pb-2">
                {horizontalItems.map((item) => (
                  <HorizontalSortableItem key={item.id} item={item} />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <div className="bg-gray-800 p-6 rounded-lg text-white shadow-2xl w-32 h-32 flex items-center justify-center">
                  <span className="font-bold text-lg">
                    {horizontalItems.find((i) => i.id === activeId)?.content}
                  </span>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </Card>

        {/* Kanban Board Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Kanban Board</h3>
          <p className="text-sm text-gray-600 mb-4">
            Drag items between columns (simplified demo)
          </p>

          <div className="grid grid-cols-3 gap-3">
            {Object.entries(kanbanColumns).map(([column, items]) => (
              <div key={column} className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm capitalize">
                    {column.replace(/([A-Z])/g, " $1")}
                  </h4>
                  <Badge variant="secondary">{items.length}</Badge>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`${item.color} p-2 rounded text-white text-xs`}
                    >
                      {item.content}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Features */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">DnD Kit Features</h3>
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
              <span>Collision detection algorithms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Modifiers (constraints, snapping)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Accessibility (ARIA attributes)</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
