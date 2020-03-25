class Stack {
  constructor() {
    this.data = []
    this.top = 0
  }

  push(element) {
    this.data[this.top++] = element
  }

  size() {
    return this.top.length
  }

  peek() {
    return this.data[this.top - 1]
  }

  isEmpty() {
    return this.top === 0
  }

  pop() {
    if (this.isEmpty() === false) {
      --this.top
      return this.data.pop() // removes the last element
    }
  }

  values() {
    return this.data //.reverse()
  }

  toString() {
    return this.reverse().toString()
  }

  reverse() {
    this._reverse(this.top - 1)
  }

  _reverse(index) {
    if (index !== 0) {
      this._reverse(index - 1)
    }
  }
}

export default Stack
