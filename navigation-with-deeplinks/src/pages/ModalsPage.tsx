import { useState, useEffect } from "react";
import {
  Button,
  Touchable,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@shopify/shop-minis-react";
import { X, AlertCircle, CheckCircle } from "lucide-react";

export function ModalsPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation state when modal opens
  useEffect(() => {
    if (showFullScreenModal) {
      setIsAnimating(true);
    }
  }, [showFullScreenModal]);

  // Prevent background scrolling for full screen modal only (SDK components handle this automatically)
  useEffect(() => {
    if (!showFullScreenModal && !isAnimating) return;

    // Save current scroll position
    const scrollY = window.scrollY;

    // Lock scroll on body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll position
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [showFullScreenModal, isAnimating]);

  // Close modal with animation
  const closeFullScreenModal = () => {
    setIsAnimating(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setShowFullScreenModal(false);
    }, 300); // Match the transition duration
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold">Modals & Dialogs</h1>
        <p className="text-sm text-gray-600 mt-1">
          Demonstration of various modal patterns
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 pb-24">
        {/* Modal Triggers */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Modal Patterns</h2>
          <p className="text-sm text-gray-600 mb-4">
            Tap any button below to see different modal implementations. Each
            pattern demonstrates a different use case for mobile interfaces.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => setShowDialog(true)}
              className="w-full min-h-[52px]"
            >
              Show Dialog
            </Button>
            <Button
              onClick={() => setShowBottomSheet(true)}
              className="w-full min-h-[52px]"
              variant="secondary"
            >
              Show Bottom Sheet
            </Button>
            <Button
              onClick={() => setShowAlert(true)}
              className="w-full min-h-[52px]"
              variant="secondary"
            >
              Show Alert Dialog
            </Button>
            <Button
              onClick={() => setShowFullScreenModal(true)}
              className="w-full min-h-[52px]"
              variant="secondary"
            >
              Show Full Screen Modal
            </Button>
          </div>
        </div>

        {/* Pattern Descriptions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-3">Pattern Descriptions</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <div>
                <p className="font-medium">SDK AlertDialog</p>
                <p className="text-gray-600">
                  Confirmation dialog using the Shop Minis SDK AlertDialog
                  component
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <div>
                <p className="font-medium">SDK Drawer (Bottom Sheet)</p>
                <p className="text-gray-600">
                  Uses the SDK Drawer component - slides up from bottom for
                  mobile selections
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <div>
                <p className="font-medium">SDK Alert with Icon</p>
                <p className="text-gray-600">
                  SDK AlertDialog with custom icon for important notifications
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Full Screen Modal</p>
                <p className="text-gray-600">
                  Custom implementation for immersive, complex content
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Modal - Using SDK AlertDialog */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to proceed with this action? This uses the
              SDK AlertDialog component for proper modal behavior.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3">
            <AlertDialogCancel className="flex-1 min-h-[48px]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="flex-1 min-h-[48px]">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bottom Sheet - Using SDK Drawer */}
      <Drawer open={showBottomSheet} onOpenChange={setShowBottomSheet}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Bottom Sheet</DrawerTitle>
            <DrawerDescription>
              This is a bottom sheet pattern using the SDK Drawer component,
              commonly used for mobile interactions. It slides up from the
              bottom of the screen.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4">
            {/* Options List */}
            <div className="space-y-2 mb-6">
              {["Option 1", "Option 2", "Option 3"].map((option, index) => (
                <Touchable
                  key={index}
                  onClick={() => setShowBottomSheet(false)}
                  className="text-left px-4 py-4 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors border border-gray-200 min-h-[56px]"
                >
                  <div className="font-medium">{option}</div>
                  <div className="text-sm text-gray-500">
                    Description for {option.toLowerCase()}
                  </div>
                </Touchable>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Alert Dialog - Using SDK AlertDialog with Icon */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader className="items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <AlertDialogTitle className="text-center">
              Important Notice
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This is an alert dialog with an icon using the SDK AlertDialog
              component. Perfect for important notifications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full min-h-[52px]">
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Full Screen Modal */}
      {showFullScreenModal && (
        <div
          className={`fixed inset-0 bg-white z-50 flex flex-col transition-all duration-300 ease-out ${
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ touchAction: "pan-y" }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-lg font-semibold">Full Screen Modal</h3>
              <Touchable
                onClick={closeFullScreenModal}
                className="p-2 hover:bg-gray-100 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </Touchable>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Full Screen Experience
                </h2>
                <p className="text-gray-600">
                  This modal takes over the entire screen, perfect for complex
                  forms or immersive content.
                </p>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((section) => (
                  <div key={section} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-2">Section {section}</h4>
                    <p className="text-gray-600 text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
