const randomBetweenRange = (low, high) => {
  let number =
    Math.floor(Math.random() * (high / 10 - low / 10) + low / 10) * 10
  return number
}
const findIndexOfObject = (array = [], predicate = {}) => {
  let index = -1
  const isEquivalentObject = (first_element, second_element) => {
    if (first_element && second_element) {
      let first_element_props = Object.getOwnPropertyNames(first_element)
      let second_element_props = Object.getOwnPropertyNames(second_element)
      if (first_element_props.length !== second_element_props.length) {
        return false
      }
      for (var i = 0; i < first_element_props.length; i++) {
        var propName = first_element_props[i]
        if (first_element[propName] !== second_element[propName]) {
          return false
        }
      }
      return true
    } else {
      return false
    }
  }
  for (let i = 0; i <= array.length; i++) {
    if (isEquivalentObject(array[i], predicate)) {
      index = i
      break
    }
  }
  return index
}
module.exports = {
  randomBetweenRange,
  findIndexOfObject
}
