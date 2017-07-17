"use strict"

const FilterParams = require("../index")
const { expect } = require("chai")

describe("FilterParams", () => {

  const attrs = {
    user_id: "xxx",
    email: "xxx@email.com",
    name: null,
    isValid: false,
  }

  let filter

  beforeEach(() => {
    filter = new FilterParams(attrs)
  })

  describe("#req", () => {

    context("when not found attribute", () => {

      it("null attribute raise error", () => {

        let error

        try {
          filter.req([ "name" ])
        } catch(err) {
          error = err
        }

        expect(error.message).to.be.eql("name is required")
      })

      it("undefined attribute raise error", () => {

        let error

        try {
          filter.req([ "not_exists" ])
        } catch(err) {
          error = err
        }

        expect(error.message).to.be.eql("not_exists is required")
      })
    })

    context("valid attributes", () => {
      it("false value is a valid value", () => {
        filter.req([ "isValid" ]).commit()
      })
    })
  })

  describe("#permit", () => {
    it("filter only permited keys", () => {
      const params = filter.permit([ "isValid" ]).commit()

      expect(params).to.have.all.keys("isValid")
    })
  })

  describe("#exclude", () => {
    it("exclude indicated keys", () => {
      const params = filter.exclude([ "isValid" ]).commit()

      expect(params).to.have.all.keys("user_id", "email", "name")
    })
  })

})
