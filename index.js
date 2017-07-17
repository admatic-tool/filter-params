"use strict"


module.exports = class FilterParams {

  constructor(params) {
    this.params = params
  }

  req(strings) {
    strings.forEach(param => {
      const value = this.params[param]
      if (!value && typeof(value) !== "boolean")
        throw new Error(`${param} is required`)
    })
    return this
  }

  permit(strings) {
    let tempParams = {}
    strings.forEach(param => {
      /* not elimine false or null params */
      if (this.params[param] !== undefined)
        tempParams[param] = this.params[param]
    })

    this.params = tempParams
    return this
  }

  exclude(strings) {
    strings.forEach(param => {
      if (param in this.params)
        delete this.params[param]
    })
    return this
  }

  commit() {
    return this.params
  }

}

