import { APIChatInputApplicationCommandInteraction, APIPingInteraction } from "discord-api-types/v10";
import { verifyKey, InteractionType } from "discord-interactions";
import nacl from "tweetnacl";

export const verifyInteractionsRequest = async (req: Request, discordPublicKey: string) => {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const rawBody = await req.text();

  if (!signature || !timestamp) return { isVerified: false };

  //   const isVerified = verifyKey(rawBody, signature, timestamp, discordPublicKey);
  //   if (!isVerified) return { isVerified: false };

  const isVerified = verifyWithNacl({
    discordPublicKey,
    rawBody,
    signature,
    timestamp,
  });

  if (!isVerified) return { isVerified: false };

  return {
    isVerified,
    interaction: JSON.parse(rawBody) as unknown as
      | APIPingInteraction
      | APIChatInputApplicationCommandInteraction,
  };
};

const verifyWithNacl = ({ discordPublicKey, signature, rawBody, timestamp }: VerifyWithNaclArgs) => {
  return nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, "hex"),
    Buffer.from(discordPublicKey, "hex")
  );
};

type VerifyWithNaclArgs = {
  discordPublicKey: string;
  rawBody: string;
  signature: string;
  timestamp: string;
};
