import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma nova solicitação');

    expect(content).toBeTruthy();
  });

  it('should be not able to create a notification content with less 5 characters', () => {
    expect(() => new Content('vvv')).toThrow();
  });

  it('should be not able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('v'.repeat(241))).toThrow();
  });
});
