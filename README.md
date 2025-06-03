# React Native Currency List Component

A reusable `CurrencyList` component, designed to display and filter both Crypto and Fiat currencies. A `DemoScreen` is provided to simulate local DB interactions and demonstrate usage scenarios.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## 📦 Tech Stack

* **React Native**
* **TypeScript**
* **Zustand** for state management

---

## 🧹 Project Structure

```
app/
├── components/
│   └── CurrencyList.tsx         # Reusable currency list component
├── screens/
│   └── DemoScreen.tsx           # Demo view to test and showcase functionality
├── store/
│   └── currencyStore.ts         # Zustand-based in-memory "local DB"
├── models/
│   └── CurrencyInfo.ts          # Type definition for currency data
```

---

## 📘 Component: CurrencyList

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

## 🥪 DemoScreen Functionalities

The `DemoScreen` simulates native-style interactions using 5 buttons:

1. **Clear Local DB** - Clears all currency data
2. **Insert Data** - Inserts demo Currency List A and B into local DB
3. **Show List A (Crypto)** - Displays `CurrencyList` with Crypto data
4. **Show List B (Fiat)** - Displays `CurrencyList` with Fiat data
5. **Show All Currencies** - Displays items from both List A and List B.

Also includes a **search bar** above the list, which:

* Filters the list using the matching rules above
* Allows cancelling the search via back/clear buttons

---

## 📟 Data Format

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

## 🛠 Development Notes

* All data operations (insert, query, clear) are simulated in memory via Zustand
* No I/O operations block the UI thread
* Ready to be extended with real persistent storage (AsyncStorage, SQLite, etc.)

---

## ⚠️ To Do (Optional Enhancements)

* Add persistent storage
* Add item click callback to `CurrencyList`
* Unit tests & Instrumentation tests
* Improve search bar UX (animations, debounce)



