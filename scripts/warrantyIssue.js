const Warranty = artifacts.require("Warranty");

module.exports = async function (callback) {
  // Coad goes here...
  let warranty = await Warranty.deployed();

  console.log(await warranty.Shop_owner());

  let _to = "0x2874314f6e2D61949e3Bd7aB8C2a624D2FA7e0aB";
  let _serialId = 1006;
  let _validTill = 60000;

  const result = await warranty.warrantyIssue(_to, _serialId, _validTill);

  console.log(
    "Warranty issued to ",
    _to,
    " for serialID ",
    _serialId,
    "  and valid till next ",
    _validTill,
    " sec"
  );
  const _tokenId = result.logs[0].args._tokenId.toNumber();
  console.log("Token Id for this Warranty :", _tokenId);

  console.log(await warranty.isValid(_tokenId));
  const ValidTill = await warranty.validTill(_tokenId);
  console.log(ValidTill.toNumber());
  console.log(await warranty.tokenIdToPerson(_tokenId));
  console.log(await warranty.warrantyIssuedTo(_to, _serialId));

  callback();
};
