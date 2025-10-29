import { mount } from '@vue/test-utils'
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
    expect(wrapper.text()).toContain('You Won!');
  })
})
