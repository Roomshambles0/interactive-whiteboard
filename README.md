# Interactive-canvas (Next.js Drawing Application)

 
This is a simple drawing application built with Next.js, leveraging the HTML canvas element for rendering, Rough.js for hand-drawn graphics, and Tailwind CSS for styling.



## Features

- **Canvas Drawing**: Users can draw on the canvas using various tools.
- **Infinite Canvas:** Allows users to access infinite space in the canvas by mapping its real size and coordinates on the screen to a new "unlimited" set of coordinates.
- **Hand-Drawn Graphics**: The application utilizes Rough.js to create a hand-drawn effect on graphics.
- **Responsive Design**: Tailwind CSS is employed for creating a responsive and visually appealing user interface.
- **Authentication**: Implemented User authentication where each user can create account and his drawing files.
-**Realtime Application**: This is realtime application where data saved to the backend using socket.io libraty.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building web applications.
- [HTML Canvas Element](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API): Used for rendering graphics and enabling drawing capabilities.
- [Rough.js](https://roughjs.com/): A lightweight JavaScript library for creating hand-drawn graphics.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for building modern web designs.
- [NextAuth](https://next-auth.js.org/): Authentication
- [MongoDB](https://www.mongodb.com/atlas/database):MongoDB database integration using MongoDB Atlas.

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Roomshambles0/interactive-canvas.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd interactive-canvas
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Run the Application:**

    ```bash
    npm run dev
    ```

    Open your browser and visit `http://localhost:3000` to see the drawing application in action.

## Usage

- Choose a drawing tool from the toolbar.
- Draw on the canvas using your mouse or touch input.
- You can zoom and pich on the canvas
- Experiment with different Rough.js styles for a hand-drawn effect.

## Contributing

Feel free to contribute to the project. Whether you find a bug, have a feature request, or want to improve the documentation, your contributions are welcome.

## License

This project is licensed under the MIT License.
---

Happy Drawing! 🎨
