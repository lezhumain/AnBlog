import { EscapeHtmlPipe } from './keep-html.pipe';

describe('KeepHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new EscapeHtmlPipe(null); // TODO
    expect(pipe).toBeTruthy();
  });
});
