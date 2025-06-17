<p align="center">
	<br>
    <img src="https://i.imgur.com/0fo4BTJ.png" alt="Neuro-Gallery Logo" width="100">
    <h3 align="center">Neuro-Gallery</h3>
    <br>
</p>

**Neuro-Gallery** is an immersive, interactive 3D art exhibition built with **Three.js** and **Vite**. Step into a beautifully rendered virtual gallery where you can not only admire pre-existing AI-generated artworks but also create your own unique piece in real-time using the power of **DALL-E 3**.

This project was developed for the **Computer Graphics** course at the **Faculty of Cybernetics, Statistics, and Economic Informatics (CSIE)**, within the **Bucharest University of Economic Studies (ASE)**.

# Features ✨

### 🎨 Interactive AI Art Generation
Powered by the OpenAI DALL-E 3 API, users can step up to the central easel, enter a descriptive prompt, and watch as a unique piece of art is generated and displayed on the canvas in real-time.

### 🚶 Immersive 3D Exploration
Navigate the gallery in a first-person perspective with familiar, intuitive controls. Move with WASD, look around with the mouse, jump with the spacebar, and sprint with the shift key for a fluid and engaging experience.

### 🎬 Cinematic Focus Mode
Click on any painting to trigger a dynamic presentation view. The camera smoothly glides in to focus on the artwork while an elegant UI overlay displays its title, the AI model used, and the detailed prompt that brought it to life.

### 🌞 Dynamic Day/Night Cycle
Instantly switch between a bright, sunlit daytime environment and an atmospheric, spotlight-lit nighttime scene. This feature, accessible through the control panel, completely transforms the gallery's mood and lighting.

### 🔧 Advanced Scene Control Panel
Toggle a comprehensive `lil-gui` menu to tweak dozens of real-time parameters. Fine-tune lighting intensity and color, adjust camera FOV, modify particle effects, and monitor performance metrics, all without leaving the experience.

### 🚀 Built with Modern Technologies
Leverages the power of **Three.js** for stunning 3D rendering, **Vite** for a blazing-fast development environment and HMR, and **lil-gui** for an intuitive and powerful debugging and control interface.

## Getting Started 🚀

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18.x or later)
- npm / pnpm / yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/mihainiculai/NeuroGallery.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd NeuroGallery
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Set up Environment Variables:**
    - Create a `.env` file in the root of the project by copying the `.env.example` file.
    - Open the new `.env` file and add your OpenAI API key:
      ```
      VITE_OPENAI_API_KEY=your_openai_api_key_here
      ```
    > **Note:** The AI art generation feature will not work without a valid OpenAI API key with access to DALL-E 3.

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## Technology Stack 💻

-   **Frontend Tooling**: Vite
-   **3D Rendering**: Three.js
-   **AI Image Generation**: OpenAI API (DALL-E 3)
-   **Control Panel**: lil-gui
-   **Core Language**: JavaScript (ES6+)

## License 🪪

This project is licensed under the [MIT License](LICENSE).
