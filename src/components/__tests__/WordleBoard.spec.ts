import { mount } from '@vue/test-utils'
import {DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE} from '@/settings';
import WordleBoard from '../WordleBoard.vue'
import {beforeEach, describe, expect} from 'vitest';
import {HTMLInputElement} from 'happy-dom';

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
  describe('End of game messages', () => {
    test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
      // Arrange
      // Act
      await playerSubmitGuess(wordOfTheDay)

      // Assert
      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });
    describe.each([
      { numberOfGuesses: 0, shouldSeeDefeatMessage: false },
      { numberOfGuesses: 1, shouldSeeDefeatMessage: false },
      { numberOfGuesses: 2, shouldSeeDefeatMessage: false },
      { numberOfGuesses: 3, shouldSeeDefeatMessage: false },
      { numberOfGuesses: 4, shouldSeeDefeatMessage: false },
      { numberOfGuesses: 5, shouldSeeDefeatMessage: false },
      { numberOfGuesses: 6, shouldSeeDefeatMessage: true }
    ])('a defeat message appears if the user makes a guess that is incorrect 6 times in row', ({numberOfGuesses, shouldSeeDefeatMessage}) => {
      test(`therefore for ${numberOfGuesses} guess(es), a defeat message should ${shouldSeeDefeatMessage ? '' : 'not'} appear`, async () => {
        for (let i = 0; i < numberOfGuesses; i++) {
          await playerSubmitGuess('WRONG');
        }
        if (shouldSeeDefeatMessage) {
          expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
        } else {
          expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
        }
      })
    });
    test('no end-of-game appears if the user has not yet made a guess', async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    });
  })
  describe('Rules for defining word of the day', () => {
    beforeEach(() => {
      console.warn = vi.fn();
    })
    test.each([
      { wordOfTheDay: 'HI', reason: 'word of the day must have 5 characters' },
      { wordOfTheDay: 'HEll', reason: 'word of the day must be in uppercase' },
      { wordOfTheDay: 'QWERTY', reason: 'word of the day must be a valid English word' }
    ])(
      `Since $reason: $wordOfTheDay is invalid, therefore a warning is emitted`, async ({ wordOfTheDay }) => {

      mount(WordleBoard, { props: { wordOfTheDay } });
      expect(console.warn).toHaveBeenCalled()
    });

    test('no warning is emitted if the word if the day provided is real uppercase English word within 5 characters', async () => {
      mount(WordleBoard, { props: { wordOfTheDay } });
      expect(console.warn).not.toHaveBeenCalled()
    });
  })
  describe('Player input', () => {
    test(`remains in focus the entire time`, async () => {
      document.body.innerHTML = `<div id="app"></div>`
      wrapper = mount(WordleBoard, {
        props: { wordOfTheDay },
        attachTo: '#app'
      });
      expect(wrapper.find('input[type=text]').attributes('autofocus')).not.toBeUndefined();

      await wrapper.find('input[type=text]').trigger('blur');
      expect(document.activeElement).toBe(wrapper.find('input[type=text]').element);
    });
    test(`player guesses are limited to ${WORD_SIZE} letters`, async () => {
      await playerSubmitGuess(wordOfTheDay + 'EXTRA');
      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });
    test('player guesses can only be submitted if they are real words', async () => {
      await playerSubmitGuess('QWERT');
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE);
    });
    test('player guesses are not case sensitive', async () => {
      await playerSubmitGuess(wordOfTheDay.toLowerCase());
      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });
    test('player guesses can only contain letters', async () => {
      await playerSubmitGuess('H3!RT');
      // @ts-ignore
      const inputEl = wrapper.find<HTMLInputElement>('input[type=text]').element;
      // @ts-ignore
      expect(inputEl.value).toEqual('HRT');
    });
    test('non-letter characters doesnt render on the screen while typed', async () => {
      await playerSubmitGuess('123');
      await playerSubmitGuess('345');
      // @ts-ignore
      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('');
    });

    test('the input gets cleared after each submission', async () => {
      await playerSubmitGuess('WRONG');
      // @ts-ignore
      expect(wrapper.find('input[type=text]').element.value).toEqual('')
    });

    test('the player loses control after the max amount of guesses have been sent', async () => {
      const guesses = ['WRONG', 'GUESS', 'HELLO', 'WORLD', 'HAPPY', 'CODER'];
      for (const guess of guesses) {
        await playerSubmitGuess(guess);
      }
      expect(wrapper.find('input[type=text]').attributes('disabled')).not.toBeUndefined();
    });

    test('the player loses control after thecorrect guess have been given', async () => {
      await playerSubmitGuess(wordOfTheDay);
      expect(wrapper.find('input[type=text]').attributes('disabled')).not.toBeUndefined();
    })
  })

  test('All previous guesses done by the player are visible in the page', async () => {
    const guesses = ['WRONG', 'GUESS', 'HELLO', 'WORLD', 'HAPPY', 'CODER'];
    for (const guess of guesses) {
      await playerSubmitGuess(guess);
    }
    for (const guess of guesses) {
      expect(wrapper.text()).toContain(guess);
    }
  })
})
