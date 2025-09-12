# Project Red Table — Carbon Dashboard

A modern, enterprise-grade data visualization dashboard built with **IBM Carbon Design System** and React. This dashboard analyzes language access goals data with advanced filtering, categorization, and risk assessment capabilities.

**📍 Location:** This is a subfolder within the main [Project Red Table](https://github.com/klappy/project-red-table) repository.

## 🎯 Features

### Core Functionality

- **Data Import**: Load CSV/Excel files via URL or drag-and-drop
- **Advanced Filtering**: Complex business rules for language categorization
- **Risk Assessment**: Identify languages at risk of incompletion
- **Interactive Views**: Toggle between table and chart visualizations
- **Responsive Design**: Mobile-first approach with Carbon grid system

### Data Categories

- **AAG Risk of Incompletion**: Languages most at risk (red highlighted)
- **AAG No Activity**: Languages with goals but no started work
- **AAG Active Lang Dev/Scripture Engagement**: Languages with preparatory work
- **AAG Active Translation**: Languages with ongoing translation

### Technical Features

- **IBM Carbon UI**: Enterprise-grade design system
- **TypeScript**: Full type safety
- **Auto-loading**: Loads default dataset from GitHub
- **Self-testing**: Built-in test suite for data processing
- **Accessibility**: WCAG compliant components

## 🏗️ Architecture

### Business Logic

```typescript
// Complex rule engine for categorization
const RULES = {
  goalNotMet: (row) => String(row["All Access Status"]).toLowerCase() !== "goal met",
  isPortion: (row) => toNumber(row["All Access Chapter Goal"]) === 25,
  isNT: (row) => toNumber(row["All Access Chapter Goal"]) === 260,
  isFB: (row) => toNumber(row["All Access Chapter Goal"]) === 1189,
  isTwoFB: (row) => toNumber(row["All Access Chapter Goal"]) >= 2000,
  // ... additional rules
};
```

### Component Structure

- **CollapsedImporter**: URL + drag-drop data loading
- **DataTableView**: Carbon DataTable with sorting/filtering
- **ChartView**: Carbon Charts integration (placeholder for now)
- **Box**: Wrapper with toggle functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/klappy/project-red-table.git
cd project-red-table/carbon-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage

1. **Auto-load**: Dashboard loads default dataset automatically
2. **Import Data**: Click "Import data" to load custom CSV/Excel files
3. **Toggle Views**: Use individual toggles or "Show charts/tables" for all
4. **Risk Focus**: Red-highlighted sections show highest priority items

## 📊 Data Processing

### Input Formats

- **CSV**: Comma-separated values with headers
- **Excel**: .xlsx and .xls files (first sheet only)
- **URLs**: Public links to data files (GitHub, Dropbox, etc.)

### Output Categories

- **Portion**: 25 chapters (excluded from risk assessment)
- **NT**: New Testament (260 chapters)
- **FB**: Full Bible (1,189 chapters)
- **Two FB**: Multiple Bibles (2,000+ chapters)

### Risk Assessment Logic

Languages are flagged as "at risk" if they:

- Have goals but no activity started
- Only have language development/scripture engagement
- Have uncertain completion timelines

## 🛠️ Tech Stack

### Frontend

- **React 18**: Modern React with hooks
- **TypeScript**: Full type safety
- **IBM Carbon**: Enterprise design system
- **Vite**: Fast development server and build tool

### Data Processing

- **PapaParse**: CSV parsing
- **XLSX**: Excel file processing
- **React Dropzone**: File upload handling

### Styling

- **Carbon Styles**: Design tokens and CSS custom properties
- **IBM Plex Sans**: Carbon's typography system
- **Responsive Grid**: Carbon's 16-column grid system

## 🎨 Design System

### Carbon Components Used

- `Grid` / `Column`: Responsive layout
- `Tile`: Content containers
- `Button`: Interactive elements
- `DataTable`: Structured data display
- `TextInput`: Form controls
- `FileUploaderDropContainer`: File uploads
- `Tag`: Status indicators
- `Loading`: Async states

### Color Scheme

- **Primary**: Carbon gray scale
- **Risk**: Red variants for high-priority items
- **Interactive**: Blue variants for buttons/links

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- **IBM Carbon Design System**: Enterprise-grade UI components
- **Original Dashboard Logic**: Adapted from advanced React patterns
- **Language Access Goals Data**: Public dataset analysis

---

**Built with ❤️ using IBM Carbon Design System**
