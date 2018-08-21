"use strict"

const FilterParams = require("../index")
const { expect } = require("chai")

describe("FilterParams", () => {

  const attrs = {
    user_id: "xxx",
    email: "xxx@email.com",
    name: null,
    isValid: false,
    emptyString: "",
    zero: 0,
    zeroString: "0",
    zeroFloat: 0.0,
    float: 0.1,
  }

  let filter

  beforeEach(() => {
    filter = new FilterParams(attrs)
  })

  describe("#forbid", () => {

    it("forbid values with an error", () => {
      expect(() => filter.forbid([ "isValid" ]).commit()).to.throw("isValid is forbidden")
    })

    it("works with rest params too", () => {
      expect(() => filter.forbid("isValid").commit()).to.throw("isValid is forbidden")
    })
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

    })

    context("valid attributes", () => {
      it("false value is a valid value", () => {
        filter.req([ "isValid" ]).commit()
      })

      it("works with rest params too", () => {
        filter.req("isValid").commit()
      })

      it("zero attribute is a valid value", () => {
        filter.req([ "zero" ]).commit()
      })

      it("zero attribute is a valid value (rest)", () => {
        filter.req("zero").commit()
      })

      it("string zero attribute is a valid value", () => {
        filter.req([ "zeroString" ]).commit()
      })

      it("zero float is a valid value", () => {
        filter.req([ "zeroFloat" ]).commit()
      })

      it("float number is a valid value", () => {
        filter.req([ "float" ]).commit()
      })
    })

    context("only some parameters required", () => {
      it("should work", () => {
        filter.req("isValid", "zero", "float").commit()
      })

      it("should work with rest too", () => {
        filter.req([ "isValid", "zero", "float" ]).commit()
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

      expect(params).to.have.all.keys("user_id", "email", "name", "zero", "emptyString", "zeroString", "zeroFloat", "float")
    })

    it("works with rest params too", () => {
      const params = filter.exclude("isValid").commit()

      expect(params).to.have.all.keys("user_id", "email", "name", "zero", "emptyString", "zeroString", "zeroFloat", "float")
    })
  })

})
