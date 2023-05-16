import fs from "fs";

export default (client) => {
  client.handleModals = async () => {
    const modalFolders = fs.readdirSync("./src/modals");
    for (const folder of modalFolders) {
      const modalFiles = fs
        .readdirSync(`./src/modals/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of modalFiles) {
        const { default: modal } = await import(
          `../../src/modals/${folder}/${file}`
        );
        client.modals.set(modal.data.name, modal);
      }
    }
  };
};
