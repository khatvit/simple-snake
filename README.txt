Build/Runinstructions:
Run 'npm install'
Run 'npm start' to start application
Hoste application:
	http://23.254.253.132/ (that’s my personal VPS hosting, I have not configured domain name so please use IP address)

Code structure
    - I decided to use es6 classes, another way would be to use pure function (functions should not mutate the data)
    - Snake class I made immutable, it takes more memory but makes class safer to use (prevents mutation by reference)
    - Game logic is separated from rendering. Main class renders, while Game class deals with game logic (walls, snake)
    - I decided to use html5 canvas because it’s the best performance, I don’t redraw the entire canvas so it maintains 100+ fps easy. And requestanimationframe is must. Using grid of divs is another option but less efficient (Browser reflow)
    - You can customize field size, game speed and score to win by changing constants in the code
    - I did not use automatic code formatting or linting

Things to improve
    - Implement simple finite state machine for game state management and build simple state store
    - Add DOM abstraction, encapsulate DOM element separate classes for UI
    - Split Main into more modules
    - Split wall/collision detection into separate modules
    - Make responsive canvas
    - use webpack to generate index.html (I put index.html and css to dist for simlicity)
    - Add unit tests

Thank you
Vitalii Khatiushyn

