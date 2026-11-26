/* eslint-disable no-console -- example script: printing to stdout is the point */
// Mints a 32-byte master key encoded as base64. Store the output as
// CRYPTFLARE_MASTER_KEY in your secrets manager.
import { randomBytes } from 'node:crypto'

const key = randomBytes(32).toString('base64')
console.log(key)
