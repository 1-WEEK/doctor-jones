import test from 'ava'
import dj from '../src'

const dumbOptions = {
  spacing: false,
  successiveExclamationMarks: true,
  ellipsisTolerance: 'all',
  replaceWithCornerQuotes: 'none'
}

const getOptions = option => Object.assign(dumbOptions, option)

test('do nothing', t => {
  const input = '增加文字的readabitily...'
  const output = dj(input, dumbOptions)
  t.is(output, input)
})

test('spacing', t => {
  const input = '你的jira上还有70多个bug没修'
  const output = dj(input, getOptions({ spacing: true }))
  t.is(output, '你的 jira 上还有 70 多个 bug 没修')
})

test('remove successive exclamation marks', t => {
  const input = '上台拿衣服！！！'
  const output = dj(input, getOptions({ successiveExclamationMarks: false }))
  t.is(output, '上台拿衣服！')
})

test('normalize ellipsis', t => {
  const input = '怎么，，，咬、、不...断。。。。'
  const noneToleranceOutput = dj(
    input,
    getOptions({ ellipsisTolerance: 'none' })
  )
  const dotsToleratedOutput = dj(
    input,
    getOptions({ ellipsisTolerance: '...' })
  )
  t.is(noneToleranceOutput, '怎么……咬……不……断……')
  t.is(dotsToleratedOutput, '怎么……咬……不...断……')
})

test('replace quotation marks', t => {
  const input = '他说：“什么是‘两开花’？”'
  const doubleQuoteOutput = dj(
    input,
    getOptions({ replaceWithCornerQuotes: 'double' })
  )
  const singleQuoteOutput = dj(
    input,
    getOptions({ replaceWithCornerQuotes: 'single' })
  )
  t.is(doubleQuoteOutput, '他说：「什么是『两开花』？」')
  t.is(singleQuoteOutput, '他说：『什么是「两开花」？』')
})
