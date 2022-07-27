<template>
    <button type="button" @click="downloadExcel()" class="btn btn-outline-info btn-lg">
        <i class="fa fa-file-excel-o"></i>
    </button>
</template>

<script>
import {utils, writeFile} from 'xlsx';

export default {
    name: 'BotaoDownloadExcel', 
    props: ['dados', 'planilha','arquivo'], 
    methods: {
        downloadExcel() {
            // Cria um novo workbook/pasta de trabalho
            var wb = utils.book_new();
            // Cria um novo worksheet/planilha a partir dos dados passados como parâmetro
            var ws = utils.json_to_sheet(this.dados, {
                cellDates: true
            });
            // Anexa a planilha a pasta de trabalho
            utils.book_append_sheet(wb, ws, this.planilha);
            // Escreve o arquivo
            writeFile(wb, this.arquivo);
        }
    }
}
</script>

<style>

</style>