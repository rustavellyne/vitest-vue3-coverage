import { mount } from '@vue/test-utils'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings';
import WordleBoard from '../WordleBoard.vue'

describe('HelloWorld', () => {
  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    // Arrange
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'TEST' } });
    // Act
    const guessInput = wrapper.find('input[type=text]');
    await guessInput.setValue('TESTS');
    await guessInput.trigger('keydown.enter');

   // Assert
    expect(wrapper.text()).toContain(VICTORY_MESSAGE);
  });
  test('a defeat message appears if the user makes a guess that is incorrect', async () => {
    // Arrange
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'TEST' } });
    // Act
    const guessInput = wrapper.find('input[type=text]');
    await guessInput.setValue('WRONG');
    await guessInput.trigger('keydown.enter');

    // Assert
    expect(wrapper.text()).toContain(DEFEAT_MESSAGE);
  });
  test.todo('no end-of-game appears if the user has not yet made a guess');
})
