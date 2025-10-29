import { mount } from '@vue/test-utils'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings';
import WordleBoard from '../WordleBoard.vue'
import {beforeEach} from 'vitest';

describe('HelloWorld', () => {
  let wordOfTheDay: string = 'TESTS';
  let wrapper: ReturnType<typeof mount>;

  async function playerSubmitGuess(guess: string) {
    const guessInput = wrapper.find('input[type=text]');
    await guessInput.setValue(guess);
    await guessInput.trigger('keydown.enter');
  }

  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } });
  });
  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    // Arrange
    // Act
    await playerSubmitGuess(wordOfTheDay)

   // Assert
    expect(wrapper.text()).toContain(VICTORY_MESSAGE);
  });
  test('a defeat message appears if the user makes a guess that is incorrect', async () => {
    // Act
    await playerSubmitGuess('WRONG')

    // Assert
    expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
  });
  test('no end-of-game appears if the user has not yet made a guess', async () => {
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
  });
})
