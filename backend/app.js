// app.js file

const jsonServer = require("json-server");

const express = require("express");
const path = require("path");

// Returns an Express server
const server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

server.use(express.static(path.join(__dirname, "dist")));

// Add custom routes
// server.get('/custom', function (req, res) { res.json({ msg: 'hello' }) })

server.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Returns an Express router
const router = jsonServer.router("./data/cities.json");

server.use(router);

server.listen(8080);
