/**
 * 1000-Spin Simulation — Simple Output
 */
const TOTAL_SPINS = 1000;
const results: Record<string, number> = {
  BIG_L: 0, HYPE_BOOST: 0, COMMON_UNCOMMON: 0, RARE: 0, LEGENDARY: 0, EXOTIC: 0,
};

for (let i = 0; i < TOTAL_SPINS; i++) {
  const r = Math.random() * 100;
  if (r < 30) results.BIG_L++;
  else if (r < 65) results.HYPE_BOOST++;
  else if (r < 85) results.COMMON_UNCOMMON++;
  else if (r < 95) results.RARE++;
  else if (r < 99) results.LEGENDARY++;
  else results.EXOTIC++;
}

console.log('SAFE CRACKER - 1000 SPIN SIMULATION');
console.log('---');
for (const [key, count] of Object.entries(results)) {
  console.log(key + ': ' + count + ' (' + ((count / TOTAL_SPINS) * 100).toFixed(1) + '%)');
}
console.log('---');
console.log('Total: ' + TOTAL_SPINS);
