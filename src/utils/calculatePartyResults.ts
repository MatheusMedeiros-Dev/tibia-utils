type Players = {
  name: string;
  balance: number;
  damage: number;
  diff?: number;
};
export type Transfer = {
  transfer: string;
  transferMessage: string;
};

function parsePartyHunt(partyHunt: string): Players[] {
  const lines = partyHunt
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const players: Players[] = [];
  let currentPlayer: Players | null = null;

  for (let line of lines) {
    if (
      !line.startsWith("Loot:") &&
      !line.startsWith("Supplies:") &&
      !line.startsWith("Balance:") &&
      !line.startsWith("Damage:") &&
      !line.startsWith("Healing:") &&
      !line.startsWith("Session") &&
      !line.startsWith("Loot Type:")
    ) {
      if (currentPlayer) players.push(currentPlayer);

      currentPlayer = {
        name: line.replace(/\s*\(Leader\)/i, ""),
        balance: 0,
        damage: 0,
      };
    }

    if (line.startsWith("Balance:") && currentPlayer) {
      currentPlayer.balance = parseInt(
        line.replace("Balance:", "").replace(/,/g, "").trim()
      );
    }

    if (line.startsWith("Damage:") && currentPlayer) {
      currentPlayer.damage = parseInt(
        line.replace("Damage:", "").replace(/,/g, "").trim()
      );
    }
  }

  if (currentPlayer) players.push(currentPlayer);

  return players;
}

function calculateTransfers(players: Players[]) {
  const totalBalance = players.reduce((sum, p) => sum + p.balance, 0);
  const avg = Math.floor(totalBalance / players.length);

  players.forEach((p) => (p.diff = p.balance - avg));

  const debtors = players.filter((p) => p.diff! < 0);
  const creditors = players.filter((p) => p.diff! > 0);

  const transfers: Transfer[] = [];

  let i = 0,
    j = 0;
  while (i < creditors.length && j < debtors.length) {
    let creditor = creditors[i];
    let debtor = debtors[j];

    let amount = Math.min(creditor.diff!, Math.abs(debtor.diff!));

    if (amount > 0) {
      transfers.push({
        transfer: `${creditor.name} deve transferir ${amount.toLocaleString()} para ${debtor.name}`,
        transferMessage: `transfer ${amount} to ${debtor.name}`,
      });

      creditor.diff! -= amount;
      debtor.diff! += amount;
    }

    if (creditor.diff === 0) i++;
    if (debtor.diff === 0) j++;
  }

  return transfers;
}

function calculatePlayerDamage(players: Players[]) {
  return [...players]
    .map(({ name, damage }) => ({ name, damage }))
    .sort((a, b) => b.damage - a.damage);
}

export function calculatePartyResults(partyHunt: string) {
  const players = parsePartyHunt(partyHunt);
  const transfers = calculateTransfers(players);
  const playerDamage = calculatePlayerDamage(players);

  return { transfers, playerDamage };
}
