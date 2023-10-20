import bigDecimal from 'js-big-decimal'

class Decimals {

  divide(a, b) {
    const n1 = new bigDecimal(String(a))
    const n2 = new bigDecimal(String(b))
    return n1.divide(n2).value
  }

  gte(a, b) {
    const n1 = new bigDecimal(String(a))
    const n2 = new bigDecimal(String(b))
    const evaluate = n1.compareTo(n2)
    if (evaluate > 0 || evaluate === 0) return true
    return false
  }

  lte(a, b) {
    const n1 = new bigDecimal(String(a))
    const n2 = new bigDecimal(String(b))
    const evaluate = n1.compareTo(n2)
    if (evaluate < 0) return true
    return false
  }

  // both need to be strings
  multBigN(a, b){
    const aBN = BigInt(String(a))
    const bBN = BigInt(String(b))
    return String(aBN * bBN)
  }

  d(amount, decimals, precision) {
    if (amount === '0') return amount
    if (precision) {
      return round(weiToDisplay(amount, decimals), precision)
    }
    return weiToDisplay(amount, decimals)
  }


  // convert display to gwei, without using floating point math.
  displayToWei(display, decimals) {

    let d = JSON.parse(JSON.stringify(display));

    // index of decimal point
    let floats;
    if (typeof d === 'string' && d.length > 0) {
      for (let i = 0; i < d.length; i++) {
        if (d[i] === '.') {
          floats = (d.length - 1) - i;
        }
      }

      // determine position of decimal point
      let offset;
      if (decimals < floats) { // chop off numbers that have more digits than decimals
        let diff = floats - decimals
        d = display.slice(0, display.length - diff)
        offset = 0;
      }
      else if (floats) {
        offset = decimals - floats
      } else {
        offset = decimals
      }

      // pad the end with zeroes and remove decimal point
      let acc = d;
      for (let i = 0; i < offset; i++) {
        acc += '0'
      }
      acc = acc.replace('.', '');

      // remove leading zeroes
      let acc2 = ''
      let done = false;
      for (let i = 0; i < acc.length; i++) {
        if (acc[i] !== '0') done = true;
        if (done) acc2 += acc[i];
      }

      // if nothing left, return zero
      if (acc2 === '') acc2 = '0'

      return acc2;
    } else {
      return 'Error'
    }
  }

  com(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  }

  round(_value, decimals) {
    if (typeof _value === 'undefined') {
      console.log('cannot round: ' + _value)
      return _value
    }
    let value = _value
    if (typeof value !== 'string') {
      value = String(_value)
    }
    const d = bigD(value)
    return d.round(decimals, bigDecimal.RoundingModes.FLOOR).getValue()
  }

  bigD(value) {
    let raw
    if (typeof value !== 'string') {
      raw = value.toString()
    } else {
      raw = value
    }
    return new bigDecimal(raw)
  }


}

export default Decimals



const weiToDisplay = (gwei, decimals) => {
  let acc = ''
  let g = String(gwei)
  if (typeof g === 'string' && g.length > 0) {
    if (g.length <= decimals) {
      g = g.padStart(decimals + 1, '0')
    }
    let index = g.length - decimals - 1;
    for (let i = 0; i < g.length; i++) {
      acc += g[i]
      if (index === i) {
        if (g[i] !== '.') {
          acc += '.'
        }
      }
    }
    // remove trailing zeroes after decimal point
    let finished = false
    for (let i = acc.length - 1; i > 0; i--) {
      if (acc[i] === '.' && !finished) {
        acc = acc.slice(0, acc.length - 1)
        finished = true
      }
      if (acc[i] !== '0') {
        finished = true
      }
      if (!finished) {
        acc = acc.slice(0, acc.length - 1)
      }
    }
    return acc

  } else {
    return 'Error'
  }
}