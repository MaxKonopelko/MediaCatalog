export function formContent(content: string, callback: Function): string
{
  const id = `form-id-${Math.random()}`;

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
        callback();
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