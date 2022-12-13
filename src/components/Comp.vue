<template>
  <div class="AllColumns">
    <div class="HeadersExcel">
      <div class="block">
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
        <div
          v-for="(countSelect2, index2) in this.headersForSecondFile"
          :key="countSelect2.id"
          class="ColumnSecondFile"
        >
          <select v-model="headerSecond[index2]" @change="pushHeaders">
            <option v-for="heading2 in headersForSecondFile" :key="heading2.id">
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
</template>

<script>
export default {
  data() {
    return {
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
  border: 1px solid;
  border-radius: 10px;
  background-color: antiquewhite;
}
select {
  margin-bottom: 5px;
  width: 200px;
}
select {
  background-color: #94e8b3;
  border-radius: 10px;
}
.block {
  margin-top: 10px;
  margin-bottom: 10px;
}
.block1 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.HeadersExcel {
  display: flex;
  justify-content: space-around;
}
</style>
