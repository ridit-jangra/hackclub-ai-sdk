import { HackclubProvider } from "./provider";

const asd = new HackclubProvider(process.env.API_KEY ?? "");

await asd.generateImage("sunset", undefined, { save: true });
// → generated-1234567890.png

// custom name (ext auto-handled by the model's mime type)
await asd.generateImage("sunset", undefined, {
  save: true,
  filename: "my-sunset.png",
});
