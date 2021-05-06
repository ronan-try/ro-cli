import { gitBranchR, gitBranchLocal, gitRemoteV } from '../src/git'

test('gitBranchLocal: __dirname', async () => {
  const res = await gitBranchLocal(__dirname)

  console.log(res)

  expect(res.code).toBe(0)
});

test('gitRemoteV: __dirname', async () => {
  const res = await gitRemoteV(__dirname)

  expect(res.code).toBe(0)
});

test('gitBranchR: __dirname', async () => {
  const res = await gitBranchR(__dirname)

  console.log(res)

  expect(res.code).toBe(0)
});
