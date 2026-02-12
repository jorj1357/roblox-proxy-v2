// C:\important\quiet\rp\roblox-proxy-v2\api\search.js
// feb 12 2026
/**
 * purpose
 * file to make it so we can talk to roblox api server
 * so that the place roulette gaem im making works 
 */

export default async function handler(req, res) {
  const keyword = req.query.keyword || "roblox";

  try {
    const response = await fetch(
      `https://games.roblox.com/v1/games/list?keyword=${keyword}&limit=50&sortOrder=Asc`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Roblox API" });
  }
}
