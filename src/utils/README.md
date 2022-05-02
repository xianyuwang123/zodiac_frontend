# Utilities

## [Get the Ethereum Price Feeds](https://docs.chain.link/docs/ethereum-addresses)

```javascript
var networks = document.querySelectorAll('#feed-data');
var networkArray = []
for(var n=0; n<networks.length; n++) {
  var table = networks[n].querySelector('table tbody');
  var rows = table.childNodes;
  var pairArray = [];
  
  for(var i=0;i<rows.length;i++) {
    var cells = rows[i].cells;
    var pair = cells[0].innerText;
    var tokens = pair.split('/');

    if(tokens.length === 2) {
      var token0 = tokens[0].trim();
      var token1 = tokens[1].trim();

      var address = cells[1].innerText;

      var o = {
        id: i,
        pair: pair,
        token0: token0,
        token1: token1,
        address: address
      };
      pairArray.push(o);
    }
  }
  
  console.info(pairArray);
  
  networkArray.push(pairArray);
}
```

Then copy the data to clipboard by [copy(object)](https://developers.google.com/web/tools/chrome-devtools/console/utilities#copy)

```javascript
copy(networkArray[0]) // Mainnet
copy(networkArray[1]) // Kovan
copy(networkArray[2]) // Rinkeby
```
