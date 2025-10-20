# Kitchen Sink - Shop Minis Demo App

A comprehensive demonstration app showcasing the capabilities of the Shop Minis platform. This project serves as a reference implementation for building mobile-first shopping experiences within the Shopify Shop App.

## Purpose

The Kitchen Sink app demonstrates best practices and available features for Shop Minis developers, including:

- **SDK Components & Hooks** - All available Shop Minis SDK components and hooks
- **Third-Party Libraries** - Integration examples for 50+ supported libraries
- **Mobile-First Design** - Touch-optimized UI patterns and interactions
- **Performance Optimization** - Lazy loading, virtualization, and efficient rendering

## Quick Start

```bash
npm install                # Install dependencies
npx shop-minis dev         # Start development server

# Then press:
# - 'i' for iOS Simulator
# - 'a' for Android Emulator
# - 'q' for QR code (physical device)
```

## What's Included

### 📱 SDK Components (20 demos)

**User & Auth**
- `useCurrentUser` - Access current Shop app user data
- `useGenerateUserToken` - Generate JWT tokens for backend API calls

**Products & Commerce**
- `useProductSearch` - Search products across Shop
- `usePopularProducts` - Fetch trending products
- `useShopCartActions` - Add to cart, manage cart items
- `useShopNavigation` - Navigate to Shop app screens

**Storage**
- `useAsyncStorage` - Persistent key-value storage
- `useSecureStorage` - Encrypted secure storage

**Media & Camera**
- `useImagePicker` - Access camera and photo library
- Camera Access - Native camera integration
- `Image` - Optimized image loading with lazy loading
- `VideoPlayer` - Native video playback

**UI Components**
- `ProductCard` - Product display cards
- `MerchantCard` - Shop/merchant cards
- `List` - Virtualized lists for performance
- `Button` - Various button styles and states
- `Alert` & `Badge` - Notification and status badges
- `Skeleton` - Loading state placeholders
- `Card`, `Input`, `Label` - Form components
- `Search` - Search input component

### 📚 Third-Party Libraries (6 categories)

**Animation & UI**
- Framer Motion - Smooth animations
- Lucide React - Icon library
- Radix UI - Accessible primitives

**State & Utilities**
- Zustand - Lightweight state management
- TanStack Query - Data fetching and caching
- Lodash - Utility functions
- ULID - Unique identifiers

**Carousel**
- Embla Carousel - Touch-optimized carousels
- Autoplay, AutoScroll, and ClassName plugins

**Drag & Drop**
- DnD Kit - Touch-first drag and drop
- Sortable lists and draggable items

**Emoji**
- Emoji Mart - Complete emoji picker

**3D Graphics**
- Three.js - 3D rendering
- React Three Fiber - Declarative 3D with React

## Key Features Demonstrated

✨ **Mobile-First Development**
- Touch-optimized interactions with `Touchable` component
- Minimum 48px touch targets for accessibility
- No hover states, designed for touch

🎨 **SDK Component Best Practices**
- 100% SDK component usage (no custom buttons, images, or labels)
- Proper use of `Image` component with `aspectRatio` and `objectFit`
- Virtualized lists for performance with large datasets

🔐 **Security & Permissions**
- Camera, microphone, and motion sensor permissions
- Secure token generation for backend authentication
- Encrypted secure storage for sensitive data

⚡ **Performance Optimization**
- Lazy loading images
- List virtualization (tested with 1000+ items)
- Efficient re-renders with proper React patterns

## Project Structure

```
src/
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
├── manifest.json        # Mini configuration & permissions
├── index.css            # Global styles (imports SDK styles)
├── pages/               # Main navigation pages (3)
├── sdk-tests/           # SDK component demos (20)
└── libraries/           # Third-party library demos (11)
```

## Development Notes

- **TypeScript**: All files use strict TypeScript
- **Tailwind CSS v4**: Utility-first styling
- **React Router**: Client-side routing with view transitions
- **SDK-First**: Always uses SDK components before custom solutions

## Learn More

- [Shop Minis Documentation](https://shopify.dev/docs/api/shop-minis)
- [SDK API Reference](https://shopify.dev/docs/api/shop-minis/react)
- [Allowed Dependencies](https://shopify.dev/docs/api/shop-minis/dependencies)

---

**Built with ❤️ as a reference for Shop Minis developers**

