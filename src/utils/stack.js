class Stack {
  constructor() {
    this.data = []
    this.top = 0
  }

  push(element) {
    this.data[this.top] = element
    ++this.top
  }

  size() {
    return this.top
  }

  peek() {
    return this.data[this.top - 1]
  }

  isEmpty() {
    return this.top === 0
  }

  pop() {
    if (this.isEmpty() === false) {
      this.top = this.top - 1
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
    if (index != 0) {
      this._reverse(index - 1)
    }
    console.log(this.data[index])
  }
}

export default Stack
