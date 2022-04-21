export class LoadingService {
    spinner;

    registerSpinner(spinner) {
        this.spinner = spinner;
    }

    start() {
        console.log(this.spinner)
        this.spinner.ativo = true;
    }

    stop() {
        this.spinner.ativo = false;
    }
}
