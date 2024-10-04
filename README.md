# EduImprovers App
## Overview
EduImprovers is an Ionic Angular application designed to facilitate communication between students and faculty at Eduvos. The app allows students to submit questions, view FAQs, and interact with Student Administration Assistants (SAAs) through a user-friendly interface. This README provides all the necessary steps to set up, develop, test, and release the application.

# Local Setup - Creating the Application
## Steps

1. Install Ionic CLI:
    - npm install -g @ionic/cli

2. Create the Ionic Application:
    - ionic start EduImprovers blank --type=angular --capacitor
    - When prompted, select "NgModules" for routing configuration.

3. Wait for the Application Setup to Complete:
    - This will take a few minutes as it sets up the project structure.

4. Navigate to the Project Directory:
    - cd EduImprovers

5. Generate Necessary Pages:
    - ionic generate page faq
    - ionic generate page answers
    - ionic generate page profile

# Local Development - Developer Workflow
## Steps

1. Clone the Repository:
    - git clone https://github.com/QuintinReynecke/EduvosProjectFrontend.git

2. Navigate to the Project Directory:
    - cd EduvosProjectFrontend

3. Install Dependencies:
    - npm install

4. Recommended VS Code Extensions: (optional)
    - Ionic

5. Start Development Server:
    - ionic serve

# Local Testing
## Steps for Android Studio

1. Ensure Android Studio is Installed.

2. Add the Android Platform:
    - npx cap add android

3. Build the Application:
    - ionic build
    - npx cap copy android

4. Open the Project in Android Studio
    - npx cap open android

5. Run the Application
    - In Android Studio, select a device or emulator and click "Run" to deploy the app.

## Steps for Visual Studio Code

1. Open the Project in VS Code:
    - Open your terminal in VS Code or use the integrated terminal.

2. Serve the Application Locally:
    - ionic serve

3. Inspect the Application:
    - Once the webpage loads, right-click and select "Inspect".
    - On the developer tools bar, select the ">>" icon to expand the options.
    - Click on "Console" to view any logs or errors.

# Local Release - Building APK
## Steps for Debug and Release APK in Android Studio

1. Build the Application:
    - ionic build
    - npx cap copy android

2. Open in Android Studio:
    - npx cap open android

3. Build Debug APK:
    - In Android Studio, navigate to Build > Build Bundle(s) / APK(s) > Build APK(s).
    - The APK will be generated in the app/build/outputs/apk/debug/ directory.

4. Build Release APK: (Do not do step 3 if you want a release)
    - For a release build, first, sign the APK:
        - Navigate to Build > Generate Signed Bundle / APK.
        - Follow the prompts to create a keystore if you don’t have one, and sign the APK.
    - The signed APK will be generated in the app/build/outputs/apk/release/ directory.


## Steps for Debug and Release APK using VS Code

1. Build the Application:
    - ionic build

2. Add Android Platform:
    - npx cap add android

3. Copy Assets to Native Projects:
    - npx cap copy android

4. Run on Android Emulator or Device:
    - npx cap open android

5. Generate APK:
    - Follow the steps for building the APK within Android Studio as described above.


## DB design
Login
- email (Username)
- password (hashed)
- type of user (student faculty)

Chatbox (Group chat)
- Subject / group name (Group name or subject name for the group chat)
- type of user (student faculty) / username (Person sending message to be linked to you)
- Chat (Your message)
- Department (it, Law, robotics, etc...)

FAQ
- Question (FAQ Question)
- Answer (Answer for FAQ)

Personal Chat
- Question (Question for the Campus)
- Answer (Answer to the question asked)
- Subject ? (Optional to input because it can be a general question)
- Lector / SSA (chose who you want to contact)
- Department (it, Law, robotics, etc...)

What still needs to be added, but do not where:
- Once user is logged in (Student) he/she can join groups based on the Block that is presenting the module and if its available and if they are enrolled for that subject.
- Once user is logged in (Faculty/ admin) can assign students to a group if students did not join a group them self or don't know how to.
- Basic information of the user on the login page:
    - Current year of studies
    - Current subjects enrolled for
    - Current Block active
    - Current groups joined
