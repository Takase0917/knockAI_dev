# KnockAI

KnockAI is a web-based application designed to provide fast, precise wood material cost estimations. By entering project details, users receive AI-driven estimates based on historical data, emphasizing consistency and ease of use.

---

### Table of Contents

- [User Journey](#user-journey)
- [Pages & Features](#pages--features)
  - [Welcome Page](#1-welcome-page)
  - [Project Setup Page](#2-project-setup-page)
  - [Estimator Page](#3-estimator-page)
  - [Estimation Review Page](#4-estimation-review-page)
  - [Project History Page](#5-project-history-page)
  - [Settings Page](#6-settings-page-optional)
- [Enhanced User Flow with Immediate Output](#enhanced-user-flow-with-immediate-output)

---

### User Journey

KnockAI provides a seamless, user-friendly journey for quick wood cost estimation. The following flow illustrates how users interact with the app from entry to final estimate export.

---

### Pages & Features

#### 1. Welcome Page
   - **Purpose**: Introduces the app’s core value, guiding users to start a new estimate.
   - **Components**:
     - **Quick Introduction**: Overview - "Fast, reliable wood cost estimation."
     - **Start New Estimate Button**: Leads to the Project Setup Page.
     - **Feature Overview Section**: Optional, helps new users familiarize themselves with the app.

#### 2. Project Setup Page
   - **Purpose**: Gathers basic project information for accurate cost estimation.
   - **Components**:
     - **Project Details Form**: Fields for project name, description, and category (e.g., Chair, Brush).
     - **Category Selection**: Dropdown with options like **Material Related**, **Construction Method Related**, and **Installation & Transportation Related**.
     - **Next Button**: Directs users to the Estimator Page.

#### 3. Estimator Page
   - **Purpose**: Allows users to specify materials and instantly see cost results.
   - **Components**:
     - **Material Input Section**: 
       - Table format with columns for NO., Name, Quantity, Unit Price, and Amount.
       - Real-time calculation for dynamic total updates.
     - **Simple Result Panel**:
       - **Total Material Cost**: Displays materials cost.
       - Key cost elements such as **Cost Rate** and **Management Fees**.
       - **Production Time Estimate**: Displayed as "X hours Y minutes" based on inputs.
       - **Detailed Estimate Button**: Allows further exploration on the Estimation Review Page.

#### 4. Estimation Review Page
   - **Purpose**: Provides a breakdown of the AI-generated cost estimate and options for adjustments.
   - **Components**:
     - **Immediate Estimate Result**: Displays total cost with a simplified breakdown.
     - **Detailed Breakdown**: Lists key cost categories, such as Main Body, Hardware, and Transport.
     - **Download Option**: Exports estimates in PDF or Excel format.
     - **Adjust & Recalculate Button**: Allows recalculation after adjustments.

#### 5. Project History Page
   - **Purpose**: Allows users to access past estimates for reference or reuse.
   - **Components**:
     - **Past Project List**: Displays saved estimates with project name, date, and total cost.
     - **View Project Button**: Opens saved estimates for review or export.
     - **Search & Filter Options**: Enables filtering by project type, date, or material.

#### 6. Settings Page (Optional)
   - **Purpose**: Customization options for units, cost rates, and notifications.
   - **Components**:
     - **User Preferences**: Settings for default units, cost rates, and production time assumptions.
     - **Notification Settings**: Toggles for email or in-app notifications.
     - **Profile Management**: Allows updates to user profile information.

---

### Enhanced User Flow with Immediate Output

1. **Access Welcome Page**: User clicks **Start New Estimate**.
2. **Project Setup**: User enters project details and clicks **Next**.
3. **Estimator Page**: 
   - Enters material details, quantity, and unit price.
   - Real-time results update in the **Simple Result Panel**.
4. **Estimation Review**: 
   - Clear cost breakdown with options to adjust, recalculate, or download.
5. **Project History Page** *(Optional)*: User reviews or reuses past estimates.


### Library
Svelte: Core framework for building reactive user interfaces.
Tailwind CSS: Utility-first CSS framework for styling.
SvelteKit: Simplifies routing, component organization, and server-side rendering in Svelte.
Svelte Store: Built-in for managing global state across components.
Axios (optional): For handling any external API calls to save and retrieve project history.
PapaParse or SheetJS: For exporting estimates to Excel format.
jsPDF: For generating and exporting estimates as PDFs.

### Directory

| Directory/File                          | Description                                              |
|-----------------------------------------|----------------------------------------------------------|
| `wood-estimator-app/`                   | Root directory                                           |
| `src/`                                  | Source files for the application                         |
| `src/ai/`                               | AI-related functionality                                 |
| `src/ai/estimationService.ts`           | AI service to generate estimates using Mistral           |
| `src/ai/mistralClient.ts`               | Client to handle API calls to Mistral                    |
| `src/ai/mockData.ts`                    | Mock data for development and testing                    |
| `src/components/`                       | Svelte components for the application                    |
| `src/components/WelcomePage/`           | Welcome page components                                  |
| `src/components/WelcomePage/WelcomePage.svelte` | Main welcome page component                    |
| `src/components/WelcomePage/FeatureOverview.svelte` | Overview of features                           |
| `src/components/ProjectSetupPage/`      | Project setup page components                            |
| `src/components/ProjectSetupPage/ProjectSetupPage.svelte` | Setup page for new projects               |
| `src/components/ProjectSetupPage/CategoryDropdown.svelte` | Dropdown for selecting categories            |
| `src/components/EstimatorPage/`         | Estimator page components                                |
| `src/components/EstimatorPage/EstimatorPage.svelte` | Main page for estimations                       |
| `src/components/EstimatorPage/MaterialInputTable.svelte` | Table for inputting materials               |
| `src/components/EstimatorPage/SimpleResultPanel.svelte` | Panel displaying simple results              |
| `src/components/EstimatorPage/RealTimeCalculator.svelte` | Real-time calculations interface            |
| `src/components/EstimationReviewPage/`  | Estimation review page components                        |
| `src/components/EstimationReviewPage/EstimationReviewPage.svelte` | Page for reviewing estimations     |
| `src/components/EstimationReviewPage/EstimateBreakdown.svelte` | Breakdown of estimates                    |
| `src/components/EstimationReviewPage/DownloadButton.svelte` | Button for downloading estimates         |
| `src/components/EstimationReviewPage/AdjustRecalculate.svelte` | Component for adjusting and recalculating  |
| `src/components/ProjectHistoryPage/`    | Project history page components                          |
| `src/components/ProjectHistoryPage/ProjectHistoryPage.svelte` | History page for past projects          |
| `src/components/ProjectHistoryPage/PastProjectList.svelte` | List of past projects                        |
| `src/components/ProjectHistoryPage/SearchFilter.svelte` | Filter for searching projects               |
| `src/components/SettingsPage/`          | Settings page components                                 |
| `src/components/SettingsPage/SettingsPage.svelte` | User settings page                           |
| `src/components/SettingsPage/UserPreferences.svelte` | Component for user preferences               |
| `src/utils/`                             | Utility functions                                       |
| `src/utils/calculateEstimate.ts`        | Estimation calculations                                  |
| `src/utils/formatOutput.ts`             | Utility for formatting results                          |
| `src/utils/responseParser.ts`           | Parses Mistral API responses                            |
| `src/utils/api/`                        | API utilities                                            |
| `src/utils/api/getProjectHistory.ts`    | Retrieves saved estimates from local storage            |
| `src/utils/api/saveEstimate.ts`         | Saves new estimates to local storage                    |
| `src/app.postcss`                       | Tailwind CSS configuration for Svelte                   |
| `src/main.ts`                           | SvelteKit entry point                                   |
| `tailwind.config.js`                    | Tailwind CSS configuration                              |
| `postcss.config.js`                     | PostCSS configuration for Tailwind                      |
| `package.json`                          | Dependencies and project metadata                       |