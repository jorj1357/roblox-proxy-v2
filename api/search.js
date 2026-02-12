// C:\important\quiet\rp\roblox-proxy-v2\api\search.js
// feb 12 2026
/**
 * purpose
 * file to make it so we can talk to roblox api server
 * so that the place roulette gaem im making works 
 */

export default async function handler(req, res) {
  const placeId = req.query.placeId || "1818";

  try {
    // Step 1: get universe ID
    const u = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );
    const uData = await u.json();

    const universeId = uData.universeId;

    // Step 2: get game info
    const g = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );
    const gData = await g.json();

    res.status(200).json(gData);

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
