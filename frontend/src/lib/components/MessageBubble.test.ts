import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MessageBubble from './MessageBubble.svelte';
import type { Message } from '../types';

function msg(overrides: Partial<Message> = {}): Message {
  return {
    id: 'm1',
    role: 'assistant',
    content: 'Hello',
    sources: [],
    createdAt: 0,
    ...overrides
  };
}

describe('MessageBubble', () => {
  it('renders user content as plain text (no Markdown parsing)', () => {
    const { container } = render(MessageBubble, {
      props: { message: msg({ role: 'user', content: '**bold**' }) }
    });
    expect(container.querySelector('strong')).toBeNull();
    expect(screen.getByText('**bold**')).toBeInTheDocument();
  });

  it('renders assistant Markdown as HTML', () => {
    const { container } = render(MessageBubble, {
      props: { message: msg({ content: 'Hello **world**' }) }
    });
    expect(container.querySelector('strong')?.textContent).toBe('world');
  });

  it('sanitizes script tags in assistant content', () => {
    const { container } = render(MessageBubble, {
      props: { message: msg({ content: 'safe <script>alert(1)</script>' }) }
    });
    expect(container.querySelector('script')).toBeNull();
    expect(container.textContent).toContain('safe');
  });

  it('renders SourcesPanel only when sources are present', () => {
    const { rerender } = render(MessageBubble, { props: { message: msg({ sources: [] }) } });
    expect(screen.queryByText(/sources/i)).toBeNull();

    rerender({ message: msg({ sources: ['chunk-1'] }) });
    expect(screen.getByText(/sources \(1\)/i)).toBeInTheDocument();
  });
});
