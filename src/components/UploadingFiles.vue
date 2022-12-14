<template>
  <div class="AllFiles">
    <div class="Uploading">
      <div class="FirstFile">
        <input
          class="input__file"
          id="input__file"
          type="file"
          ref="file"
          accept=".xlsx, .xls"
          @change="FirstFileUpload"
        />
        <label for="input__file" class="input__file-button">
          <span v-if="first" class="input__file-button-text">{{
            selectfileFirst.name
          }}</span>
          <span v-else class="input__file-button-text">Выберите файл</span>
        </label>
      </div>
      <div class="SecondFile">
        <input
          class="input__file"
          id="input__file2"
          type="file"
          ref="file"
          accept=".xlsx, .xls"
          @change="SecondFileUpload"
        />
        <label for="input__file2" class="input__file-button">
          <span v-if="second" class="input__file-button-text">{{
            selectfileSecond.name
          }}</span>
          <span v-else class="input__file-button-text">Выберите файл</span>
        </label>
      </div>
    </div>
    <div class="nextPage" v-if="first && second">
      <button class="FromTo" @click="$router.push({ name: 'Comp' })">
        Next
      </button>
    </div>
    <div v-else class="nonFile">
      <p>Загрузите 2 файла</p>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      first: false,
      second: false,
      selectfileFirst: "",
      selectfileSecond: "",
      firstFileData: "",
      SecondFileData: "",
    };
  },
  methods: {
    //превращаю файлы EXCEL в JSON
    FirstFileUpload(event) {
      this.selectfileFirst = event.target.files[0];
      const filereader = new FileReader();
      filereader.readAsBinaryString(this.selectfileFirst);
      filereader.onload = (event) => {
        const data = event.target.result;
        const file = XLSX.read(data, { type: "binary" });
        file.SheetNames.forEach((sheet) => {
          this.firstFileData = XLSX.utils.sheet_to_row_object_array(
            file.Sheets[sheet]
          );
          console.log(this.firstFileData);
        });
        this.first = true;
        this.$store.commit("FIRST_FILE_DATA", this.firstFileData);
        this.$store.commit("FIRST_FILE_NAME", this.selectfileFirst.name);
      };
    },
    //превращаю файлы EXCEL в JSON
    SecondFileUpload(event) {
      this.selectfileSecond = event.target.files[0];
      const filereader = new FileReader();
      filereader.readAsBinaryString(this.selectfileSecond);
      filereader.onload = (event) => {
        const data = event.target.result;
        const file = XLSX.read(data, { type: "binary" });
        file.SheetNames.forEach((sheet) => {
          this.SecondFileData = XLSX.utils.sheet_to_row_object_array(
            file.Sheets[sheet]
          );
          console.log(this.SecondFileData);
        });
        this.second = true;
        this.$store.commit("SECOND_FILE_DATA", this.SecondFileData);
        this.$store.commit("SECOND_FILE_NAME", this.selectfileSecond.name);
      };
    },
  },
};
</script>

<style>
.AllFiles {
  border: 3px solid;
  border-radius: 60px;
  width: 500px;
  height: 300px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  min-height: 105px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.FirstFile {
  margin: 0 0 10px;
  padding: 80px 0 0 0;
}
.nextPage {
  margin-top: 10px;
  margin-bottom: 10px;
}
.input__file-button-text {
  margin-top: 1px;
  border: 1px solid;
  border-radius: 10px;
  background-color: #57d585;
  font-size: 15px;
  font-weight: 400;
  height: 30px;
  padding: 0 20px;
}
.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
.FromTo {
  padding: 0 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  height: 30px;
  font-size: 15px;
  font-weight: 400;
  text-decoration: none;
  background-color: #57d585;
  margin: 50px;
}
.Uploading {
  margin-top: 10px;
}
.nonFile {
  margin: 50px;
}
</style>
