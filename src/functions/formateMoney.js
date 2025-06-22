const formateMoney = (money, afterDot = 3, sep = ",") => {
    const s = money.split(sep)
    return money.includes(sep) ?  s[0] + sep + s[1].slice(0, afterDot) : money
}

export default formateMoney