# React Native Currency List Component

A reusable `CurrencyList` component, designed to display and filter both Crypto and Fiat currencies. A `DemoScreen` is provided to demonstrate usage scenarios.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Tech Stack

* **React Native**
* **TypeScript**
* **Zustand** for state management
* **AsyncStorage** for persistent storage

---

## Project Structure (only includes main files)

```
app/
├── components/
│   └── CurrencyList.tsx         # Reusable currency list component
├── screens/
│   └── DemoScreen.tsx           # Demo view to test and showcase functionality
├── store/
│   └── currencyStore.ts         # Zustand-based store with AsyncStorage persistence
├── models/
│   └── CurrencyInfo.ts          # Type definition for currency data
├── utils/
│   └── storage.ts               # AsyncStorage wrapper for data persistence
```

---

## Component: CurrencyList

### Props

```ts
type Props = {
  data: CurrencyInfo[]
  searchTerm?: string // Optional filter term passed in from parent
}
```

### Features

* Displays a scrollable list of currencies
* Shows empty state if no results match
* Can filter the data by a search keyword 
* Fully controlled via parent (search logic is not handled internally)

---

## DemoScreen Functionalities

The `DemoScreen` provides 3 main interaction areas:

### Filter Chips
Three filter options at the top of the screen:
1. **All** - Shows all currencies
2. **Crypto** - Shows only cryptocurrency entries
3. **Fiat** - Shows only fiat currency entries

### Floating Action Menu
A floating action button (FAB) that expands to reveal three actions:
1. **Clear Data** - Clears all currency data from storage
2. **Add Random Currency** - Adds a random currency to the list
3. **Reset Data** - Resets to initial demo data

### Search Functionality
Includes a **search bar** above the list, which:
* Filters the list using the matching rules above
* Allows cancelling the search via back/clear buttons

---

## Data Format

### `CurrencyInfo`

```ts
type CurrencyInfo = {
  id: string
  name: string
  symbol: string
  code?: string // Optional, for fiat currencies only
}
```

### Sample Data

#### Currency List A - Crypto

```json
[
  { "id": "BTC", "name": "Bitcoin", "symbol": "BTC" },
  { "id": "ETH", "name": "Ethereum", "symbol": "ETH" },
  { "id": "XRP", "name": "XRP", "symbol": "XRP" }
]
```

#### Currency List B - Fiat

```json
[
  { "id": "SGD", "name": "Singapore Dollar", "symbol": "$", "code": "SGD" },
  { "id": "EUR", "name": "Euro", "symbol": "€", "code": "EUR" },
  { "id": "GBP", "name": "British Pound", "symbol": "£", "code": "GBP" }
]
```

---

## To Do

* Add item click callback to `CurrencyList`
* Unit tests & Instrumentation tests
* Improve search bar UX (animations, debounce)
* Support Manual Input for Currency Insertion
* Integrate Nativewind
