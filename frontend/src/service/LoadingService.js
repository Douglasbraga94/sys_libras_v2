export class LoadingService {
    spinner;

    registerSpinner(spinner) {
        this.spinner = spinner;
    }

    start() {
        this.spinner.enable(true);
    }

    stop() {
        this.spinner.enable(false);
    }
}
