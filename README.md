# BantayBayan: Ang boses ng bayan para sa ligtas na pamayanan

BantayBayan is a crowdsourced incident mapping and reporting platform built for disaster-prone and urban communities.

## Project Brief
When disaster strikes or infrastructure fails, the gap between citizens experiencing the hazard and the authorities meant to fix it is dangerously wide. BantayBayan transforms everyday citizens into active community protectors by allowing them to pin real-time hazards—such as floods, downed power lines, or road accidents—directly onto a map.

* **Role-Based Authentication:** A secure login and signup system separates access levels. Citizens can submit, edit, and track their reports, while emergency responders (LGU, PNP, BFP, DRRMO, and Barangay Responders) and administrators access specialized dashboard controls.
* **Proactive Alerts:** Users categorize incidents using color-coded severity tags (*Minor*, *Needs Attention*, *Urgent*, *Critical*). Citizens can save their daily routes, and the app calculates if a hazard is reported along their path, sending real-time notification alerts.
* **Reliable Crowdsourcing:** To prevent spam and ensure reliable data, entries are community-verified through a public upvote system. Reports that have not yet been officially acknowledged by authorities display an **Unverified Disclaimer** badge to prevent misinformation.
* **Multi-Agency & Municipality Routing:** BantayBayan provides LGUs and emergency responders with a centralized dashboard. Reports are automatically tagged by municipality/location and routed to the appropriate government agency (e.g., PNP for Peace & Order, BFP/DRRMO for Fire and Flood, and localized filtering for Barangay responders).
* **Accountability:** Transparent progress tags (*Unresolved*, *Pending Resolution*, *Resolved*) hold authorities accountable, allowing citizens to see exactly when an issue is being addressed.

This solution directly addresses **SDG 9 (Industry, Innovation & Infrastructure)** and **SDG 11 (Sustainable Cities & Communities)** by leveraging technology to build smarter, safer, and more inclusive communities.

## Team Name and Members
* **Team Name:** Debug Chewy Ratz
* **Members:**
  * John Andrew Lim
  * Razzielle Rios
  * Shanessa Tugaoen
  * Aisea Jevinissi Vidal

## Google & Developer Technologies Used
* **Google Maps Platform:** Used for rendering maps, placing interactive color-coded hazard pins, search/address resolution, and tracking saved routes.
* **Google Cloud Platform (GCP):** Used for managing Maps API credentials, access restrictions, and billing dashboards.
* **Figma:** Used for UI/UX wireframing, component design, and prototyping responsive application layouts.
* **Antigravity IDE:** Used as the primary development environment to build, refactor, and debug the application.
* **MongoDB Atlas & Express:** Used for backend database storage of citizen accounts, report records, active comments, and notification events.
* **React, Vite, & TailwindCSS:** Used to build a responsive, high-performance web interface.

## Getting Started / How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shanerawr/GDG-PUP-SparkFest-Hackathon-2026.git
   cd GDG-PUP-SparkFest-Hackathon-2026
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your keys:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

4. **Run the application (Frontend & Backend):**
   ```bash
   # Terminal 1: Start the backend server
   node api/index.js

   # Terminal 2: Start the Vite dev server
   npm run dev
   ```

> [!NOTE]
> This project was developed for the **GDG PUP SparkFest Hackathon 2026**.


