import express from "express";
import { exec } from "child_process";
import * as temps from "./temp.js";

//* ENTRY
export function NHLAServer(SYN_PORT = 5666) {
  const server = express();

  //? Once connection to / is established
  server.get("/", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/");
    res.send(`NakkenHassuLämpötilaAsema Rootpage\n\nRequest IP:${req.ip}`);
  });

  //? Once connection to /api/temp is established
  server.get("/api/temp", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/api/temp");
    res.send(
      `${temps.temp0()}\n${temps.temp1()}\n${temps.temp2()}\n${temps.temp3()}`
    );
  });

  //? Once connection to /api/neofetch is established
  server.get("/api/neofetch", (req, res) => {
    Logger(`New connection from ${req.ip}.`, "/api/neofetch");

    let neofetch = "";
    exec('"neofetch" --stdout', (error, stdout) => {
      if (error) neofetch = toString(error);
      neofetch = stdout;
    });

    setTimeout(() => {
      res.send(neofetch);
    }, 3500);
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
