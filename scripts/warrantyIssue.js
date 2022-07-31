const Warranty = artifacts.require("Warranty");

module.exports = async function (callback) {
  // Coad goes here...
  let warranty = await Warranty.deployed();

  console.log(await warranty.Shop_owner());

  let _to = "0xB5D3dB96dfd6A02E937F34c4dD9dF8E3851e8468";
  let _serialId = 1005;
  let _validTill = 600;

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
