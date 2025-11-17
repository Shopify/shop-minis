# Navigation with Deeplinks - Shop Mini Demo

A comprehensive demonstration of navigation patterns, view transitions, and deeplinking in Shop Minis. This example showcases best practices for building mobile-first navigation experiences within the Shop App.

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

## Best Practices Demonstrated

1. **SDK-First Approach**: Uses Shop Minis React SDK components (Button, List, Alert)
2. **Mobile Optimization**: Touch targets, safe areas, and mobile-native patterns
3. **Performance**: List virtualization for large datasets
4. **Accessibility**: Proper ARIA labels and semantic HTML
5. **Type Safety**: Full TypeScript implementation
6. **View Transitions**: Smooth animations between routes
7. **Deeplinking**: Complete support for shareable URLs

## Learn More

- [Shop Minis Documentation](https://shopify.dev/docs/api/shop-minis)

## Contributing

This is an example project demonstrating Shop Minis capabilities. Feel free to use it as a starting point for your own Shop Mini!

---

**Note**: This mini requires installation of dependencies before running. Make sure to run `npm install` first.

