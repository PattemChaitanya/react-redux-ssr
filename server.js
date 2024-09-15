const express = require("express");
const path = require("path");
const React = require("react");
const { renderToString } = require("react-dom/server");
const { Provider } = require("react-redux");
const App = require("./src/App").default;
const fs = require("fs");
const { updateData } = require("../src/store/slice/data-slice");
const { store } = require("../src/store/store");

const app = express();

app.use(express.static(path.resolve(__dirname, "build")));

app.get("*", (req, res) => {
  const reduxStore = store();

  reduxStore.dispatch(updateData("Server-side data"));

  const appString = renderToString(
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );

  const preloadedState = reduxStore.getState();

  const indexFile = path.resolve(__dirname, "build", "index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading index.html", err);
      return res.status(500).send("Oops, something went wrong!");
    }

    // Inject the preloaded state into the HTML
    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
        .replace(
          "</body>",
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
            preloadedState
          ).replace(/</g, "\\u003c")}</script></body>`
        )
    );
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
