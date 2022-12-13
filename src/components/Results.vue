<template>
  <div class="form">
    <div class="res-blck">
      <div>
        <span
          class="result"
          v-for="(item, index) in particalMatched_1"
          :key="item.id"
        >
          <div class="particalMatched">
            Частично совпадающая пара номер - {{ index + 1 }}
          </div>
          <span v-for="item1 in item" :key="item1.id">
            <div>
              <span v-for="(item2, index2) in item1" :key="item2.id">
                <b>{{ index2 }}</b> - {{ item2 }};
              </span>
            </div>
          </span>
        </span>
      </div>
    </div>
    <div class="NonInclud" v-if="allNon_1 != ''">
      Данные которые отсутствуют в файле {{ fileName2 }}
      <span v-for="allNonTable in allNon_1" :key="allNonTable.id">
        <div>
          <span
            v-for="(allNonTable1, index) in allNonTable"
            :key="allNonTable1.id"
          >
            <b> {{ index }}</b> - {{ allNonTable1 }};</span
          >
        </div>
      </span>
    </div>
    <div class="NonInclud" v-if="allNon_2 != ''">
      Данные которые отсутсвуют в файле {{ fileName1 }}
      <span v-for="allNonTable in allNon_2" :key="allNonTable.id">
        <div>
          <span
            v-for="(allNonTable1, index) in allNonTable"
            :key="allNonTable1.id"
          >
            <b> {{ index }}</b> - {{ allNonTable1 }};</span
          >
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      allMatched_1: [],
      allMatched_2: [],
      particalMatched_1: [],
      particalMatched_2: [],
      allNon_1: [],
      allNon_2: [],
      fileName1: this.$store.state.NameFile1,
      fileName2: this.$store.state.NameFile2,
      fisrtHeaders: this.$store.state.firstHedaer,
      SecondHeaders: this.$store.state.SecondHeader,
    };
  },
  mounted() {
    this.GetNonSimilar();
  },

  methods: {
    GetNonSimilar() {
      //данных которых нет во второй таблице
      this.$store.state.firstFileData.forEach((dataFirstTable) => {
        let allNonFirst = true;
        this.$store.state.SecondFileData.forEach((dataSecondTable) => {
          let allMatched_1 = true;
          let particalMatched_1 = true;
          let count = 0;
          this.fisrtHeaders.forEach((firstHeadersTable, index) => {
            const secondHeadersTable = this.SecondHeaders[index];

            const celValue_1 = dataFirstTable[firstHeadersTable];
            const celValue_2 = dataSecondTable[secondHeadersTable];
            if (celValue_1 === celValue_2) {
              particalMatched_1 = true;
            } else {
              allMatched_1 = false;
              count++;
            }
          });
          if (count == 1) {
            allNonFirst = false;
            this.particalMatched_1.push([dataFirstTable, dataSecondTable]);
          }
          if (allMatched_1) {
            allNonFirst = false;
            this.allMatched_1.push([dataFirstTable, dataSecondTable]);
          }
          count = 0;
        });
        if (allNonFirst) {
          this.allNon_1.push(dataFirstTable);
        }
      });
      console.log("Полностью", this.allMatched_1);
      console.log("Полностью не совпали", this.allNon_1);
      console.log(this.particalMatched_1);
      //Убираю дубликаты из массива
      const uniq = new Set(
        this.particalMatched_1.map((e) => JSON.stringify(e))
      );
      const res = Array.from(uniq).map((e) => JSON.parse(e));
      this.particalMatched_1 = res;
      console.log(this.particalMatched_1);

      //данных которых нет в первой таблице

      this.$store.state.SecondFileData.forEach((dataSecondTable) => {
        let allNonFirst = true;
        this.$store.state.firstFileData.forEach((dataFirstTable) => {
          let allMatched_2 = true;
          let particalMatched_2 = true;
          let count = 0;
          this.SecondHeaders.forEach((SecondHeaders, index) => {
            const firstHeadersTable = this.fisrtHeaders[index];

            const celValue_1 = dataFirstTable[firstHeadersTable];
            const celValue_2 = dataSecondTable[SecondHeaders];
            if (celValue_1 === celValue_2) {
              particalMatched_2 = true;
            } else {
              allMatched_2 = false;
              count++;
            }
          });
          if (count == 1) {
            allNonFirst = false;
            this.particalMatched_2.push([dataFirstTable, dataSecondTable]);
          }
          if (allMatched_2) {
            allNonFirst = false;
            this.allMatched_2.push([dataFirstTable, dataSecondTable]);
          }
          count = 0;
        });
        if (allNonFirst) {
          this.allNon_2.push(dataSecondTable);
        }
      });
      console.log("Полностью", this.allMatched_2);
      console.log("Полностью не совпали", this.allNon_2);
      console.log(this.particalMatched_2);
      //Убираю дубликаты из массива
      const uniq1 = new Set(
        this.particalMatched_2.map((e) => JSON.stringify(e))
      );
      const res1 = Array.from(uniq).map((e) => JSON.parse(e));
      this.particalMatched_2 = res1;
      console.log(this.particalMatched_2);
    },
  },
};
</script>

<style>
.res-blck {
  margin: 0 auto;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  width: 1000px;
}
.NoDifference {
  text-align: center;
}
.result {
  display: block;
  background-color: #4f8bc0;
  border-radius: 15px;
  border: 2px solid;
  margin: 15px;
  padding: 20px;
}
.NonInclud {
  display: block;
  background-color: #c03a3a;
  border-radius: 15px;
  border: 2px solid;
  margin: 15px;
  padding: 20px;
  font-size: 20px;
}
.particalMatched {
  color: rgb(255, 255, 255);
  margin-bottom: 10px;
}
.form {
  border: 3px solid;
  max-width: 1200px;
  margin: auto;
  height: 600px;
  overflow: auto;
}
</style>
