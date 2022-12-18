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
          <div class="input__file-button-text">
            <span v-if="first" class>{{ selectfileFirst.name }}</span>
            <span v-else>Выберите файл</span>
          </div>
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
          <div class="input__file-button-text">
            <span v-if="second">{{ selectfileSecond.name }}</span>
            <span v-else>Выберите файл</span>
          </div>
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
  mounted() {
    this.$store.state.refresh = true;
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
  width: 390px;
  height: 100px;
  padding: 100px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  font-size: 20px;
  font-weight: 400;
  height: auto;
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
  font-size: 20px;
}
.Uploading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nonFile {
  margin: 50px;
  font-size: 20px;
}
.FirstFile {
  margin-right: 5px;
}
</style>
