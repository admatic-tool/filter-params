"use strict"

const FilterParams = require("../index")
const { expect } = require("chai")

describe("FilterParams", () => {

  const attrs = {
    user_id: "xxx",
    email: "xxx@email.com",
    name: null,
    isValid: false,
    zero: 0,
    zeroString: "0",
    emptyString: "",
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

      it("null attribute raise error with rest too", () => {
        let error

        try {
          filter.req("name")
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

      it("undefined attribute raise error with rest", () => {

        let error

        try {
          filter.req("not_exists")
        } catch(err) {
          error = err
        }

        expect(error.message).to.be.eql("not_exists is required")
      })

      it("empty string raise error", () => {
        let error

        try {
          filter.req("emptyString")
        } catch(err) {
          error = err
        }

        expect(error.message).to.be.eql("emptyString is required")
      })

      it("zero attribute dont raise error", () => {
        filter.req([ "zero" ]).commit()
      })

      it("string zero attribute dont raise error", () => {
        filter.req([ "zeroString" ]).commit()
      })

    })

    context("valid attributes", () => {
      it("false value is a valid value", () => {
        filter.req([ "isValid" ]).commit()
      })

      it("works with rest params too", () => {
        filter.req("isValid").commit()
      })
    })
  })

  describe("#permit", () => {
    it("filter only permited keys", () => {
      const params = filter.permit([ "isValid" ]).commit()

      expect(params).to.have.all.keys("isValid")
    })

    it("works with rest params too", () => {
      const params = filter.permit("isValid").commit()

      expect(params).to.have.all.keys("isValid")
    })
  })

  describe("#exclude", () => {
    it("exclude indicated keys", () => {
      const params = filter.exclude([ "isValid" ]).commit()

      expect(params).to.have.all.keys("user_id", "email", "name", "zero", "zeroString", "emptyString")
    })

    it("works with rest params too", () => {
      const params = filter.exclude("isValid").commit()

      expect(params).to.have.all.keys("user_id", "email", "name", "zero", "zeroString", "emptyString")
    })
  })

})
