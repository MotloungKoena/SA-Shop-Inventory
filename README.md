# SA-Shop-Inventory

> **A modern, offline-first Point of Sale (POS) and Inventory Management platform built for small businesses.**

Tired of messy notebooks, lost receipts, and POS systems that break the moment the Wi-Fi drops? SA-Shop-Inventory is a lightweight, full-stack application designed to keep small shops running smoothly—even when the internet isn't.

---

## Features (Current & Upcoming)

- **Secure Authentication:** Role-based access for Owners, Managers, and Cashiers.
- **Smart Inventory:** Track stock using an event-driven ledger (never lose track of where your items went).
- **Lightning-Fast POS:** A snappy checkout experience with split payments, discounts, and digital receipts.
- **Offline-First:** Keep selling when the internet drops. The POS syncs automatically when you're back online.
- **Online Storefront:** A public-facing store for customers to buy online, powered by Stripe.

---

## Tech Stack

This project is built with a modern, strictly-typed stack:

- **Frontend:** React (TypeScript) + Vite + React Router
- **Backend:** C# / ASP.NET Core Web API
- **Database:** SQL Server + Entity Framework Core (EF Core)
- **Payments:** Stripe API (Upcoming)

---

## Getting Started (Local Development)

Want to run this project on your machine? Follow these steps:

### Prerequisites
- [ ] **Node.js** (v18 or higher)
- [ ] **.NET 9 SDK**
- [ ] **SQL Server** (LocalDB or Express)
- [ ] **Entity Framework Core Tools** (Run: `dotnet tool install --global dotnet-ef`)

### 1. Clone the Repository
```bash
git clone https://github.com/MotloungKoena/SA-Shop-Inventory.git
cd SA-Shop-Inventory
2. Set up the Backend (C#)
bash
cd backend/ShopInventoryAPI

# Restore NuGet packages
dotnet restore

# Build the SQL Server database (Run this!)
dotnet ef database update

# Start the API
dotnet run
The backend will usually start on http://localhost:5142.

3. Set up the Frontend (React)
Open a new terminal window:

bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
The frontend will start on http://localhost:5173.
