import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  useNavigateWithTransition,
  Card,
  Button,
  Touchable,
} from "@shopify/shop-minis-react";

export function EmojiLibraries() {
  const navigate = useNavigateWithTransition();
  const [selectedEmojis, setSelectedEmojis] = useState<any[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTheme, setPickerTheme] = useState<"light" | "dark" | "auto">(
    "light"
  );
  const [emojiSize, setEmojiSize] = useState(32);
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmojis((prev) => [...prev, emoji]);
    setRecentEmojis((prev) => {
      const newRecents = [
        emoji.native,
        ...prev.filter((e) => e !== emoji.native),
      ];
      return newRecents.slice(0, 20);
    });
  };

  const clearEmojis = () => {
    setSelectedEmojis([]);
  };

  const frequentlyUsed = [
    "❤️",
    "😊",
    "🎉",
    "👍",
    "🔥",
    "✨",
    "💯",
    "🚀",
    "🎨",
    "⭐",
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
            <h1 className="text-lg font-bold text-gray-900">Emoji Libraries</h1>
            <p className="text-xs text-gray-600">
              Emoji Mart - Emoji picker component
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Selected Emojis */}
        {selectedEmojis.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                Selected Emojis ({selectedEmojis.length})
              </h3>
              <Button onClick={clearEmojis} variant="secondary" size="sm">
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedEmojis.map((emoji, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1 p-2 bg-gray-100 rounded"
                >
                  <span style={{ fontSize: `${emojiSize}px` }}>
                    {emoji.native}
                  </span>
                  <span className="text-xs text-gray-600">{emoji.name}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Picker Controls */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Emoji Picker</h3>
          <div className="space-y-3">
            <Button
              onClick={() => setShowPicker(!showPicker)}
              variant="default"
              className="w-full"
            >
              {showPicker ? "Hide" : "Show"} Emoji Picker
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={() => setPickerTheme("light")}
                variant={pickerTheme === "light" ? "default" : "secondary"}
                size="sm"
                className="flex-1"
              >
                Light
              </Button>
              <Button
                onClick={() => setPickerTheme("dark")}
                variant={pickerTheme === "dark" ? "default" : "secondary"}
                size="sm"
                className="flex-1"
              >
                Dark
              </Button>
              <Button
                onClick={() => setPickerTheme("auto")}
                variant={pickerTheme === "auto" ? "default" : "secondary"}
                size="sm"
                className="flex-1"
              >
                Auto
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Size:</span>
              <input
                type="range"
                min="16"
                max="64"
                value={emojiSize}
                onChange={(e) => setEmojiSize(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-mono">{emojiSize}px</span>
            </div>
          </div>

          {/* Emoji Picker */}
          {showPicker && (
            <div className="mt-4 flex justify-center">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme={pickerTheme}
                previewPosition="none"
                skinTonePosition="search"
                maxFrequentRows={2}
                perLine={8}
              />
            </div>
          )}
        </Card>

        {/* Recent Emojis */}
        {recentEmojis.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Recent Emojis</h3>
            <div className="flex flex-wrap gap-2">
              {recentEmojis.map((emoji, index) => (
                          <Touchable
                  key={index}
                  onClick={() => {
                    const emojiObj = { native: emoji, name: "recent" };
                    setSelectedEmojis((prev) => [...prev, emojiObj]);
                  }}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  style={{ fontSize: "24px" }}
                >
                  {emoji}
                </Touchable>
              ))}
            </div>
          </Card>
        )}

        {/* Frequently Used */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Frequently Used Emojis
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {frequentlyUsed.map((emoji) => (
                        <Touchable
                key={emoji}
                onClick={() => {
                  const emojiObj = { native: emoji, name: "frequent" };
                  handleEmojiSelect(emojiObj);
                }}
                className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg text-2xl hover:bg-gray-200 transition-colors"
              >
                {emoji}
              </Touchable>
            ))}
          </div>
        </Card>

        {/* Emoji Categories Demo */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Emoji Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">😀</span>
              <span className="text-sm">Smileys & People</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🐻</span>
              <span className="text-sm">Animals & Nature</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🍔</span>
              <span className="text-sm">Food & Drink</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚽</span>
              <span className="text-sm">Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">✈️</span>
              <span className="text-sm">Travel & Places</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-sm">Objects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔤</span>
              <span className="text-sm">Symbols</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎌</span>
              <span className="text-sm">Flags</span>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Emoji Mart Features
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Search emojis by name or keywords</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Recent & frequently used emojis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Skin tone variations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Categories for easy browsing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Customizable themes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Native emoji rendering</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Lightweight & performant</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
