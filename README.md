# QuintinReynecke/EduvosProjectFrontend - Project Overview

## Auto-Generated Documentation by autoDocumentationAI

This documentation provides an automatically generated overview of the project, including its architecture, key features, and setup instructions.

## Key Files Documentation Snippets

### `README.md`

### InfraSight.ai Code Analysis Report

**Repository:** QuintinReynecke/EduvosProjectFrontend
**File Path:** README.md
**Chunk:** 1 of 2

---

### 1. Functionality/Purpose

This code snippet serves as the primary documentation for the "EduImprovers App," an Ionic Angular application designed to enhance communication between students and faculty at Eduvos. The application's core functionality includes enabling students to submit questions, access FAQs, and interact with Student Administration Assistants (SAAs).

The purpose of this specific documentation chunk is to provide a comprehensive guide for developers, covering the entire application lifecycle from initial local setup and development to testing and generating release builds (APKs) for the Android platform. It also outlines the high-level database design required for the application's backend.

### 2. Key Logic/Components

The snippet details several key components and workflows essential for developing and deploying the application:

*   **Application Framework:** The application is built using **Ionic** and **Angular**, leveraging **Capacitor** for native mobile functionality.
*   **Development Workflow:** The documentation outlines a standard developer workflow, including:
    *   **Setup:** Installing the Ionic CLI and creating a new Ionic Angular project with Capacitor integration.
    *   **Page Generation:** Generating core application pages (`faq`, `answers`, `profile`) using the Ionic CLI.
    *   **Local Development:** Cloning the repository, installing dependencies via `npm install`, and running the application locally using `ionic serve`.
*   **Testing and Release Workflow:** The instructions provide detailed steps for building and deploying the application to native Android devices:
    *   **Platform Integration:** Adding the Android platform using `npx cap add android`.
    *   **Build Process:** Compiling the web assets (`ionic build`) and copying them to the native Android project (`npx cap copy android`).
    *   **APK Generation:** Generating both debug and release APKs using Android Studio, including instructions for signing the release build.
*   **Database Design:** The snippet outlines the schema for four core database tables:
    *   **Login:** Stores user credentials (email, hashed password) and user type (student/faculty) for authentication and role-based access control.
    *   **Chatbox:** Designed for group chat functionality, including subject/group name, user type/username, message content, and department affiliation.
    *   **FAQ:** A simple key-value store for frequently asked questions and their answers.
    *   **Personal Chat:** Facilitates one-on-one communication, allowing students to ask questions, specify a subject, and select a specific SAA or faculty member to contact.

### 3. Dependencies/Interactions

This code snippet describes interactions with several key dependencies and tools:

*   **Ionic CLI:** The primary command-line interface used for scaffolding, generating pages, and serving the application locally.
*   **npm (Node Package Manager):** Used to install project dependencies and manage the development environment.
*   **Capacitor:** The native runtime used to bridge the web application with native device features and generate platform-specific projects (Android).
*   **Android Studio:** The integrated development environment (IDE) required for building, testing, and generating release APKs for the Android platform.
*   **Git:** Used for version control and cloning the project repository.
*   **Backend Database:** The application relies on a backend database (schema defined in the snippet) to store user data, chat messages, and FAQ content.

### 4. Usage/Example

The snippet itself serves as a comprehensive usage guide. A developer can follow these steps to set up and run the application locally:

**Local Development Setup:**

1.  **Install Ionic CLI:**
    ```bash
    npm install -g @ionic/cli
    ```
2.  **Clone Repository:**
    ```bash
    git clone https://github.com/QuintinReynecke/EduvosProjectFrontend.git
    cd EduvosProjectFrontend
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Start Development Server:**
    ```bash
    ionic serve
    ```

**Building for Android:**

1.  **Add Android Platform:**
    ```bash
    npx cap add android
    ```
2.  **Build and Copy Assets:**
    ```bash
    ionic build
    npx cap copy android
    ```
3.  **Open in Android Studio:**
    ```bash
    npx cap open android
    ```
4.  **Run/Build APK:** Use Android Studio to select a device/emulator and run the application or generate a debug/release APK.

### 5. Best Practices/Improvements

*   **CI/CD Automation:** The manual process for generating debug and release APKs in Android Studio is prone to human error and time-consuming. Implementing a Continuous Integration/Continuous Deployment (CI/CD) pipeline (e.g., using GitHub Actions, GitLab CI, or Appflow) would automate the build, testing, and release process, ensuring consistency and efficiency.
*   **Environment Variable Management:** The documentation does not mention how API endpoints or database connection strings are handled. Best practice dictates using environment variables (e.g., `.env` files) to manage configuration settings, especially for different environments (development, staging, production). This prevents hardcoding sensitive information in the source code.
*   **Database Schema Refinement:** The database design outlines a good foundation. However, for a production application, consider adding timestamps to chat messages and personal questions for better tracking and auditing. Additionally, ensure proper indexing on frequently queried fields like `email` and `department` to optimize performance.
*   **Documentation Completion:** The snippet ends abruptly ("Once user is lo..."). The documentation should be completed to provide a full picture of the user authentication flow and subsequent actions.
### Documentation for Code Snippet: Group Management and User Profile Features

This documentation analyzes a snippet from the project's requirements or feature list, outlining core business logic for user roles, group management, and data display.

#### 1. Functionality/Purpose

This snippet describes key features related to user access control and group management within the application. The primary purpose is to define the rules for how students can join groups and how faculty/administrators can manage those groups. It also specifies the essential user profile information that must be displayed upon login.

The core functionalities described are:

*   **Student Self-Service Group Enrollment:** Allows students to join groups based on specific criteria (enrollment status, module availability, and active block).
*   **Administrative Group Assignment:** Provides faculty and administrators with the ability to manually assign students to groups, overriding the self-service process.
*   **User Profile Information Display:** Defines the data points required for a user's profile summary, including academic status and group affiliations.

#### 2. Key Logic/Components

The snippet outlines several critical business logic rules:

*   **Student Group Joining Logic:** A student's ability to join a group is governed by a set of conditional checks:
    1.  **Block Availability:** The group must be associated with a module that is currently active in the specified "Block."
    2.  **Group Capacity:** The group must have available slots ("if its available").
    3.  **Subject Enrollment:** The student must be currently enrolled in the subject associated with the group ("if they are enrolled for that subject").
*   **Role-Based Access Control (RBAC):** The system differentiates between user roles (Student vs. Faculty/Admin) to determine permissions. Students have self-service capabilities, while Faculty/Admins have administrative override capabilities for group assignment.
*   **User Profile Data Retrieval:** The system must retrieve and display specific data points for the logged-in user, including:
    *   `Current year of studies`
    *   `Current subjects enrolled for`
    *   `Current Block active`
    *   `Current groups joined`

#### 3. Dependencies/Interactions

The implementation of this logic relies heavily on interactions with several core system components:

*   **Authentication and Authorization Service:** The system must first authenticate the user and determine their role (Student, Faculty, or Admin) to apply the correct permissions and logic.
*   **Database/Data Store:** The logic depends on retrieving real-time data from a database, including:
    *   User enrollment records (to verify subject enrollment).
    *   Group data (to check availability and associated module/block).
    *   System configuration data (to determine the currently active "Block").
*   **User Interface (UI):** The UI must present the available groups to students based on the filtering logic and provide the necessary controls for joining. It must also display the required user profile information.

#### 4. Usage/Example

**Scenario: Student Group Enrollment Flow**

1.  **User Login:** A student logs into the application.
2.  **Profile Display:** The system retrieves and displays the student's basic information, including their enrolled subjects and current active block.
3.  **Group Selection:** The student navigates to the "Groups" section. The system filters the available groups based on the student's enrollment status and the currently active block.
4.  **Conditional Join:** The student attempts to join a specific group. The system performs a final check to ensure the group has available capacity. If all conditions are met, the student is successfully added to the group. If not, an error message is displayed (e.g., "Group is full" or "You are not enrolled in this subject").

**Scenario: Faculty Administrative Override**

1.  **Faculty Login:** A faculty member logs into the application.
2.  **Administrative Access:** The faculty member accesses the group management interface.
3.  **Manual Assignment:** The faculty member selects a student and manually assigns them to a specific group, bypassing the student's self-service enrollment process. This action is typically used to correct enrollment issues or manage students who did not join a group themselves.

#### 5. Best Practices/Improvements

*   **Clarity of Terminology:** The term "Block" is specific to the institution's academic structure. Ensure this term is clearly defined in the system's documentation and user interface to avoid confusion.
*   **Robust Error Handling:** Implement clear and informative error messages for students attempting to join groups when conditions are not met (e.g., "This group is full," "You are not enrolled in this module," or "Enrollment for this block has closed").
*   **Concurrency Control:** When multiple students attempt to join a group with limited capacity simultaneously, implement concurrency control mechanisms (e.g., database transactions or locking) to prevent race conditions where more students are assigned than available slots.
*   **UI/UX Placement:** Consider placing the "Basic information" on a dedicated dashboard or profile page *after* login, rather than on the login page itself, which typically only handles authentication credentials. This improves user experience and security by separating authentication from data display.

---

