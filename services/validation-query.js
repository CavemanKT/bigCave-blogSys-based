const jsdom = require("jsdom")
const jQuery = require("jquery")
const _ = require("lodash")

const $ = jQuery(new jsdom.JSDOM('<!DOCTYPE html><body></body>').window)

exports.encodeArray = function(path, errors) {
  return `${path}?${$.param({ errors: errors.array() })}`
}

exports.decodeArrayToObject = function(errors) {
  const objErrors = {}

  if (errors && errors.length > 0) {
    errors.forEach(function(error) {
      _.set(objErrors, error.param, error.msg)
    })
  }

  return objErrors
}