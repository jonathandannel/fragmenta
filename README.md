# Setup

### npm i

- Installs dependencies.

### mysql

- Create a mysql database
- Link it to the app with your credentials via .env
- Run `npx sequelize db:migrate`

### cloudinary

- Make sure you add your personal keys to the `.env`.

### npm start

- Start the express server.

### cd client && npm run dev

- Webpack will watch the src/ directory and rebuild the client side bundle when code changes.

#### npm run build

- Bundle is built the same as `run dev`. If not running dev in watch mode, build before you run the express server.

# Features

- Register/login with JWT
- Clean, modern SPA UI using React and Redux
- Upload photos to user photo collection
  ![UI](https://github.com/jonathandannel/myriad/blob/master/doc/Screenshot%20from%202020-02-24%2016-21-42.png?raw=true)
- Facial feature detection on uploaded images
  ![Feature detection](https://github.com/jonathandannel/myriad/blob/master/doc/Screenshot%20from%202020-02-24%2016-22-00.png?raw=true)
- Real time facial feature detection via webcam stream
  ![Real time webcam detection 2](https://github.com/jonathandannel/myriad/blob/master/doc/Screenshot%20from%202020-02-24%2016-33-29.png?raw=true)
  ![Real time webcam detection 1](https://github.com/jonathandannel/myriad/blob/master/doc/Screenshot%20from%202020-02-24%2016-22-00.png?raw=true)

# TODO

- Create canvas overlay for editing photos while detecting features. The overlay will contain a rubric of markers pertaining to passport/visa photo requirements. The user will then be able to crop, take a different photo, etc. Ideally this rubric will show while the webcam is streaming. For now, this is a work in progress.
