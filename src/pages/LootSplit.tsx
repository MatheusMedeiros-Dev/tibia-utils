import { useState, type FormEvent } from "react";
import InputField from "../components/InputField";
import FormLayout from "../layouts/FormLayout";
import AppButton from "../components/AppButton";

import tropy1 from "../assets/trophy/gold.png";
import tropy2 from "../assets/trophy/silver.png";
import tropy3 from "../assets/trophy/bronze.png";
import {
  type Transfer,
  calculatePartyResults,
} from "../utils/calculatePartyResults";

type PlayerDamage = {
  name: string;
  damage: number;
};

const LootSplit = () => {
  const [partyHunt, setPartyHunt] = useState<string | null>(null);
  const [transfersResults, setTransfersResults] = useState<Transfer[] | null>(
    null
  );
  const [damagePlayers, setDamagePlayers] = useState<PlayerDamage[]>([]);
  const tropys = [tropy1, tropy2, tropy3];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (partyHunt) {
      const { transfers, playerDamage } = calculatePartyResults(partyHunt);
      setTransfersResults(transfers);
      setDamagePlayers(playerDamage);
    }
  };

  const handleCopy = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <FormLayout title="Loot Split" onSubmit={handleSubmit}>
        <InputField
          label="Party"
          type="textarea"
          inputStyle="textarea"
          name="partyHunt"
          onChange={(e) => setPartyHunt(e.target.value)}
          value={partyHunt!}
          placeholder="Cole o party hunt"
        />
        <AppButton type="submit" label="Dividir" />
      </FormLayout>

      {transfersResults !== null && (
        <FormLayout
          title="Result"
          formStyle="wasteDivisor"
          onSubmit={handleCopy}
        >
          {damagePlayers && (
            <div>
              <h1 className="text-center bg-red-500 my-3 font-bold text-xl rounded-xl">
                Dano
              </h1>
              {damagePlayers.map(
                (damage, index) =>
                  index <= 2 && (
                    <div key={index}>
                      <p className="flex">
                        <img src={tropys[index]} className="h-6 w-auto" />{" "}
                        {damage.name} - Damage: {damage.damage.toLocaleString()}
                      </p>
                    </div>
                  )
              )}
            </div>
          )}
          <h1 className="text-center bg-green-700 my-3 font-bold text-xl rounded-xl">
            Transferências
          </h1>

          {transfersResults.map((pt, index) => (
            <div className="rounded-xl" key={index}>
              <p className="text-sm ">
                {pt.transfer}{" "}
                <AppButton
                  type="button"
                  label="Copy"
                  buttonStyle="copy"
                  onClick={() =>
                    navigator.clipboard.writeText(pt.transferMessage)
                  }
                />
              </p>
            </div>
          ))}
        </FormLayout>
      )}
    </div>
  );
};

export default LootSplit;
