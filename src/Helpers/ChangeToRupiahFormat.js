import numeral from 'numeral'

numeral.register('locale', 'id', {
    delimiters: { 
        thousands: '.',
        decimal: ','
    },
    abbreviations: { 
        hunderd: 'rts',
        thousand: 'rb',
        million: 'jt',
        billion: 'm',
        trillion: 't'
    }, 
    currency: { 
        symbol: 'Rp'
    }
}) 

numeral.locale('id');

export const currency = (number) => { 
    return numeral(number).format('$0,0');
}