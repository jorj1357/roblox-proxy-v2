// C:\important\quiet\rp\roblox-proxy-v2\api\search.js
// feb 12 2026
/**
 * purpose
 * file to make it so we can talk to roblox api server
 * so that the place roulette gaem im making works 
 * save the results we get to games.json in our same folder we're in rn 
 */

import fs from "fs";

export default function handler(req, res) {
  const minYear = parseInt(req.query.minYear || "2008");
  const maxYear = parseInt(req.query.maxYear || "2014");
  const minVisits = parseInt(req.query.minVisits || "10000");
  const keyword = (req.query.keyword || "").toLowerCase();

  const data = JSON.parse(fs.readFileSync("./games.json"));

  const results = data.filter(game => {
    const created = new Date(game.created).getFullYear();
    const updated = new Date(game.updated).getFullYear();

    return (
      created >= minYear &&
      created <= maxYear &&
      updated <= maxYear &&
      game.visits >= minVisits &&
      game.name.toLowerCase().includes(keyword)
    );
  });

  res.status(200).json(results.slice(0, 50));
}
