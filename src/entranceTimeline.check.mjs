import assert from 'node:assert/strict';
import { test } from 'node:test';
import { clamp01, entranceState, scrollProgress } from './entranceTimeline.js';

test('progress clamps overscroll and uses the actual sticky height', () => {
  assert.equal(clamp01(-1), 0);
  assert.equal(clamp01(2), 1);
  assert.equal(scrollProgress(40, 3000, 800), 0);
  assert.equal(scrollProgress(-1100, 3000, 800), 0.5);
  assert.equal(scrollProgress(-2200, 3000, 800), 1);
  assert.equal(scrollProgress(-9000, 3000, 800), 1);
  assert.equal(scrollProgress(0, 800, 800), 0);
});

test('closed entrance, hinge midpoint and fully open doorway', () => {
  const start = entranceState(0);
  assert.equal(start.headingAlpha, 1);
  assert.equal(start.doorOpen, 0);
  assert.equal(start.danceOn, false);
  assert.equal(start.showInvite, false);
  assert.ok(Math.abs(entranceState(0.17).doorOpen - 0.5) < 1e-9);
  assert.equal(entranceState(0.29).doorOpen, 1);
});

test('dance begins after the facade fades and completion shows invitation', () => {
  assert.equal(entranceState(0.36).danceOn, false);
  const dance = entranceState(0.5);
  assert.equal(dance.visualAlpha, 0);
  assert.equal(dance.danceAlpha, 1);
  assert.equal(dance.danceOn, true);
  const done = entranceState(0.5, { danceDone: true });
  assert.equal(done.danceOn, false);
  assert.equal(done.showInvite, true);
  assert.equal(done.danceAlpha, 0);
});

test('fast scrolling can always bypass the dance', () => {
  for (const t of [0.94, 0.99, 1, 2]) {
    assert.equal(entranceState(t).showInvite, true);
    assert.equal(entranceState(t).danceOn, false);
  }
});

test('scrolling back shows the gate even after completion and re-arms at the top', () => {
  const back = entranceState(0.17, { danceDone: true });
  assert.equal(back.showInvite, false);
  assert.equal(entranceState(0.05, { danceDone: true }).resetDance, true);
  assert.equal(entranceState(0.5).resetDance, false);
});

test('reduced motion shows a static open palace and invitation at every progress', () => {
  for (const t of [0, 0.2, 0.5, 1]) {
    const state = entranceState(t, { reduced: true });
    assert.equal(state.showInvite, true);
    assert.equal(state.danceOn, false);
    assert.equal(state.doorOpen, 1);
    assert.equal(state.visualScale, 1);
    assert.equal(state.visualAlpha, 1);
  }
});
