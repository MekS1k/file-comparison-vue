<template>
  <div class="AllData">
    <div class="AllColumns">
      <div class="HeadersExcel">
        <div class="block">
          <span class="nameFile">{{ fileName1 }}</span>
          <div
            v-for="(countSelect, index) in this.countOfSelectFirstFile"
            :key="countSelect.id"
            class="ColumnFirstFile"
          >
            <select v-model="headerFirst[index]" @change="pushHeaders">
              <option value="">Не выбрано</option>
              <option
                v-for="heading in headersForFirstFile"
                :key="heading.id"
                :value="heading"
              >
                {{ heading }}
              </option>
            </select>
          </div>
        </div>
        <div class="block1">
          <span class="nameFile">{{ fileName2 }}</span>
          <div
            v-for="(countSelect2, index2) in this.countOfSelectFirstFile"
            :key="countSelect2.id"
            class="ColumnSecondFile"
          >
            <select v-model="headerSecond[index2]" @change="pushHeaders">
              <option value="">Не выбрано</option>
              <option
                v-for="heading2 in headersForSecondFile"
                :key="heading2.id"
              >
                {{ heading2 }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="nextPage">
        <button class="FromTo" @click="$router.push({ name: 'Results' })">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      fileName1: this.$store.state.NameFile1,
      fileName2: this.$store.state.NameFile2,
      firstFile: this.$store.state.firstFileData[0],
      secondFile: this.$store.state.SecondFileData[0],
      headersForFirstFile: [],
      headersForSecondFile: [],
      array1: "",
      ok: "",
      colomnValue: [],
      colomnValue2: [],
      headerFirst: [],
      headerSecond: [],
      countOfSelectFirstFile: [],
      countOfSelectSecondFile: [],
    };
  },
  mounted() {
    this.takeHeader();
    this.pushHeaders();
    this.refresh();
    if (this.countOfSelectFirstFile.length > 5) {
      this.countOfSelectFirstFile.length = 5;
    }
    if (this.countOfSelectSecondFile.length > 5) {
      this.countOfSelectSecondFile.length = 5;
    }
  },
  methods: {
    refresh() {
      //Если переменная пустая, то перекидываем на главную страницу
      if (this.$store.state.NameFile1 == "") {
        router.push("/");
      }
      if (this.$store.state.NameFile2 == "") {
        router.push("/");
      }
    },
    pushHeaders() {
      console.log(this.headerFirst);
      console.log(this.headerSecond);
      this.$store.commit("FIRST_FILE_HEADER", this.headerFirst);
      this.$store.commit("SECOND_FILE_HEADER", this.headerSecond);
    },

    takeHeader() {
      //беру заголовки
      for (let HeaderSecond in this.secondFile) {
        this.headersForSecondFile.push(HeaderSecond);
        this.countOfSelectSecondFile.push(HeaderSecond);
        console.log(this.headersForSecondFile);
        this.headerSecond.push(HeaderSecond.trim());
      }
      for (let Headerfirst in this.firstFile) {
        this.headersForFirstFile.push(Headerfirst);
        this.countOfSelectFirstFile.push(Headerfirst);
        console.log(this.headersForFirstFile);
        this.headerFirst.push(Headerfirst.trim());
      }
    },
  },
};
</script>

<style>
.AllColumns {
  border: 3px solid;
  border-radius: 60px;
  background-color: rgb(255, 255, 255);
  width: 600px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

select {
  background-color: #57d585;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 200px;
}
.block {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 80px 0 0 0;
}
.block1 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 15px;
  padding: 80px 0 0 0;
}
.HeadersExcel {
  display: flex;
  justify-content: space-around;
}
.AllData {
  display: flex;
  justify-content: center;
  padding: 150px;
}
.nameFile {
  padding-bottom: 50px;
}
</style>
