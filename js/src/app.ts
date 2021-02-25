class UserInterface {
  public x1Val: HTMLInputElement = document.getElementById('x1')! as HTMLInputElement;
  public y1Val: HTMLInputElement = document.getElementById('y1')! as HTMLInputElement;
  public x2Val: HTMLInputElement = document.getElementById('x2')! as HTMLInputElement;
  public y2Val: HTMLInputElement = document.getElementById('y2')! as HTMLInputElement;
  public resultsList: HTMLUListElement = document.querySelector(
    '.results'
  )! as HTMLUListElement;

  public button: HTMLButtonElement = document.querySelector('button');

  loader: any;

  public printStep(step: string): void {
    const li: HTMLLIElement = document.createElement('li');
    li.innerText = step;
    this.resultsList.appendChild(li);
  }

  public printResults(reuslts: string): void {
    const li: HTMLLIElement = document.createElement('li');
    li.innerHTML = `<b>${reuslts}</b>`;
    this.resultsList.appendChild(li);
  }

  public showErrorMessage(err: string): void {
    //@ts-ignore
    Swal.fire('!Error!', err, 'error');
  }

  public showLoader(): void {
    //@ts-ignore
    this.loader = Swal.fire({
      title: 'Cargando',
      didOpen: () => {
        //@ts-ignore
        Swal.showLoading();
      },
    });
  }

  public removeLoader() {
    this.loader.close();
  }
}

const UI = new UserInterface();
UI.showLoader();

window.addEventListener('load', () => UI.removeLoader());

UI.button.addEventListener('click', () => {
  const x1 = UI.x1Val.value.trim();
  const y1 = UI.y1Val.value.trim();
  const x2 = UI.x2Val.value.trim();
  const y2 = UI.y2Val.value.trim();
  if (isEmpty(x1, x2, y1, y2)) {
    return UI.showErrorMessage('Por favor, rellene correctamente todos los campos.');
  }
  UI.resultsList.innerHTML = '';
  console.log(eval(x1), eval(y1), eval(x2), eval(y2));
  calculateDistance(eval(x1), eval(y1), eval(x2), eval(y2));
});

UI.x1Val.addEventListener('input', validateString);
UI.x2Val.addEventListener('input', validateString);
UI.y1Val.addEventListener('input', validateString);
UI.y2Val.addEventListener('input', validateString);

function validateString(e: any) {
  if (/[A-z]/.test(e.target.value)) {
    const t = e.target.value;
    e.target.value = t.substring(0, t.length - 1);
  }
}

function isEmpty(...strings: string[]) {
  return strings.some(str => str.trim() === '');
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number): void {
  UI.printStep(`d = √(x2 - x1)^2 + (y1 - y2)^2`);
  UI.printStep(`d = √(${x2} - ${x1})^2 + (${y1} - ${y2})^2`);
  const firstSubs: number = x2 - x1;
  const secondSubs: number = y1 - y2;
  UI.printStep(`d = √(${firstSubs})^2 + (${secondSubs})^2`);
  const firstPower: number = firstSubs ** 2;
  const secondPower: number = secondSubs ** 2;
  UI.printStep(`d = √${firstPower} + ${secondPower}`);
  const addition: number = firstPower + secondPower;
  UI.printStep(`d = √${addition}`);
  const results: number = Math.sqrt(addition);
  UI.printResults(`d = ${results}`);
}
