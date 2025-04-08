#  Multi-Step Form with Next.js (App Router)

A responsive, multi-step form built with **Next.js App Router**, **React Hook Form**, **Zod**, and **TailwindCSS**. Includes validation, form state management, and summary preview.

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **React Hook Form** – Form handling
- **Zod** – Schema validation
- **TailwindCSS** – Utility-first styling
- **next-themes** – Dark mode support
- **lucide-react** – Icons (optional)
- *(Bonus)* React Query  – API simulation

---

## 📋 Form Steps

### ✅ Step 1: Personal Information
- Full Name (required)
- Email (valid email format)
- Phone Number (min 10 digits)

### ✅ Step 2: Address Details
- Street Address (required)
- City (required)
- Zip Code (min 5 digits, numeric only)

### ✅ Step 3: Account Setup
- Username (min 4 characters)
- Password (min 6 characters)
- Confirm Password (must match)

---

## ✨ Features

- ✅ **Zod-based validation**
- ✅ Error messages displayed below inputs
- ✅ Step-wise navigation with **Next** and **Previous**
- ✅ Final summary before submission
- ✅ Local state data handling using `useState`
- ✅ Dark mode using `next-themes`
- ✅ Responsive UI for mobile & desktop

---

## 📦 Installation

```bash
npm install
npm install lucide-react next-themes

Author

Built by Nazneen with using React & Next.js.
