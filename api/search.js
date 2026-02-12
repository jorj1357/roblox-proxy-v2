// C:\important\quiet\rp\roblox-proxy-v2\api\search.js
// feb 12 2026
/**
 * purpose
 * file to make it so we can talk to roblox api server
 * so that the place roulette gaem im making works 
 */

export default async function handler(req, res) {
  const minYear = 2008;
  const maxYear = 2014;
  const minVisits = 10000;
  const keyword = "obby";

  try {
    while (true) {
      // pick random place id
      const placeId = Math.floor(Math.random() * 400000000);

      // Step 1: universe lookup
      const u = await fetch(
        `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
      );
      const uData = await u.json();

      if (!uData.universeId) continue;

      // Step 2: metadata fetch
      const g = await fetch(
        `https://games.roblox.com/v1/games?universeIds=${uData.universeId}`
      );
      const gData = await g.json();

      if (!gData.data || gData.data.length === 0) continue;

      const game = gData.data[0];

      // extract values
      const createdYear = new Date(game.created).getFullYear();
      const updatedYear = new Date(game.updated).getFullYear();
      const title = game.name.toLowerCase();

      // FILTER CONDITIONS
      if (
        createdYear >= minYear &&
        createdYear <= maxYear &&
        updatedYear <= maxYear &&
        game.visits >= minVisits &&
        title.includes(keyword)
      ) {
        return res.status(200).json(game);
      }
    }

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
