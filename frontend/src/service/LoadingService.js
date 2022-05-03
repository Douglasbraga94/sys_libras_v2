export class LoadingService {
    spinner;
    level = 0;

    registerSpinner(spinner) {
        this.spinner = spinner;
    }

    start() {
        if (this.level > 0)
            console.warn("Atenção, sobreposição do loading!");
        this.spinner.enable(++this.level > 0);
    }

    stop() {
        this.spinner.enable(--this.level > 0);
    }
}
