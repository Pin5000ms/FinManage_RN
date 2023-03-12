export const SwitchIconSrc = (type) =>
{
    switch(type){
        case 'bank':
            return require('../../assets/bank.jpg');
        case 'cash':
            return require('../../assets/cash.jpg');
        case 'stock':
            return require('../../assets/stock.jpg');
        case 'foreign':
            return require('../../assets/foreign.jpg');
        case 'gold':
            return require('../../assets/gold.jpg');
        case 'digit':
            return require('../../assets/digit.png');
        default:
            return require('../../assets/icon.png');
    }

}