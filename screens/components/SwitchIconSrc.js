export const SwitchIconSrc = (type) =>
{
    switch(type){
        case 'bank':
            return require('../../assets/bank.png');
        case 'other':
            return require('../../assets/icon.png');
        default:
            return require('../../assets/icon.png');
    }

}