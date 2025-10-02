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
export const defaultPartyHunt = `Session data: From 2025-08-14, 15:47:18 to 2025-08-14, 18:42:55
Session: 02:55h
Loot Type: Leader
Loot: 7,839,016
Supplies: 2,310,505
Balance: 5,528,511
Faelz ika (Leader)
    Loot: 3,686,578
    Supplies: 410,377
    Balance: 3,276,201
    Damage: 5,587,893
    Healing: 781,134
Indiao
    Loot: 471,648
    Supplies: 616,617
    Balance: -144,969
    Damage: 6,573,919
    Healing: 2,371,786
Kazx
    Loot: 2,258,764
    Supplies: 823,687
    Balance: 1,435,077
    Damage: 9,140,849
    Healing: 780,876
Naboo
    Loot: 1,422,026
    Supplies: 459,824
    Balance: 962,202
    Damage: 11,756,782
    Healing: 2,005,016`;

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

  return { transfers, avg };
}

function calculatePlayerDamage(players: Players[]) {
  return [...players]
    .map(({ name, damage }) => ({ name, damage }))
    .sort((a, b) => b.damage - a.damage);
}

export function calculatePartyResults(partyHunt: string) {
  const players = parsePartyHunt(partyHunt);
  const transfersInfo = calculateTransfers(players);
  const playerDamage = calculatePlayerDamage(players);
  const profit = transfersInfo.avg;
  const transfers = transfersInfo.transfers;

  return { transfers, playerDamage, profit };
}
