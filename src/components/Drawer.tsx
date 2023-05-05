import { ParentProps, createEffect, createSignal, onCleanup, onMount, untrack } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { Icon } from './Icon';

type DrawerProps = ParentProps & {
  onClosed: () => void;
};

export function Drawer(props: DrawerProps) {
  const [contentOpen, setContentOpen] = createSignal(true);
  const [backdropOpen, setBackdropOpen] = createSignal(true);
  const [closed, setClosed] = createSignal(false);

  onMount(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setContentOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    onCleanup(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
  });

  createEffect(() => {
    if (closed()) {
      props.onClosed();
    }
  });

  return (
    <FadeInOut onAfterExit={() => setClosed(true)}>
      {backdropOpen() && (
        <div
          class="fixed flex justify-end w-full h-full top-0 left-0 z-20 bg-black/80"
          onClick={() => setContentOpen(false)}
        >
          <SlideInOut onAfterExit={() => setBackdropOpen(false)}>
            {contentOpen() && (
              <div
                role="dialog"
                class="max-w-lg w-full h-full bg-white right-0 left-0 p-8"
                onClick={event => event.stopPropagation()}
              >
                <button
                  type="button"
                  class="mb-8 p-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full"
                  aria-label="Close"
                  onClick={() => setContentOpen(false)}
                >
                  {/* class="h-6 w-6" */}
                  <Icon variant="arrow-left"></Icon>
                </button>
                <div>{props.children}</div>
              </div>
            )}
          </SlideInOut>
        </div>
      )}
    </FadeInOut>
  );
}

type SlideInOutProps = ParentProps & {
  onAfterExit: () => void;
};

function SlideInOut(props: SlideInOutProps) {
  return (
    <Transition
      appear
      onBeforeEnter={ifHTMLElement(el => {
        el.style.transform = 'translateX(100%)';
      })}
      onEnter={(el, done) => {
        const anim = el.animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }], { duration: 200 });
        anim.finished.then(done);
      }}
      onAfterEnter={ifHTMLElement(el => {
        el.style.transform = 'translateX(0)';
      })}
      onExit={(el, done) => {
        const anim = el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }], { duration: 200 });
        anim.finished.then(done);
      }}
      onAfterExit={untrack(() => props.onAfterExit)}
    >
      {props.children}
    </Transition>
  );
}

type FadeInOutProps = ParentProps & {
  onAfterExit: () => void;
};

function FadeInOut(props: FadeInOutProps) {
  return (
    <Transition
      appear
      onBeforeEnter={ifHTMLElement(el => {
        el.style.background = 'rgb(0 0 0 / 0)';
        el.style.backdropFilter = 'blur(0)';
      })}
      onEnter={(el, done) => {
        const anim = el.animate(
          [
            { background: 'rgb(0 0 0 / 0)', backdropFilter: 'blur(0)' },
            { background: 'rgb(0 0 0 / 0.7)', backdropFilter: 'blur(4px)' },
          ],
          { duration: 250 },
        );
        anim.finished.then(done);
      }}
      onAfterEnter={ifHTMLElement(el => {
        el.style.background = 'rgb(0 0 0 / 0.7)';
        el.style.backdropFilter = 'blur(4px)';
      })}
      onExit={(el, done) => {
        const anim = el.animate(
          [
            { background: 'rgb(0 0 0 / 0.7)', backdropFilter: 'blur(4px)' },
            { background: 'rgb(0 0 0 / 0)', backdropFilter: 'blur(0)' },
          ],
          { duration: 250 },
        );
        anim.finished.then(done);
      }}
      onAfterExit={ifHTMLElement(el => {
        el.style.background = 'rgb(0 0 0 / 0)';
        el.style.backdropFilter = 'blur(0)';
        untrack(() => props.onAfterExit());
      })}
    >
      {props.children}
    </Transition>
  );
}

function ifHTMLElement<Rest extends Array<unknown>>(fn: (el: HTMLElement, ...args: Rest) => void) {
  return (el: Element, ...args: Rest) => {
    if (!(el instanceof HTMLElement)) {
      throw new Error('Tried to run function on a non-HTML Element');
    }

    return fn(el, ...args);
  };
}
