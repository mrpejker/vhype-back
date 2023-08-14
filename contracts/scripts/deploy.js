async function main() {
    const VSelfEvents = await ethers.getContractFactory("VSelfEvents");
    // Start deployment, returning a promise that resolves to a contract object
    const vselfEvents = await VSelfEvents.deploy();
    await vselfEvents.deployed();
    console.log("Contract deployed to address:", vselfEvents.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });