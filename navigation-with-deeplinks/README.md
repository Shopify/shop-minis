# Navigation with Deeplinks - Shop Mini Demo

A comprehensive demonstration of navigation patterns, view transitions, and deeplinking in Shop Minis. This example showcases best practices for building mobile-first navigation experiences within the Shopify Shop App.

## Features

### 🎯 Core Navigation Patterns

1. **Tab-Based Navigation**
   - 3 tabs with intuitive icons
   - Active state indication
   - Fixed bottom tab bar for easy thumb access
   - Smooth transitions between tabs

2. **Long List Pattern**
   - Virtualized list with 100+ items for performance
   - Smooth transitions to detail views
   - Back navigation with proper state management
   - Deep linking support for individual items

3. **Modal Patterns**
   - Dialog modals (center-screen)
   - Bottom sheets (mobile-native)
   - Alert dialogs with icons
   - Full-screen modals for immersive content

4. **View Transitions**
   - Enabled via `MinisRouter` with `viewTransitions` prop
   - Smooth animated transitions between pages
   - Native-feeling navigation experience

### 🔗 Deeplinking Support

All pages support deeplinking with the following paths:

- `/` - List page (master view)
- `/item/:id` - Detail page (e.g., `/item/item-42`)
- `/modals` - Modals demonstration page
- `/settings` - Settings page

The `useDeeplink` hook automatically handles incoming deeplinks and navigates to the appropriate page.

## Project Structure

```
src/
├── App.tsx                 # Main app with routing and deeplink handling
├── components/
│   └── TabBar.tsx         # Bottom tab bar component
├── pages/
│   ├── ListPage.tsx       # Master view with virtualized list
│   ├── DetailPage.tsx     # Detail view for list items
│   ├── ModalsPage.tsx     # Modal patterns demonstration
│   └── SettingsPage.tsx   # Settings with various UI patterns
└── main.tsx               # Entry point
```

## Getting Started

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

### Testing on Devices

When the dev server is running, press:

- `i` - Open in iOS Simulator
- `a` - Open in Android Emulator  
- `q` - Show QR code for physical device testing

## Key Implementation Details

### 1. MinisRouter with View Transitions

```tsx
<MinisRouter viewTransitions>
  <Routes>
    <Route path="/" element={<ListPage />} />
    <Route path="/item/:id" element={<DetailPage />} />
    {/* ... more routes */}
  </Routes>
</MinisRouter>
```

### 2. Deeplink Handling

```tsx
function DeeplinkHandler() {
  const deeplink = useDeeplink()
  const navigate = useNavigateWithTransition()

  useEffect(() => {
    if (deeplink) {
      navigate(deeplink)
    }
  }, [deeplink, navigate])

  return null
}
```

### 3. Navigation with Transitions

```tsx
const navigate = useNavigateWithTransition()

// Navigate to a detail page
navigate('/item/item-42')

// Navigate to a different tab
navigate('/modals')
```

### 4. Virtualized Lists for Performance

```tsx
<List
  items={items}
  height={window.innerHeight - 140 - 76}
  showScrollbar={true}
  renderItem={item => (
    <button onClick={() => navigate(`/item/${item.id}`)}>
      {/* Item content */}
    </button>
  )}
/>
```

## Mobile-First Design Principles

### Touch Targets
- All interactive elements have a minimum height of 48px
- Tab bar items are 60px tall for easy thumb access
- Buttons use `min-h-[52px]` for comfortable tapping

### Safe Areas
- Tab bar includes `safe-area-inset-bottom` for devices with home indicators
- Content areas account for fixed headers and tab bars

### Performance
- List virtualization for 100+ items
- Smooth view transitions
- Optimized re-renders with proper React hooks

## Navigation Patterns Demonstrated

### 1. List Page (Master View)
- Displays 100 items in a virtualized list
- Each item navigates to a detail page
- Category badges and descriptions
- Proper touch feedback

### 2. Detail Page
- Back navigation to list
- Rich product-like layout
- Action buttons (Add to Cart, Share)
- Additional information sections
- Mobile-optimized spacing

### 3. Modals Page
Four distinct modal patterns:

#### Dialog Modal
- Center-screen overlay
- Confirmation/action dialogs
- Backdrop click to dismiss

#### Bottom Sheet
- Slides up from bottom
- Visual handle indicator
- Perfect for mobile selections
- Touch-optimized options list

#### Alert Dialog
- Icon-based notifications
- Centered text layout
- Single call-to-action

#### Full-Screen Modal
- Takes over entire viewport
- Sticky header and footer
- Scrollable content area
- Complex forms or immersive experiences

### 4. Settings Page
- Profile section
- Grouped settings
- Toggle switches
- Navigation items
- Action buttons

## Deeplinking Examples

Share these URLs to test deeplink navigation:

```
mini://navigation-with-deeplinks/
mini://navigation-with-deeplinks/item/item-42
mini://navigation-with-deeplinks/modals
mini://navigation-with-deeplinks/settings
```

## Best Practices Demonstrated

1. **SDK-First Approach**: Uses Shop Minis React SDK components (Button, List, Alert)
2. **Mobile Optimization**: Touch targets, safe areas, and mobile-native patterns
3. **Performance**: List virtualization for large datasets
4. **Accessibility**: Proper ARIA labels and semantic HTML
5. **Type Safety**: Full TypeScript implementation
6. **View Transitions**: Smooth animations between routes
7. **Deeplinking**: Complete support for shareable URLs

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Client-side routing
- **@shopify/shop-minis-react** - Shop Minis SDK
- **Tailwind CSS v4** - Styling
- **Lucide React** - Consistent icons

## Learn More

- [Shop Minis Documentation](https://shopify.dev/docs/api/shop-minis)
- [Navigation Patterns Guide](https://shopify.dev/docs/api/shop-minis/navigation)
- [Deeplinking Guide](https://shopify.dev/docs/api/shop-minis/deeplinking)

## Contributing

This is an example project demonstrating Shop Minis capabilities. Feel free to use it as a starting point for your own Shop Mini!

---

**Note**: This mini requires installation of dependencies before running. Make sure to run `npm install` first.

