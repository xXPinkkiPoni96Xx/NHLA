//* ENTRY
export function NHLAServer(SYN_PORT = 5666) {
  const express = require("express");
  const { exec } = require("child_process");
  const server = express();

  //? temps
  const temps = require("./temp.js");

  //? Once connection to / is established
  server.get("/", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/");
    res.send(`NakkenHassuLämpötilaAsema Rootpage\n\nRequest IP:${req.ip}`);
  });

  //? Once connection to /api/temp0 is established
  server.get("/api/temp0", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/api/temp0");
    res.send({ temp: temps.temp0() });
  });

  //? Once connection to /api/temp1 is established
  server.get("/api/temp1", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/api/temp1");
    res.send({ temp: temps.temp1() });
  });

  //? Once connection to /api/temp2 is established
  server.get("/api/temp2", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/api/temp2");
    res.send({ temp: temps.temp2() });
  });

  //? Once connection to /api/temp3 is established
  server.get("/api/temp3", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/api/temp3");
    res.send({ temp: temps.temp3() });
  });

  //? Once connection to /api/neofetch is established
  server.get("/api/neofetch", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/api/neofetch");

    let neofetch;
    exec("neofetch", (err, stdout, stderr) => {
      if (err) neofetch = "ERROR";
      if (stderr) neofetch = "STDERR";
      else neofetch = stdout;
    });

    res.send({
      output: neofetch,
    });
  });

  //? Called once server is up
  server.listen({ port: SYN_PORT }, () => {
    Logger(`NHLA running on ${SYN_PORT}.`, "LISTENER");
  });
}

//* World's worst logging system (stdout only)
function Logger(data, route) {
  let h, m, s;
  h = new Date().getHours();
  m = new Date().getMinutes();
  s = new Date().getSeconds();

  console.log(`[${h}:${m}:${s}] [${route}] ${data}`);

  return;
}