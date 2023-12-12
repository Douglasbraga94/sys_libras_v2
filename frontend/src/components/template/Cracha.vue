<template>
  <div style="display: none">
    <div v-for="item in itens"
        :key="item.codigo"
        class="cracha"
        :class="item.tipo"
        id="cracha">
      <p class="titulo">
        Grupo de Estudo em LIBRAS <br/>
        Congregação Cristã no Brasil
      </p>
      <p class="nome">{{ item.nome }}</p>
      <p class="comum">{{ item.comum.ADM }}</p>
      <p class="comum">{{ item.comum.cidade + '/' + item.comum.uf }}</p>
      <p class="comum">{{ item.comum.nome }}</p>
      <p class="codigo">{{ item.codigo }}</p>
      <p class="barras">*{{ item.codigo }}*</p>
      <p class="tipo" v-if="item.tipo !== 'surdo'">{{ item.tipo.toUpperCase() }}</p>
      <p class="tipoSurdo" v-else></p>
    </div>
  </div>
</template>

<script>
import * as htmlToImage from 'html-to-image';
import {ImageRun, TextRun, Document, PageOrientation, Paragraph, Packer} from 'docx';
import {Observable} from 'rxjs';
import * as saveAs from 'file-saver';
import moment from "moment";

export default {
  name: "Cracha",
  data: function () {
    return {
      itens: this.itens,
      export: false
    };
  },
  updated: async function () {
    if (this.export) {
      this.export = false;
      const doc = new Document({
        sections: [{
            properties: {
              page: {
                size: {
                  orientation: PageOrientation.LANDSCAPE
                }
              }
            },
            children: [
                new Paragraph({
                  children: await this.paragraphItems()
                })
            ]
          }]
      });

      Packer.toBlob(doc).then(file => {
        saveAs(file, `crachas_${moment().format("YYYYMMDD-HHmm")}.docx`)
        this.$emit("complete")
      });
    }
  },

  methods: {
    paragraphItems() {
      return new Promise( (resolve) => {
        const listaCrachas = [];
        let count = 0;
        this.loadImages().subscribe((image) => {
          if (++count > 1 && count % 2 === 0)
            listaCrachas.push(new TextRun("\t"));

          listaCrachas.push(new ImageRun({
            data: image,
            transformation: {
              width: 430,
              height: 537.5
            }
          }));

        }, null, () => {
          resolve(listaCrachas);
        });
      });
    },

    loadImages() {
      const crachas = document.getElementsByClassName("cracha");
      return new Observable(subscriber => {
        const completed = new Array(crachas.length).fill(false);
        for (let i = 0; i < crachas.length; i++) {
          htmlToImage.toPng(crachas[i], {width: 400, height: 500, canvasWidth: 1600, canvasHeight: 2000}).then(png => {
            subscriber.next(png);
            completed[i] = true;
            if (completed.every(i => i))
              subscriber.complete();
          })
        }
      });
    },
    setItens(itens) {
      this.itens = itens;
      this.export = true;
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Barcode39";
  font-weight: normal;
  font-style: normal;
  src: url("../../assets/LibreBarcode39-Regular.ttf");
}

.cracha {
  display: inline-block;
  border: solid 1px rgba(0, 0, 0, 0.5);
  width: 400px;
  height: 500px;
  padding: 16px;
  overflow: hidden;
  position: relative;

  text-align: center;
  box-sizing: border-box;
  background: url("../../assets/fundoCracha.svg");
}

.cracha p {
  line-height: normal;
  font-family: "Arial", sans-serif;
  margin: 0;
}

.cracha .titulo {
  margin-top: 10px;
  font-weight: bold;
  color: #043b5c;
}

.cracha .nome {
  margin-top: 85px;
  font-size: 24px;
  font-weight:bold;
}

.cracha .comum {
  margin-top:5px;
}

.cracha .codigo {
  position:absolute;
  bottom:175px;
  left:0;
  right:0;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
}

.cracha .barras {
  position:absolute;
  bottom:95px;
  left:0;
  right:0;
  margin-left: auto;
  margin-right: auto;  
  font-family: "Barcode39";
  font-size: 70px;
}

.cracha .tipo {
  position: absolute;
  bottom: 35px;
  left:0;
  right:0;
  margin-left: auto;
  margin-right:auto;
  font-weight: bold;
  font-size: 22px;
  color: #043b5c;
  text-align: center;
}

/* .cracha.interprete .tipo:before {
  content: "INTÉRPRETE";
}
.cracha.colaborador .tipo:before {
  content: "COLABORADOR";
}
.cracha.aluno .tipo:before {
  content: "ALUNO";
} */

.cracha.surdo .tipoSurdo {
  background: url("../../assets/logo_surdo.png") no-repeat center;
  background-size: 112px 85px;
  position: absolute;
  left: 0;
  bottom: 8px;
  width: 100%;
  height: 85px;
  z-index: 1000;
  content: "";
}
</style>
