"use strict"

const _ = require("underscore")

module.exports = class FilterParams {

  constructor(params) {
    this.params = params
  }

  req(...strings) {
    _.flatten(strings).forEach(param => {
      const value = this.params[param]
      if (typeof value !== "boolean" && typeof value !== "number" && !value)
        throw new Error(`${param} is required`)
    })
    return this
  }

  permit(...strings) {
    let tempParams = {}
    _.flatten(strings).forEach(param => {
      /* not elimine false or null params */
      if (this.params[param] !== undefined)
        tempParams[param] = this.params[param]
    })

    this.params = tempParams
    return this
  }

  exclude(...strings) {
    _.flatten(strings).forEach(param => {
      if (param in this.params)
        delete this.params[param]
    })
    return this
  }

  forbid(...strings) {
    _.flatten(strings).forEach(param => {
      if (param in this.params)
        throw new Error(`${param} is forbidden`)
    })
    return this
  }

  commit() {
    return this.params
  }

}

