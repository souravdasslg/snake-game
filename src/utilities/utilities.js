let randomBetweenRange =(low,high) => {

    let number =  Math.floor(Math.random()*(high/10-low/10)+low/10) * 10
    return number

}
module.exports = {
    randomBetweenRange
}