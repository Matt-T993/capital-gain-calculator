export function getEventDescription(event, assets): string {
  let msg = '';
  switch (event.eventType) {
    case 'BUY':
      msg += 'Bought ';
      break;
    case 'SELL':
      msg += 'Sold ';
      break;
  }
  msg += event.quantity;
  msg += ' ';
  let asset = assets.find((element) => element.assetId == event.assetId);
  if (asset == undefined) {
    msg += 'unknown asset #';
    msg += event.assetId;
  } else {
    msg += asset.assetIdentifier;
    switch (asset.assetType) {
      case 'STOCK':
        msg += ' shares';
        break;
      case 'CRYPTO':
        msg += ' crypto';
        break;
    }
  }

  msg += ' for ';
  // msg += event.pricePerUnit;
  // msg += " 💵 (total: ";
  msg += '💵' + ' ' + event.pricePerUnit * event.quantity;
  return msg;
}
