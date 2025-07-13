import { FormEvent, useState } from 'react';
import { askala_baseapp_backend } from '../../declarations/askala_baseapp_backend'

function App() {
  const [greeting, setGreeting] = useState<string>('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const name = nameInput?.value || '';

    askala_baseapp_backend.greet(name).then((greeting: string) => {
      setGreeting(greeting);
    });
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" name="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
