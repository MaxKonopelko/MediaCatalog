export function formContent(content: string, callback: Function): string
{
  const id: string = `form-id-${Math.random()}`;

  setTimeout(() =>
  {
    const form = document.getElementById(id) as HTMLFormElement;

    form.addEventListener('submit', (event: Event) =>
    {
      event.preventDefault();

      if (form.checkValidity())
      {
        console.log('VALID');
        form.classList.remove('was-validated');
        const arr = formParse(form);
        callback(arr);
      }
      else
      {
        console.log('INVALID');
        form.classList.add('was-validated');
      }
    });
  }, 1);
  return `<form class="form" noValidate id="${id}">${content}</form>`;
}

export function formParse(form: HTMLFormElement & HTMLElement): object
{
  const inputCollection = form.querySelectorAll('input');
  const inputList = Array.from(inputCollection);
  const obj = {};

  for (const input of inputList)
  {
    if (input.getAttribute('type') !== 'submit')
    {
      obj[input.getAttribute('name')] = input.value;
    }
  }

  return obj;
}
