import test from 'ava'
import { createElement as $ } from 'react'
import render from 'react-test-renderer'

import { App } from '..'

test('$(App)', assert => {
  assert.snapshot(render.create($(App)).toJSON())
})
