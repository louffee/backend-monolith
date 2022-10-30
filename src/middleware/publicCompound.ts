import express from 'express'

function publicCompound() {
  return express.static('public')
}

export default publicCompound
