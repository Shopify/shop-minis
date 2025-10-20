import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Tabs, Dialog, Switch } from "radix-ui";
import {
  useNavigateWithTransition,
  Card,
  Button,
  Touchable,
  Label,
} from "@shopify/shop-minis-react";

export function AnimationUILibraries() {
  const navigate = useNavigateWithTransition();
  const [showBox, setShowBox] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("motion");

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
            <h1 className="text-lg font-bold text-gray-900">Animation & UI</h1>
            <p className="text-xs text-gray-600">
              Framer Motion, Lucide Icons, Radix UI
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex bg-white border-b">
            <Tabs.Trigger
              value="motion"
              className="flex-1 px-4 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              Framer Motion
            </Tabs.Trigger>
            <Tabs.Trigger
              value="lucide"
              className="flex-1 px-4 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              Lucide Icons
            </Tabs.Trigger>
            <Tabs.Trigger
              value="radix"
              className="flex-1 px-4 py-3 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              Radix UI
            </Tabs.Trigger>
          </Tabs.List>

          {/* Framer Motion Tab */}
          <Tabs.Content value="motion" className="p-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Animations</h3>
              <div className="space-y-4">
                <Button
                  onClick={() => setShowBox(!showBox)}
                  variant="default"
                  className="w-full"
                >
                  Toggle Animation
                </Button>

                <AnimatePresence>
                  {showBox && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-lg text-white"
                    >
                      <p className="font-medium">Animated Box</p>
                      <p className="text-sm opacity-90">
                        Scales and fades in/out
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                  <p className="font-medium">Hover & Tap</p>
                  <p className="text-xs">Interactive</p>
                </motion.div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="bg-orange-500 p-4 rounded-lg text-white text-center"
                >
                  <p className="font-medium">Rotating</p>
                  <p className="text-xs">Continuous</p>
                </motion.div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Stagger Animation
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item * 0.1 }}
                    className="bg-blue-100 p-4 rounded-lg text-center"
                  >
                    <span className="text-blue-800 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Tabs.Content>

          {/* Lucide Icons Tab */}
          <Tabs.Content value="lucide" className="p-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Icon Gallery</h3>
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
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Search className="w-6 h-6 text-gray-700" />
                  <span className="text-xs">Search</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Heart className="w-6 h-6 text-gray-700" />
                  <span className="text-xs">Heart</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Star className="w-6 h-6 text-gray-700" />
                  <span className="text-xs">Star</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Bell className="w-6 h-6 text-gray-700" />
                  <span className="text-xs">Bell</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Icon Sizes & Colors
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <LucideIcons.Package className="w-4 h-4 text-blue-600" />
                  <LucideIcons.Package className="w-6 h-6 text-green-600" />
                  <LucideIcons.Package className="w-8 h-8 text-purple-600" />
                  <LucideIcons.Package className="w-10 h-10 text-red-600" />
                </div>

                <div className="flex items-center gap-4">
                  <LucideIcons.Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                  <span className="text-sm">Animated spinner</span>
                </div>
              </div>
            </Card>
          </Tabs.Content>

          {/* Radix UI Tab */}
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
                      This is a dialog component from Radix UI. It's accessible
                      and customizable.
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

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Unstyled, accessible components</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Full keyboard navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>WAI-ARIA compliant</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Composable primitives</span>
                </li>
              </ul>
            </Card>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
