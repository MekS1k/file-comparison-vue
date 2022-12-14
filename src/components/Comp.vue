<template>
  <div class="AllData">
    <div class="AllColumns">
      <div class="HeadersExcel">
        <div class="block">
          <span class="nameFile">{{ fileName1 }}</span>
          <div
            v-for="(countSelect, index) in this.headersForFirstFile"
            :key="countSelect.id"
            class="ColumnFirstFile"
          >
            <select v-model="headerFirst[index]" @change="pushHeaders">
              <option v-for="heading in headersForFirstFile" :key="heading.id">
                {{ heading }}
              </option>
            </select>
          </div>
        </div>
        <div class="block1">
          <span class="nameFile">{{ fileName2 }}</span>
          <div
            v-for="(countSelect2, index2) in this.headersForSecondFile"
            :key="countSelect2.id"
            class="ColumnSecondFile"
          >
            <select v-model="headerSecond[index2]" @change="pushHeaders">
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
    };
  },
  mounted() {
    this.takeHeader();
  },
  methods: {
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
        console.log(this.headersForSecondFile);
      }
      for (let Headerfirst in this.firstFile) {
        this.headersForFirstFile.push(Headerfirst);
        console.log(this.headersForFirstFile);
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
  height: 300px;
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
