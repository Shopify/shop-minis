import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Tabs, Dialog, Switch, Accordion, Checkbox, RadioGroup, Slider, Progress, Separator} from "radix-ui";
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
  const [staggerKey, setStaggerKey] = useState(0);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue, setProgressValue] = useState(33);

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
              <h3 className="font-semibold text-gray-900">Animations</h3>
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
                      className="bg-linear-to-br from-blue-500 to-purple-600 p-6 rounded-lg text-white"
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
              <h3 className="font-semibold text-gray-900">
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
              <h3 className="font-semibold text-gray-900">
                Stagger Animation
              </h3>
              <div className="space-y-4">
                <Button
                  onClick={() => setStaggerKey(prev => prev + 1)}
                  variant="default"
                  className="w-full"
                >
                  Replay Stagger Animation
                </Button>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <motion.div
                      key={`${staggerKey}-${item}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item * 0.1 }}
                      className="bg-blue-100 p-4 rounded-lg text-center"
                    >
                      <span className="text-blue-800 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </Tabs.Content>

          {/* Lucide Icons Tab */}
          <Tabs.Content value="lucide" className="p-4 space-y-4">
            {/* E-commerce Icons */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">E-commerce</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.ShoppingCart className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Cart</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.ShoppingBag className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Bag</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Package className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Package</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.CreditCard className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Card</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Wallet className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Wallet</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Receipt className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Receipt</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Tag className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Tag</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Gift className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Gift</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Store className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Store</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.TrendingUp className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Trending</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.BarChart className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Chart</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.DollarSign className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Price</span>
                </div>
              </div>
            </Card>

            {/* Navigation Icons */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Navigation</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Home className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Menu className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Menu</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.ArrowLeft className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Back</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.ArrowRight className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Forward</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.ChevronDown className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Down</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.ChevronUp className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Up</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.ExternalLink className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">External</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Compass className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Compass</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Navigation className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Navigate</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.MapPin className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Location</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Map className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Map</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Layers className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Layers</span>
                </div>
              </div>
            </Card>

            {/* User & Social Icons */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">User & Social</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.User className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">User</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Users className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Users</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.UserPlus className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Add User</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Heart className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Like</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Star className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Favorite</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Share2 className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Share</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.ThumbsUp className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Like</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.MessageCircle className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Chat</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.AtSign className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Mention</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Bookmark className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Save</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Award className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Award</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Smile className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Emoji</span>
                </div>
              </div>
            </Card>

            {/* Communication Icons */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Communication</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Mail className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Mail</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Send className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Send</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Phone className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Phone</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Video className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Video</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Mic className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Mic</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Bell className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Notify</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.MessageSquare className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Message</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Inbox className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Inbox</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.BellRing className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Alert</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.PhoneCall className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Call</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Voicemail className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Voice</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Rss className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Feed</span>
                </div>
              </div>
            </Card>

            {/* Media Icons */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Media</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Image className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Image</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Camera className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Camera</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Play className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Play</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Pause className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Pause</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Volume2 className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Volume</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Music className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Music</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Film className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Film</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Youtube className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">YouTube</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Instagram className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Instagram</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Maximize className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Fullscreen</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.SkipForward className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Next</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.SkipBack className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Previous</span>
                </div>
              </div>
            </Card>

            {/* Files & Documents */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Files & Documents</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.File className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">File</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.FileText className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Document</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Folder className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Folder</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Download className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Download</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Upload className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Upload</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Paperclip className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Attach</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Archive className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Archive</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Clipboard className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Copy</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Copy className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Duplicate</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Save className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Save</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Printer className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Print</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Scan className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Scan</span>
                </div>
              </div>
            </Card>

            {/* UI Actions */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">UI Actions</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Settings className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Settings</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Search className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Search</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Filter className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Filter</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.SlidersHorizontal className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Adjust</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Edit className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Edit</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Trash2 className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Delete</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Plus className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Add</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Minus className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Remove</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.X className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Close</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Check className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Done</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.MoreVertical className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">More</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.MoreHorizontal className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Menu</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.RefreshCw className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Refresh</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Repeat className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Repeat</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Lock className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Lock</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Unlock className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Unlock</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Eye className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">View</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.EyeOff className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Hide</span>
                </div>
              </div>
            </Card>

            {/* Status & Alerts */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Status & Alerts</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-xs text-center">Success</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.XCircle className="w-6 h-6 text-red-600" />
                  <span className="text-xs text-center">Error</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.AlertCircle className="w-6 h-6 text-orange-600" />
                  <span className="text-xs text-center">Warning</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Info className="w-6 h-6 text-blue-600" />
                  <span className="text-xs text-center">Info</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.HelpCircle className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Help</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <span className="text-xs text-center">Caution</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Zap className="w-6 h-6 text-purple-600" />
                  <span className="text-xs text-center">Fast</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Loader2 className="w-6 h-6 animate-spin text-gray-700" />
                  <span className="text-xs text-center">Loading</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Clock className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Time</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Calendar className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Date</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.Wifi className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Online</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <LucideIcons.WifiOff className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-center">Offline</span>
                </div>
              </div>
            </Card>

            {/* Icon Sizes & Colors Demo */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">
                Sizes & Colors
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <LucideIcons.Package className="w-4 h-4 text-blue-600" />
                  <LucideIcons.Package className="w-6 h-6 text-green-600" />
                  <LucideIcons.Package className="w-8 h-8 text-purple-600" />
                  <LucideIcons.Package className="w-10 h-10 text-red-600" />
                  <LucideIcons.Package className="w-12 h-12 text-orange-600" />
                </div>
              </div>
            </Card>
          </Tabs.Content>

          {/* Radix UI Tab */}
          <Tabs.Content value="radix" className="p-4 space-y-4">
            {/* Dialog */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Dialog</h3>
              <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                <Dialog.Trigger asChild>
                  <Button variant="default" className="w-full">Open Dialog</Button>
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

            {/* Accordion */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Accordion</h3>
              <Accordion.Root type="single" collapsible className="space-y-2">
                <Accordion.Item value="item-1" className="border border-gray-200 rounded-lg overflow-hidden">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-sm">What is Radix UI?</span>
                      <LucideIcons.ChevronDown className="w-4 h-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-4 py-3 text-sm text-gray-600">
                    Radix UI is a library of unstyled, accessible components for building high-quality design systems and web apps.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="item-2" className="border border-gray-200 rounded-lg overflow-hidden">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-sm">Why use it?</span>
                      <LucideIcons.ChevronDown className="w-4 h-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-4 py-3 text-sm text-gray-600">
                    It handles accessibility, keyboard navigation, and screen reader support out of the box, letting you focus on design.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="item-3" className="border border-gray-200 rounded-lg overflow-hidden">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-sm">Mobile friendly?</span>
                      <LucideIcons.ChevronDown className="w-4 h-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-4 py-3 text-sm text-gray-600">
                    Yes! All components work great on touch devices and follow mobile best practices.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </Card>

            {/* Switch */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Switch</h3>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Enable notifications</Label>
                <div className="flex items-center gap-3">
                  <Switch.Root
                    checked={switchChecked}
                    onCheckedChange={setSwitchChecked}
                    className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                  <span className="text-sm text-gray-500 min-w-[32px]">
                    {switchChecked ? "On" : "Off"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Checkbox */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Checkbox</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox.Root
                    checked={checkboxChecked}
                    onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                    className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-colors"
                  >
                    <Checkbox.Indicator>
                      <LucideIcons.Check className="w-4 h-4 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <Label className="text-sm">I agree to the terms and conditions</Label>
                </div>
              </div>
            </Card>

            {/* Radio Group */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Radio Group</h3>
              <RadioGroup.Root value={radioValue} onValueChange={setRadioValue} className="space-y-3">
                <div className="flex items-center gap-3">
                  <RadioGroup.Item
                    value="option1"
                    className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center data-[state=checked]:border-blue-600"
                  >
                    <RadioGroup.Indicator className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                  </RadioGroup.Item>
                  <Label className="text-sm">Standard shipping (5-7 days)</Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item
                    value="option2"
                    className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center data-[state=checked]:border-blue-600"
                  >
                    <RadioGroup.Indicator className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                  </RadioGroup.Item>
                  <Label className="text-sm">Express shipping (2-3 days)</Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item
                    value="option3"
                    className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center data-[state=checked]:border-blue-600"
                  >
                    <RadioGroup.Indicator className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                  </RadioGroup.Item>
                  <Label className="text-sm">Overnight shipping (1 day)</Label>
                </div>
              </RadioGroup.Root>
            </Card>

            {/* Slider */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Slider</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price range</span>
                  <span className="font-medium">${sliderValue[0]}</span>
                </div>
                <Slider.Root
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="relative flex items-center w-full h-5 touch-none"
                >
                  <Slider.Track className="relative h-1 w-full bg-gray-300 rounded-full touch-none">
                    <Slider.Range className="absolute h-full bg-blue-600 rounded-full" />
                  </Slider.Track>
                  <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 touch-none" />
                </Slider.Root>
              </div>
            </Card>

            {/* Progress */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Order processing</span>
                  <span className="font-medium">{progressValue}%</span>
                </div>
                <Progress.Root value={progressValue} max={100} className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <Progress.Indicator
                    style={{ width: `${progressValue}%` }}
                    className="h-full bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-300"
                  />
                </Progress.Root>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                    className="flex-1"
                  >
                    -10%
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                    className="flex-1"
                  >
                    +10%
                  </Button>
                </div>
              </div>
            </Card>

            {/* Separator */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">Separator</h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Product details</p>
                <Separator.Root className="h-px bg-gray-200" />
                <p className="text-sm text-gray-600">Shipping information</p>
                <Separator.Root className="h-px bg-gray-200" />
                <p className="text-sm text-gray-600">Return policy</p>
              </div>
            </Card>

            {/* Features Summary */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Why Radix UI?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Unstyled, accessible components</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Full keyboard navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>WAI-ARIA compliant</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Composable primitives</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Touch-friendly for mobile</span>
                </li>
              </ul>
            </Card>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
