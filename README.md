# 🚀 Kanban Board – React + TypeScript

A modern **Kanban Board UI** built using **React + TypeScript**, inspired by real-world task management tools like Trello.

This project demonstrates component-based architecture, drag-and-drop functionality, inline card editing, and responsive design for both desktop and mobile devices.

---

## ✨ Features

### 📌 Board Structure
- 3 Default Columns
  - ✅ Todo
  - 🟡 In Progress
  - 🟢 Done

---

### 🧩 Card Management
- Add new cards to any column
- Delete existing cards
- Inline edit card title (Double click to edit)

---

### 🖱 Drag & Drop
- Move cards across columns  
- Reorder cards inside columns  
- Implemented using dnd-kit (Production-ready drag and drop solution)  
- Supports Desktop + Mobile drag interactions  
- Drag Handle → Used for dragging cards
- Card Content → Clickable for editing
- Delete Button → Clickable for delete action

---

### 📱 Responsive Layout
- Desktop → Columns displayed horizontally
- Mobile → Columns stacked vertically
- Smooth UI transitions

---

### 🎨 Modern UI / UX
- Gradient column headers
- Soft shadow cards with hover animation
- Modern SaaS style layout
- Pixel-accurate Add Card button design
- Micro interaction animations

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Context API** (State Management)
- **CSS (Modern UI Styling)**
- **HTML5 Drag & Drop API**

---

## 📂 Project Structure

src/
├ components/
│ ├ KanbanBoard
│ ├ Column
│ ├ Card
│
├ context/
│ ├ BoardContext
│
├ data/
│ ├ mockData
│
├ types/
│ ├ board.types



