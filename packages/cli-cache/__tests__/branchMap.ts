import { BranchMap } from '../src/branchMap'

test('insertorupdate', async () => {
  const git = 'testgit';
  const local = 'testlcoal';
  const target = 'targetbrtanch'
  await BranchMap.insertOrUpdate(git, local, target);

  expect(BranchMap.getTargetBranch(git, local)).toEqual(target);
});